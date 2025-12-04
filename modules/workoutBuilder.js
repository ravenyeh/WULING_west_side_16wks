// 西進武嶺 SUB4 16週訓練計劃 - Workout Builder Module

import { trainingData } from './trainingData.js';
import { userFTP, workoutZones, raceDate } from './powerZones.js';

// Pre-generated workouts storage
export let generatedWorkouts = [];

// Get training date for a specific day index
export function getTrainingDate(dayIndex) {
    if (!raceDate) return null;

    const trainingDate = new Date(raceDate);
    const daysFromRace = 112 - dayIndex;
    trainingDate.setDate(trainingDate.getDate() - daysFromRace);
    return trainingDate;
}

// Generate all workouts for the training plan
export function generateAllWorkouts() {
    generatedWorkouts = trainingData.map((day, index) => {
        if (day.intensity === '休息' || day.hours === 0) {
            return null;
        }
        return {
            dayIndex: index,
            workout: buildWorkout(day, index),
            scheduledDate: getTrainingDate(index + 1)
        };
    });
    console.log(`Generated ${generatedWorkouts.filter(w => w !== null).length} workouts`);
}

// Build a complete Garmin workout object
export function buildWorkout(day, dayIndex) {
    return {
        workoutId: null,
        ownerId: null,
        workoutName: `西進武嶺 W${day.week}D${day.day} - ${day.phase}`,
        description: buildWorkoutDescription(day),
        sportType: {
            sportTypeId: 2,
            sportTypeKey: "cycling"
        },
        workoutSegments: [{
            segmentOrder: 1,
            sportType: {
                sportTypeId: 2,
                sportTypeKey: "cycling"
            },
            workoutSteps: buildWorkoutSteps(day)
        }],
        estimatedDurationInSecs: Math.round(day.hours * 3600),
        estimatedDistanceInMeters: day.distance * 1000
    };
}

// Build workout description with FTP-based power targets
export function buildWorkoutDescription(day) {
    let desc = day.content;

    if (userFTP) {
        desc += `\n\n📊 功率目標 (FTP: ${userFTP}W):`;

        if (day.content.includes('Sweet Spot') || day.content.includes('88-94%')) {
            const low = Math.round(userFTP * 0.88);
            const high = Math.round(userFTP * 0.94);
            desc += `\n• Sweet Spot: ${low}-${high}W`;
        }
        if (day.content.includes('FTP') || day.content.includes('閾值') || day.content.includes('100%')) {
            const low = Math.round(userFTP * 0.95);
            const high = Math.round(userFTP * 1.05);
            desc += `\n• 閾值: ${low}-${high}W`;
        }
        if (day.content.includes('VO2max') || day.content.includes('110%') || day.content.includes('105%')) {
            const low = Math.round(userFTP * 1.05);
            const high = Math.round(userFTP * 1.20);
            desc += `\n• VO2max: ${low}-${high}W`;
        }
        if (day.content.includes('Zone 2') || day.content.includes('有氧') || day.intensity === '輕鬆') {
            const low = Math.round(userFTP * 0.55);
            const high = Math.round(userFTP * 0.75);
            desc += `\n• Zone 2: ${low}-${high}W`;
        }
        if (day.content.includes('Zone 3') || day.content.includes('節奏') || day.content.includes('75%')) {
            const low = Math.round(userFTP * 0.75);
            const high = Math.round(userFTP * 0.90);
            desc += `\n• Tempo: ${low}-${high}W`;
        }
    }

    desc += `\n\n📍 距離：${day.distance}km | 爬升：${day.elevation}m | 時間：${day.hours}h`;

    return desc;
}

// Build workout steps with proper Garmin format
export function buildWorkoutSteps(day) {
    const steps = [];
    let stepId = 1;
    let stepOrder = 1;

    const zones = workoutZones;

    function createStep(type, typeKey, duration, zone, desc) {
        const step = {
            type: "ExecutableStepDTO",
            stepId: stepId++,
            stepOrder: stepOrder++,
            childStepId: null,
            description: desc || null,
            stepType: {
                stepTypeId: type,
                stepTypeKey: typeKey
            },
            endCondition: {
                conditionTypeId: 2,
                conditionTypeKey: "time"
            },
            endConditionValue: duration
        };

        if (zone && userFTP) {
            step.targetType = {
                workoutTargetTypeId: 2,
                workoutTargetTypeKey: "power"
            };
            step.targetValueOne = Math.round(userFTP * zone.low / 100);
            step.targetValueTwo = Math.round(userFTP * zone.high / 100);
        } else if (zone) {
            let zoneNum = 3;
            if (zone.low >= 105) zoneNum = 5;
            else if (zone.low >= 88) zoneNum = 4;
            else if (zone.low >= 75) zoneNum = 3;
            else if (zone.low >= 55) zoneNum = 2;
            else zoneNum = 1;

            step.targetType = {
                workoutTargetTypeId: 6,
                workoutTargetTypeKey: "power.zone"
            };
            step.targetValueOne = zoneNum;
            step.targetValueTwo = null;
        } else {
            step.targetType = {
                workoutTargetTypeId: 1,
                workoutTargetTypeKey: "no.target"
            };
            step.targetValueOne = null;
            step.targetValueTwo = null;
        }

        return step;
    }

    function createRepeatGroup(iterations, intervalDuration, intervalZone, restDuration, intervalDesc) {
        const repeatStep = {
            type: "RepeatGroupDTO",
            stepId: stepId++,
            stepOrder: stepOrder++,
            childStepId: null,
            stepType: {
                stepTypeId: 6,
                stepTypeKey: "repeat"
            },
            numberOfIterations: iterations,
            workoutSteps: []
        };

        let nestedOrder = 1;

        const intervalStep = {
            type: "ExecutableStepDTO",
            stepId: stepId++,
            stepOrder: nestedOrder++,
            childStepId: null,
            description: intervalDesc,
            stepType: {
                stepTypeId: 3,
                stepTypeKey: "interval"
            },
            endCondition: {
                conditionTypeId: 2,
                conditionTypeKey: "time"
            },
            endConditionValue: intervalDuration
        };

        if (intervalZone && userFTP) {
            intervalStep.targetType = {
                workoutTargetTypeId: 2,
                workoutTargetTypeKey: "power"
            };
            intervalStep.targetValueOne = Math.round(userFTP * intervalZone.low / 100);
            intervalStep.targetValueTwo = Math.round(userFTP * intervalZone.high / 100);
        } else if (intervalZone) {
            let zoneNum = 3;
            if (intervalZone.low >= 105) zoneNum = 5;
            else if (intervalZone.low >= 88) zoneNum = 4;
            else if (intervalZone.low >= 75) zoneNum = 3;
            else if (intervalZone.low >= 55) zoneNum = 2;
            else zoneNum = 1;

            intervalStep.targetType = {
                workoutTargetTypeId: 6,
                workoutTargetTypeKey: "power.zone"
            };
            intervalStep.targetValueOne = zoneNum;
            intervalStep.targetValueTwo = null;
        }

        repeatStep.workoutSteps.push(intervalStep);

        const restStep = {
            type: "ExecutableStepDTO",
            stepId: stepId++,
            stepOrder: nestedOrder++,
            childStepId: null,
            description: "恢復 Recovery",
            stepType: {
                stepTypeId: 4,
                stepTypeKey: "rest"
            },
            targetType: {
                workoutTargetTypeId: 1,
                workoutTargetTypeKey: "no.target"
            },
            targetValueOne: null,
            targetValueTwo: null,
            endCondition: {
                conditionTypeId: 2,
                conditionTypeKey: "time"
            },
            endConditionValue: restDuration
        };

        repeatStep.workoutSteps.push(restStep);

        return repeatStep;
    }

    const content = day.content;
    const intervalMatch = content.match(/(\d+)x(\d+)\s*min/i);

    let mainZone = zones.z3;
    let zoneDesc = 'Tempo';

    if (content.includes('Sweet Spot') || content.includes('88-94%') || content.includes('90%')) {
        mainZone = zones.ss;
        zoneDesc = 'Sweet Spot @ 88-94% FTP';
    } else if (content.match(/@ ?FTP/) || content.includes('閾值') || content.includes('100%') || content.includes('98-102%')) {
        mainZone = zones.ftp;
        zoneDesc = '閾值 @ 95-105% FTP';
    } else if (content.includes('VO2max') || content.includes('110%') || content.includes('105%') || content.includes('105-120%')) {
        mainZone = zones.z5;
        zoneDesc = 'VO2max @ 105-120% FTP';
    } else if (content.includes('Zone 2') || content.includes('有氧') || content.includes('恢復騎') || day.intensity === '輕鬆') {
        mainZone = zones.z2;
        zoneDesc = 'Zone 2 @ 55-75% FTP';
    } else if (content.includes('Zone 3') || content.includes('節奏') || content.includes('75%') || content.includes('75-90%')) {
        mainZone = zones.z3;
        zoneDesc = 'Tempo @ 75-90% FTP';
    } else if (content.includes('爬坡') || content.includes('坡度')) {
        mainZone = zones.z4;
        zoneDesc = '爬坡 @ 90-105% FTP';
    } else if (content.includes('85%')) {
        mainZone = { low: 83, high: 87 };
        zoneDesc = 'Sub-threshold @ 83-87% FTP';
    }

    // 1. Warmup
    steps.push(createStep(1, "warmup", 600, zones.z2, "暖身 Warmup"));

    // 2. Main set
    if (intervalMatch) {
        const count = parseInt(intervalMatch[1]);
        const duration = parseInt(intervalMatch[2]) * 60;
        const restDuration = 300;
        steps.push(createRepeatGroup(count, duration, mainZone, restDuration, zoneDesc));
    } else if (day.intensity === '高強度' || day.intensity === '最大') {
        if (day.intensity === '最大') {
            steps.push(createRepeatGroup(5, 300, zones.z5, 300, 'VO2max @ 105-120% FTP'));
        } else {
            steps.push(createRepeatGroup(4, 600, zones.ftp, 300, '閾值 @ 95-105% FTP'));
        }
    } else {
        const mainDuration = Math.max(600, Math.round((day.hours - 0.33) * 3600));
        steps.push(createStep(3, "interval", mainDuration, mainZone, zoneDesc));
    }

    // 3. Cooldown
    steps.push(createStep(2, "cooldown", 600, zones.z1, "緩和 Cooldown"));

    return steps;
}

// Convert day to Garmin workout (using pre-generated if available)
export function convertToGarminWorkout(day, dayIndex) {
    if (generatedWorkouts[dayIndex] && generatedWorkouts[dayIndex] !== null) {
        return generatedWorkouts[dayIndex].workout;
    }
    return buildWorkout(day, dayIndex);
}
