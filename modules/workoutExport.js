// 西進武嶺 SUB4 16週訓練計劃 - Workout Export Module

import { trainingData } from './trainingData.js';
import { userFTP, getPowerPercentForZone } from './powerZones.js';
import { escapeXml, getPhaseEnglish } from './utils.js';
import { convertToGarminWorkout } from './workoutBuilder.js';

// Generate ERG file content
export function generateErgFile(day, dayIndex) {
    const workout = convertToGarminWorkout(day, dayIndex);
    const FTP = userFTP || 200;

    let ergContent = `[COURSE HEADER]
VERSION = 2
UNITS = ENGLISH
DESCRIPTION = ${workout.workoutName}
FILE NAME = ${workout.workoutName}
FTP = ${FTP}
MINUTES WATTS
[END COURSE HEADER]
[COURSE DATA]
`;

    let currentTime = 0;

    function processStep(step) {
        const stepType = step.stepType?.stepTypeKey;
        const duration = step.endConditionValue || 300;
        const durationMins = duration / 60;

        if (stepType === 'repeat' && step.workoutSteps) {
            const iterations = step.numberOfIterations || 1;
            for (let i = 0; i < iterations; i++) {
                step.workoutSteps.forEach(childStep => processStep(childStep));
            }
        } else {
            let power;
            if (step.targetValueOne && step.targetValueTwo) {
                power = Math.round((step.targetValueOne + step.targetValueTwo) / 2);
            } else if (step.targetType?.workoutTargetTypeKey === 'power.zone') {
                const zoneNum = step.targetValueOne || 3;
                const percent = [50, 65, 82, 95, 112, 135][zoneNum - 1] || 75;
                power = Math.round(FTP * percent / 100);
            } else {
                power = Math.round(FTP * 0.65);
            }

            if (stepType === 'warmup') {
                const startPower = Math.round(FTP * 0.45);
                ergContent += `${currentTime.toFixed(2)}\t${startPower}\n`;
                currentTime += durationMins;
                ergContent += `${currentTime.toFixed(2)}\t${power}\n`;
            } else if (stepType === 'cooldown') {
                ergContent += `${currentTime.toFixed(2)}\t${power}\n`;
                currentTime += durationMins;
                ergContent += `${currentTime.toFixed(2)}\t${Math.round(FTP * 0.40)}\n`;
            } else {
                ergContent += `${currentTime.toFixed(2)}\t${power}\n`;
                currentTime += durationMins;
                ergContent += `${currentTime.toFixed(2)}\t${power}\n`;
            }
        }
    }

    const steps = workout.workoutSegments?.[0]?.workoutSteps || [];
    steps.forEach(step => processStep(step));

    ergContent += `[END COURSE DATA]`;
    return ergContent;
}

// Generate ZWO file content (Zwift format)
export function generateZwoFile(day, dayIndex) {
    const workout = convertToGarminWorkout(day, dayIndex);
    const FTP = userFTP || 200;

    function powerToFTP(watts) {
        return (watts / FTP).toFixed(2);
    }

    function getStepPower(step) {
        if (step.targetValueOne && step.targetValueTwo) {
            return (step.targetValueOne + step.targetValueTwo) / 2;
        }
        if (step.targetType?.workoutTargetTypeKey === 'power.zone') {
            const zoneNum = step.targetValueOne || 3;
            const percent = [50, 65, 82, 95, 112, 135][zoneNum - 1] || 75;
            return FTP * percent / 100;
        }
        return FTP * 0.65;
    }

    let zwoContent = `<?xml version="1.0" encoding="UTF-8"?>
<workout_file>
    <author>西進武嶺 SUB4</author>
    <name>${escapeXml(workout.workoutName)}</name>
    <description>${escapeXml(workout.description || '')}</description>
    <sportType>bike</sportType>
    <workout>
`;

    const steps = workout.workoutSegments?.[0]?.workoutSteps || [];

    steps.forEach(step => {
        const stepType = step.stepType?.stepTypeKey;
        const duration = step.endConditionValue || 300;

        if (stepType === 'repeat' && step.workoutSteps) {
            const reps = step.numberOfIterations || 1;
            const childSteps = step.workoutSteps;

            if (childSteps.length >= 2) {
                const workStep = childSteps[0];
                const restStep = childSteps[1];
                const onDuration = workStep.endConditionValue || 300;
                const offDuration = restStep.endConditionValue || 60;
                const onPower = powerToFTP(getStepPower(workStep));
                const offPower = powerToFTP(getStepPower(restStep));

                zwoContent += `        <IntervalsT Repeat="${reps}" OnDuration="${onDuration}" OffDuration="${offDuration}" OnPower="${onPower}" OffPower="${offPower}"/>\n`;
            }
        } else if (stepType === 'warmup') {
            const power = powerToFTP(getStepPower(step));
            zwoContent += `        <Warmup Duration="${duration}" PowerLow="0.45" PowerHigh="${power}"/>\n`;
        } else if (stepType === 'cooldown') {
            const power = powerToFTP(getStepPower(step));
            zwoContent += `        <Cooldown Duration="${duration}" PowerLow="${power}" PowerHigh="0.40"/>\n`;
        } else {
            const power = powerToFTP(getStepPower(step));
            zwoContent += `        <SteadyState Duration="${duration}" Power="${power}"/>\n`;
        }
    });

    zwoContent += `    </workout>
</workout_file>`;

    return zwoContent;
}

// Download JSON file
export function downloadJson(dayIndex) {
    const day = trainingData[dayIndex];
    const workout = convertToGarminWorkout(day, dayIndex);
    const json = JSON.stringify(workout, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wuling_W${day.week}D${day.day}_${getPhaseEnglish(day.phase)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Download ERG file
export function downloadErg(dayIndex) {
    const day = trainingData[dayIndex];
    const ergContent = generateErgFile(day, dayIndex);
    const blob = new Blob([ergContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wuling_W${day.week}D${day.day}_${getPhaseEnglish(day.phase)}.erg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Download ZWO file
export function downloadZwo(dayIndex) {
    const day = trainingData[dayIndex];
    const zwoContent = generateZwoFile(day, dayIndex);
    const blob = new Blob([zwoContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wuling_W${day.week}D${day.day}_${getPhaseEnglish(day.phase)}.zwo`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Copy JSON to clipboard
export function copyJson() {
    const textarea = document.getElementById('workoutJson');
    if (!textarea) return;

    navigator.clipboard.writeText(textarea.value).then(() => {
        const btn = document.querySelector('.btn-copy');
        if (btn) {
            const originalText = btn.textContent;
            btn.textContent = '已複製！';
            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        }
    }).catch(err => {
        console.error('Failed to copy:', err);
        textarea.select();
        document.execCommand('copy');
    });
}
