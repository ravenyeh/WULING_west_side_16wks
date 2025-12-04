// 西進武嶺 SUB4 16週訓練計劃 - Workout Builder Module

import { trainingData } from './trainingData.js';
import { userFTP, workoutZones, raceDate, targetTime } from './powerZones.js';

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

// Get goal text based on target time
function getGoalText() {
    const hours = Math.floor(targetTime / 60);
    const mins = targetTime % 60;
    const isExactHour = mins === 0 && hours >= 3 && hours <= 8;
    return isExactHour ? `SUB${hours}` : `${hours}:${String(mins).padStart(2, '0')}`;
}

// Build a complete Garmin workout object
export function buildWorkout(day, dayIndex) {
    // Special handling for race day (Day 112)
    const isRaceDay = day.week === 16 && day.day === 7;
    const goalText = getGoalText();
    const workoutName = isRaceDay
        ? `比賽日！西進武嶺 ${goalText} 挑戰`
        : `西進武嶺 W${day.week}D${day.day} - ${day.phase}`;

    return {
        workoutId: null,
        ownerId: null,
        workoutName: workoutName,
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

    // Check for "long ride with embedded section" pattern (e.g., "包含 30min 節奏段")
    const embeddedMatch = content.match(/包含\s*(\d+)\s*min\s*(節奏|Sweet Spot|閾值|FTP|VO2max)/i) ||
                          content.match(/包含\s*(節奏|Sweet Spot|閾值|FTP|VO2max)\s*段?\s*(\d+)\s*min/i) ||
                          content.match(/(\d+)\s*min\s*(節奏|Sweet Spot|閾值|FTP)段/i) ||
                          content.match(/(\d+)\s*hr?\s*@\s*(\d+)%/i);

    // Determine main zone based on content
    function getZoneFromContent(text) {
        if (text.includes('Sweet Spot') || text.includes('88-94%') || text.includes('90%')) {
            return { zone: zones.ss, desc: 'Sweet Spot @ 88-94% FTP' };
        } else if (text.match(/@ ?FTP/) || text.includes('閾值') || text.includes('100%') || text.includes('98-102%')) {
            return { zone: zones.ftp, desc: '閾值 @ 95-105% FTP' };
        } else if (text.includes('VO2max') || text.includes('110%') || text.includes('105-120%')) {
            return { zone: zones.z5, desc: 'VO2max @ 105-120% FTP' };
        } else if (text.includes('Zone 2') || text.includes('有氧') || text.includes('恢復騎')) {
            return { zone: zones.z2, desc: 'Zone 2 @ 55-75% FTP' };
        } else if (text.includes('Zone 3') || text.includes('節奏') || text.includes('75%') || text.includes('75-90%')) {
            return { zone: zones.z3, desc: 'Tempo @ 75-90% FTP' };
        } else if (text.includes('爬坡') || text.includes('坡度')) {
            return { zone: zones.z4, desc: '爬坡 @ 90-105% FTP' };
        } else if (text.includes('85%')) {
            return { zone: { low: 83, high: 87 }, desc: 'Sub-threshold @ 83-87% FTP' };
        }
        return { zone: zones.z2, desc: 'Zone 2 @ 55-75% FTP' };
    }

    // 1. Warmup
    steps.push(createStep(1, "warmup", 600, zones.z2, "暖身 Warmup"));

    // 2. Main set
    const totalMainTime = Math.round((day.hours - 0.33) * 3600); // Total time minus warmup/cooldown

    if (embeddedMatch) {
        // Long ride with embedded high-intensity section
        let embeddedDuration, embeddedType;

        if (embeddedMatch[1] && !isNaN(parseInt(embeddedMatch[1]))) {
            embeddedDuration = parseInt(embeddedMatch[1]) * 60;
            embeddedType = embeddedMatch[2];
        } else {
            embeddedType = embeddedMatch[1];
            embeddedDuration = parseInt(embeddedMatch[2]) * 60;
        }

        // Handle "2hr @ 70%" pattern
        if (content.match(/(\d+)\s*hr?\s*@\s*(\d+)%/i)) {
            const hrMatch = content.match(/(\d+)\s*hr?\s*@\s*(\d+)%/i);
            embeddedDuration = parseInt(hrMatch[1]) * 3600;
            const percent = parseInt(hrMatch[2]);
            embeddedType = percent >= 88 ? 'Sweet Spot' : percent >= 75 ? '節奏' : 'Zone 2';
        }

        const embeddedZone = getZoneFromContent(embeddedType);
        const z2Time = Math.max(600, totalMainTime - embeddedDuration);

        // Zone 2 base riding first
        const z2FirstHalf = Math.floor(z2Time / 2);
        const z2SecondHalf = z2Time - z2FirstHalf;

        steps.push(createStep(3, "interval", z2FirstHalf, zones.z2, "Zone 2 有氧騎乘"));
        steps.push(createStep(3, "interval", embeddedDuration, embeddedZone.zone, embeddedZone.desc));
        if (z2SecondHalf > 300) {
            steps.push(createStep(3, "interval", z2SecondHalf, zones.z2, "Zone 2 有氧騎乘"));
        }

    } else if (intervalMatch) {
        const count = parseInt(intervalMatch[1]);
        const duration = parseInt(intervalMatch[2]) * 60;
        const restDuration = 300;
        const { zone, desc } = getZoneFromContent(content);
        steps.push(createRepeatGroup(count, duration, zone, restDuration, desc));

    } else if (day.intensity === '高強度' || day.intensity === '最大') {
        if (day.intensity === '最大') {
            steps.push(createRepeatGroup(5, 300, zones.z5, 300, 'VO2max @ 105-120% FTP'));
        } else {
            steps.push(createRepeatGroup(4, 600, zones.ftp, 300, '閾值 @ 95-105% FTP'));
        }

    } else {
        // Default: use zone based on content or intensity
        const { zone, desc } = day.intensity === '輕鬆'
            ? { zone: zones.z2, desc: 'Zone 2 @ 55-75% FTP' }
            : getZoneFromContent(content);
        const mainDuration = Math.max(600, totalMainTime);
        steps.push(createStep(3, "interval", mainDuration, zone, desc));
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
