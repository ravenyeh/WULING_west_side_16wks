// 西進武嶺 SUB4 16週訓練計劃 - Power Zones Module

// User settings - mutable state
export let raceDate = null;
export let userFTP = null;
export let targetTime = 240; // Target finish time in minutes (default 4 hours)

// Setters for mutable state
export function setRaceDate(date) {
    raceDate = date;
}

export function setUserFTP(ftp) {
    userFTP = ftp;
}

export function setTargetTime(time) {
    targetTime = time;
}

// Route segments data for pacing calculation
export const routeSegments = [
    { id: 1, name: '埔里 → 人止關', distance: 14, elevation: 250, basePowerPercent: 67.5 },  // FTP 65-70%
    { id: 2, name: '人止關 → 霧社', distance: 10, elevation: 450, basePowerPercent: 72.5 },  // FTP 70-75%
    { id: 3, name: '霧社 → 清境', distance: 8, elevation: 600, basePowerPercent: 74 },       // FTP 70-78%
    { id: 4, name: '清境 → 翠峰', distance: 9, elevation: 560, basePowerPercent: 68.5 },     // FTP 65-72%
    { id: 5, name: '翠峰 → 鳶峰', distance: 6, elevation: 450, basePowerPercent: 68.5 },     // FTP 65-72%
    { id: 6, name: '鳶峰 → 昆陽', distance: 4, elevation: 320, basePowerPercent: 72.5 },     // FTP 70-75%
    { id: 7, name: '昆陽 → 武嶺', distance: 3, elevation: 205, basePowerPercent: 80 }        // FTP 75-85%
];

// Power Zones based on FTP (Coggan zones)
export const powerZones = {
    1: { name: 'Active Recovery', min: 0, max: 55, color: '#90caf9' },
    2: { name: 'Endurance', min: 55, max: 75, color: '#a5d6a7' },
    3: { name: 'Tempo', min: 75, max: 90, color: '#fff59d' },
    4: { name: 'Threshold', min: 90, max: 105, color: '#ffab91' },
    5: { name: 'VO2max', min: 105, max: 120, color: '#ef9a9a' },
    6: { name: 'Anaerobic', min: 120, max: 150, color: '#ce93d8' }
};

// Power zone definitions (% FTP) for workout building
export const workoutZones = {
    z1: { low: 0, high: 55 },      // Recovery
    z2: { low: 55, high: 75 },     // Endurance
    z3: { low: 75, high: 90 },     // Tempo
    ss: { low: 88, high: 94 },     // Sweet Spot
    z4: { low: 90, high: 105 },    // Threshold
    ftp: { low: 95, high: 105 },   // FTP
    z5: { low: 105, high: 120 },   // VO2max
    z6: { low: 120, high: 150 }    // Anaerobic
};

// Calculate segment pacing based on target time
export function calculateSegmentPacing() {
    const segmentWeights = routeSegments.map(seg => {
        const gradient = seg.elevation / seg.distance / 10;
        return seg.distance * (1 + gradient * 0.5);
    });

    const totalWeight = segmentWeights.reduce((a, b) => a + b, 0);

    return routeSegments.map((seg, index) => {
        const timeMinutes = (segmentWeights[index] / totalWeight) * targetTime;
        const speed = seg.distance / (timeMinutes / 60);

        const baseTime = 240; // 4 hours baseline
        const timeRatio = baseTime / targetTime;
        const adjustedPowerPercent = seg.basePowerPercent * Math.pow(timeRatio, 0.3);

        return {
            ...seg,
            timeMinutes: Math.round(timeMinutes),
            speed: Math.round(speed * 10) / 10,
            powerPercentMin: Math.round(adjustedPowerPercent - 5),
            powerPercentMax: Math.round(adjustedPowerPercent + 5)
        };
    });
}

// Calculate power value from FTP percentage
export function calculatePower(ftpPercentage) {
    if (!userFTP) return null;
    return Math.round(userFTP * ftpPercentage / 100);
}

// Get power zone from FTP percentage
export function getPowerZone(ftpPercentage) {
    for (let zone = 6; zone >= 1; zone--) {
        if (ftpPercentage >= powerZones[zone].min) {
            return zone;
        }
    }
    return 1;
}

// Format power range string
export function formatPowerRange(minPercent, maxPercent) {
    if (!userFTP) {
        return `${minPercent}-${maxPercent}% FTP`;
    }
    const minPower = calculatePower(minPercent);
    const maxPower = calculatePower(maxPercent);
    return `${minPower}-${maxPower}W (${minPercent}-${maxPercent}%)`;
}

// Generate dynamic training content based on FTP
export function generateDynamicContent(baseContent, intensity) {
    if (!userFTP) return baseContent;

    const intensityTargets = {
        '輕鬆': { min: 55, max: 70, zone: 2 },
        '中等': { min: 70, max: 85, zone: 3 },
        '高強度': { min: 90, max: 105, zone: 4 },
        '最大': { min: 105, max: 120, zone: 5 }
    };

    const target = intensityTargets[intensity];
    if (!target) return baseContent;

    let content = baseContent;

    // Pattern: @ XX% FTP or @ XX-YY% FTP
    content = content.replace(/@ ?(\d+)-?(\d+)?% ?FTP/g, (match, p1, p2) => {
        const percent1 = parseInt(p1);
        const power1 = calculatePower(percent1);
        if (p2) {
            const percent2 = parseInt(p2);
            const power2 = calculatePower(percent2);
            return `@ ${power1}-${power2}W (${percent1}-${percent2}% FTP)`;
        }
        return `@ ${power1}W (${percent1}% FTP)`;
    });

    // Pattern: FTP XX% or XX% FTP
    content = content.replace(/FTP ?(\d+)%|(\d+)% ?FTP/g, (match, p1, p2) => {
        const percent = parseInt(p1 || p2);
        const power = calculatePower(percent);
        return `${power}W (${percent}% FTP)`;
    });

    return content;
}

// Get power target for intensity level
export function getPowerTargetForIntensity(intensity) {
    if (!userFTP) return null;

    const targets = {
        '輕鬆': { min: Math.round(userFTP * 0.55), max: Math.round(userFTP * 0.70) },
        '中等': { min: Math.round(userFTP * 0.70), max: Math.round(userFTP * 0.85) },
        '高強度': { min: Math.round(userFTP * 0.90), max: Math.round(userFTP * 1.05) },
        '最大': { min: Math.round(userFTP * 1.05), max: Math.round(userFTP * 1.20) }
    };

    return targets[intensity] || null;
}

// Get power percentage for zone
export function getPowerPercentForZone(zone) {
    const zoneRanges = {
        z1: 50, z2: 65, z3: 82, z4: 95,
        ss: 91, ftp: 100, z5: 112, z6: 135
    };
    return zoneRanges[zone] || 75;
}

// Get power zones summary
export function getPowerZonesSummary() {
    if (!userFTP) return null;

    return {
        z1: { max: calculatePower(55) },
        z2: { min: calculatePower(55), max: calculatePower(75) },
        z3: { min: calculatePower(75), max: calculatePower(90) },
        z4: { min: calculatePower(90), max: calculatePower(105) },
        z5: { min: calculatePower(105), max: calculatePower(120) },
        z6: { min: calculatePower(120) }
    };
}
