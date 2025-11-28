// 西進武嶺 SUB4 16週訓練計劃
// Training Plan Data - 112 Days (16 Weeks)

// User settings
let raceDate = null;
let userFTP = null;

// Power Zones based on FTP (Coggan zones)
const powerZones = {
    1: { name: 'Active Recovery', min: 0, max: 55, color: '#90caf9' },
    2: { name: 'Endurance', min: 55, max: 75, color: '#a5d6a7' },
    3: { name: 'Tempo', min: 75, max: 90, color: '#fff59d' },
    4: { name: 'Threshold', min: 90, max: 105, color: '#ffab91' },
    5: { name: 'VO2max', min: 105, max: 120, color: '#ef9a9a' },
    6: { name: 'Anaerobic', min: 120, max: 150, color: '#ce93d8' }
};

// Calculate power value from FTP percentage
function calculatePower(ftpPercentage) {
    if (!userFTP) return null;
    return Math.round(userFTP * ftpPercentage / 100);
}

// Get power zone from FTP percentage
function getPowerZone(ftpPercentage) {
    for (let zone = 6; zone >= 1; zone--) {
        if (ftpPercentage >= powerZones[zone].min) {
            return zone;
        }
    }
    return 1;
}

// Format power range string
function formatPowerRange(minPercent, maxPercent) {
    if (!userFTP) {
        return `${minPercent}-${maxPercent}% FTP`;
    }
    const minPower = calculatePower(minPercent);
    const maxPower = calculatePower(maxPercent);
    return `${minPower}-${maxPower}W (${minPercent}-${maxPercent}%)`;
}

// Generate dynamic training content based on FTP
function generateDynamicContent(baseContent, intensity) {
    if (!userFTP) return baseContent;

    // Define power targets for different intensities
    const intensityTargets = {
        '輕鬆': { min: 55, max: 70, zone: 2 },
        '中等': { min: 70, max: 85, zone: 3 },
        '高強度': { min: 90, max: 105, zone: 4 },
        '最大': { min: 105, max: 120, zone: 5 }
    };

    const target = intensityTargets[intensity];
    if (!target) return baseContent;

    // Replace FTP percentage patterns with actual power values
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

// Training content templates with FTP-based power targets
const trainingTemplates = {
    // Zone 2 rides
    zone2: (duration, description) => ({
        base: description,
        powerMin: 55,
        powerMax: 75,
        zone: 2
    }),
    // Sweet Spot
    sweetSpot: (sets, duration) => ({
        base: `Sweet Spot 訓練：${sets}x${duration}min @ 88-94% FTP`,
        powerMin: 88,
        powerMax: 94,
        zone: 3
    }),
    // Threshold
    threshold: (sets, duration) => ({
        base: `閾值訓練：${sets}x${duration}min @ FTP`,
        powerMin: 95,
        powerMax: 105,
        zone: 4
    }),
    // VO2max
    vo2max: (sets, duration) => ({
        base: `VO2max 間歇：${sets}x${duration}min @ 110% FTP`,
        powerMin: 105,
        powerMax: 120,
        zone: 5
    })
};

// 訓練資料
const trainingData = [
    // Week 1 - 基礎期
    { week: 1, day: 1, phase: '基礎期', intensity: '輕鬆', content: 'Zone 2 有氧騎乘，平路為主，保持穩定心率', distance: 40, elevation: 300, hours: 2.0 },
    { week: 1, day: 2, phase: '基礎期', intensity: '休息', content: '完全休息或輕度伸展', distance: 0, elevation: 0, hours: 0 },
    { week: 1, day: 3, phase: '基礎期', intensity: '中等', content: '技術練習：踏頻訓練 90-100rpm，包含單腳踩踏', distance: 30, elevation: 200, hours: 1.5 },
    { week: 1, day: 4, phase: '基礎期', intensity: '輕鬆', content: 'Zone 2 恢復騎，專注踏頻與姿勢', distance: 25, elevation: 150, hours: 1.0 },
    { week: 1, day: 5, phase: '基礎期', intensity: '中等', content: '小丘陵練習：3-5% 坡度，練習坐姿爬坡', distance: 35, elevation: 400, hours: 1.5 },
    { week: 1, day: 6, phase: '基礎期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 1, day: 7, phase: '基礎期', intensity: '中等', content: '長距離有氧騎乘，Zone 2 為主', distance: 80, elevation: 600, hours: 3.5 },

    // Week 2 - 基礎期
    { week: 2, day: 1, phase: '基礎期', intensity: '輕鬆', content: 'Zone 2 有氧騎乘，練習穩定配速', distance: 45, elevation: 350, hours: 2.0 },
    { week: 2, day: 2, phase: '基礎期', intensity: '休息', content: '完全休息或瑜伽伸展', distance: 0, elevation: 0, hours: 0 },
    { week: 2, day: 3, phase: '基礎期', intensity: '中等', content: '節奏騎：2x15min @ 75% FTP，中間休息 5min', distance: 40, elevation: 300, hours: 2.0 },
    { week: 2, day: 4, phase: '基礎期', intensity: '輕鬆', content: '恢復騎：低強度 Zone 1-2', distance: 30, elevation: 200, hours: 1.5 },
    { week: 2, day: 5, phase: '基礎期', intensity: '中等', content: '爬坡練習：4x5min 中坡度（5-7%），坐姿為主', distance: 40, elevation: 500, hours: 2.0 },
    { week: 2, day: 6, phase: '基礎期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 2, day: 7, phase: '基礎期', intensity: '中等', content: '長騎：Zone 2 持續騎乘，練習補給策略', distance: 90, elevation: 800, hours: 4.0 },

    // Week 3 - 基礎期
    { week: 3, day: 1, phase: '基礎期', intensity: '輕鬆', content: 'Zone 2 有氧騎乘', distance: 50, elevation: 400, hours: 2.5 },
    { week: 3, day: 2, phase: '基礎期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 3, day: 3, phase: '基礎期', intensity: '中等', content: 'Sweet Spot 訓練：2x20min @ 88-94% FTP', distance: 45, elevation: 350, hours: 2.0 },
    { week: 3, day: 4, phase: '基礎期', intensity: '輕鬆', content: '恢復騎', distance: 30, elevation: 200, hours: 1.5 },
    { week: 3, day: 5, phase: '基礎期', intensity: '中等', content: '爬坡重複：5x6min @ 5-8% 坡度', distance: 45, elevation: 600, hours: 2.0 },
    { week: 3, day: 6, phase: '基礎期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 3, day: 7, phase: '基礎期', intensity: '中等', content: '長騎：包含 30min 節奏段', distance: 100, elevation: 1000, hours: 4.5 },

    // Week 4 - 基礎期（恢復週）
    { week: 4, day: 1, phase: '基礎期', intensity: '輕鬆', content: '恢復騎：Zone 2 輕鬆騎', distance: 35, elevation: 250, hours: 1.5 },
    { week: 4, day: 2, phase: '基礎期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 4, day: 3, phase: '基礎期', intensity: '輕鬆', content: '輕鬆騎：高踏頻練習 95-105rpm', distance: 30, elevation: 200, hours: 1.5 },
    { week: 4, day: 4, phase: '基礎期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 4, day: 5, phase: '基礎期', intensity: '輕鬆', content: '輕鬆爬坡：低強度坡度適應', distance: 35, elevation: 400, hours: 1.5 },
    { week: 4, day: 6, phase: '基礎期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 4, day: 7, phase: '基礎期', intensity: '輕鬆', content: '中距離有氧騎：Zone 2', distance: 70, elevation: 500, hours: 3.0 },

    // Week 5 - 建構期
    { week: 5, day: 1, phase: '建構期', intensity: '中等', content: 'Zone 2-3 有氧騎乘，增加強度', distance: 50, elevation: 450, hours: 2.5 },
    { week: 5, day: 2, phase: '建構期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 5, day: 3, phase: '建構期', intensity: '高強度', content: '閾值訓練：2x20min @ FTP', distance: 50, elevation: 400, hours: 2.5 },
    { week: 5, day: 4, phase: '建構期', intensity: '輕鬆', content: '恢復騎', distance: 30, elevation: 200, hours: 1.5 },
    { week: 5, day: 5, phase: '建構期', intensity: '高強度', content: '爬坡間歇：5x5min @ 105% FTP，坡度 6-8%', distance: 45, elevation: 700, hours: 2.0 },
    { week: 5, day: 6, phase: '建構期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 5, day: 7, phase: '建構期', intensity: '中等', content: '長騎：100km 以上，包含丘陵路段', distance: 110, elevation: 1200, hours: 5.0 },

    // Week 6 - 建構期
    { week: 6, day: 1, phase: '建構期', intensity: '中等', content: 'Zone 3 節奏騎乘', distance: 55, elevation: 500, hours: 2.5 },
    { week: 6, day: 2, phase: '建構期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 6, day: 3, phase: '建構期', intensity: '高強度', content: 'Sweet Spot 間歇：3x15min @ 90% FTP', distance: 55, elevation: 450, hours: 2.5 },
    { week: 6, day: 4, phase: '建構期', intensity: '輕鬆', content: '恢復騎', distance: 35, elevation: 250, hours: 1.5 },
    { week: 6, day: 5, phase: '建構期', intensity: '高強度', content: '爬坡專項：6x5min 長坡重複，模擬武嶺坡度', distance: 50, elevation: 800, hours: 2.5 },
    { week: 6, day: 6, phase: '建構期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 6, day: 7, phase: '建構期', intensity: '中等', content: '長騎：120km，包含 2000m+ 爬升', distance: 120, elevation: 2000, hours: 6.0 },

    // Week 7 - 建構期
    { week: 7, day: 1, phase: '建構期', intensity: '中等', content: '有氧騎乘：Zone 2-3', distance: 60, elevation: 550, hours: 3.0 },
    { week: 7, day: 2, phase: '建構期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 7, day: 3, phase: '建構期', intensity: '高強度', content: '閾值間歇：3x15min @ FTP，5min 休息', distance: 55, elevation: 450, hours: 2.5 },
    { week: 7, day: 4, phase: '建構期', intensity: '輕鬆', content: '恢復騎', distance: 35, elevation: 250, hours: 1.5 },
    { week: 7, day: 5, phase: '建構期', intensity: '高強度', content: '爬坡強度：4x8min @ 100% FTP 爬坡', distance: 50, elevation: 900, hours: 2.5 },
    { week: 7, day: 6, phase: '建構期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 7, day: 7, phase: '建構期', intensity: '中等', content: '長騎：含模擬賽事配速段 2hr @ 70% FTP', distance: 130, elevation: 2200, hours: 6.5 },

    // Week 8 - 建構期（恢復週）
    { week: 8, day: 1, phase: '建構期', intensity: '輕鬆', content: '恢復騎：Zone 2', distance: 40, elevation: 300, hours: 2.0 },
    { week: 8, day: 2, phase: '建構期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 8, day: 3, phase: '建構期', intensity: '中等', content: '輕度節奏：1x20min @ 85% FTP', distance: 45, elevation: 350, hours: 2.0 },
    { week: 8, day: 4, phase: '建構期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 8, day: 5, phase: '建構期', intensity: '中等', content: '輕度爬坡：坡度適應，不追求強度', distance: 40, elevation: 500, hours: 2.0 },
    { week: 8, day: 6, phase: '建構期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 8, day: 7, phase: '建構期', intensity: '中等', content: '中距離騎乘：Zone 2 為主', distance: 80, elevation: 800, hours: 3.5 },

    // Week 9 - 巔峰期
    { week: 9, day: 1, phase: '巔峰期', intensity: '中等', content: 'Zone 3 節奏騎乘', distance: 60, elevation: 600, hours: 3.0 },
    { week: 9, day: 2, phase: '巔峰期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 9, day: 3, phase: '巔峰期', intensity: '高強度', content: '閾值訓練：2x25min @ FTP', distance: 60, elevation: 500, hours: 3.0 },
    { week: 9, day: 4, phase: '巔峰期', intensity: '輕鬆', content: '恢復騎', distance: 35, elevation: 250, hours: 1.5 },
    { week: 9, day: 5, phase: '巔峰期', intensity: '高強度', content: '爬坡專項：5x8min @ 98-102% FTP 長坡', distance: 55, elevation: 1000, hours: 2.5 },
    { week: 9, day: 6, phase: '巔峰期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 9, day: 7, phase: '巔峰期', intensity: '高強度', content: '模擬賽事騎乘：140km，包含長爬坡段', distance: 140, elevation: 2500, hours: 7.0 },

    // Week 10 - 巔峰期
    { week: 10, day: 1, phase: '巔峰期', intensity: '中等', content: '有氧騎乘：恢復上週訓練', distance: 55, elevation: 500, hours: 2.5 },
    { week: 10, day: 2, phase: '巔峰期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 10, day: 3, phase: '巔峰期', intensity: '高強度', content: 'VO2max 間歇：6x4min @ 110% FTP', distance: 55, elevation: 450, hours: 2.5 },
    { week: 10, day: 4, phase: '巔峰期', intensity: '輕鬆', content: '恢復騎', distance: 35, elevation: 250, hours: 1.5 },
    { week: 10, day: 5, phase: '巔峰期', intensity: '高強度', content: '爬坡間歇：4x10min @ FTP 爬坡', distance: 55, elevation: 1100, hours: 2.5 },
    { week: 10, day: 6, phase: '巔峰期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 10, day: 7, phase: '巔峰期', intensity: '高強度', content: '長騎：150km，模擬賽事強度與補給', distance: 150, elevation: 2800, hours: 7.5 },

    // Week 11 - 巔峰期
    { week: 11, day: 1, phase: '巔峰期', intensity: '中等', content: 'Zone 3 騎乘', distance: 60, elevation: 550, hours: 3.0 },
    { week: 11, day: 2, phase: '巔峰期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 11, day: 3, phase: '巔峰期', intensity: '高強度', content: '閾值重複：3x20min @ FTP', distance: 60, elevation: 500, hours: 3.0 },
    { week: 11, day: 4, phase: '巔峰期', intensity: '輕鬆', content: '恢復騎', distance: 35, elevation: 250, hours: 1.5 },
    { week: 11, day: 5, phase: '巔峰期', intensity: '最大', content: '高強度爬坡：5x6min @ 105% FTP 陡坡', distance: 50, elevation: 1000, hours: 2.5 },
    { week: 11, day: 6, phase: '巔峰期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 11, day: 7, phase: '巔峰期', intensity: '高強度', content: '實地踩點：西進武嶺全程或半程模擬', distance: 54, elevation: 2000, hours: 4.0 },

    // Week 12 - 巔峰期（恢復週）
    { week: 12, day: 1, phase: '巔峰期', intensity: '輕鬆', content: '恢復騎：Zone 2', distance: 45, elevation: 350, hours: 2.0 },
    { week: 12, day: 2, phase: '巔峰期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 12, day: 3, phase: '巔峰期', intensity: '中等', content: '輕度閾值：1x20min @ 90% FTP', distance: 50, elevation: 400, hours: 2.5 },
    { week: 12, day: 4, phase: '巔峰期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 12, day: 5, phase: '巔峰期', intensity: '中等', content: '輕度爬坡：坡度感覺練習', distance: 45, elevation: 600, hours: 2.0 },
    { week: 12, day: 6, phase: '巔峰期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 12, day: 7, phase: '巔峰期', intensity: '中等', content: '中距離騎乘：Zone 2-3', distance: 90, elevation: 1000, hours: 4.0 },

    // Week 13 - 減量期
    { week: 13, day: 1, phase: '減量期', intensity: '中等', content: 'Zone 3 節奏維持', distance: 50, elevation: 450, hours: 2.5 },
    { week: 13, day: 2, phase: '減量期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 13, day: 3, phase: '減量期', intensity: '高強度', content: '短間歇維持：4x5min @ FTP', distance: 45, elevation: 350, hours: 2.0 },
    { week: 13, day: 4, phase: '減量期', intensity: '輕鬆', content: '恢復騎', distance: 30, elevation: 200, hours: 1.5 },
    { week: 13, day: 5, phase: '減量期', intensity: '中等', content: '爬坡維持：3x6min 中強度爬坡', distance: 40, elevation: 600, hours: 2.0 },
    { week: 13, day: 6, phase: '減量期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 13, day: 7, phase: '減量期', intensity: '中等', content: '長騎減量：100km Zone 2-3', distance: 100, elevation: 1200, hours: 4.5 },

    // Week 14 - 減量期
    { week: 14, day: 1, phase: '減量期', intensity: '輕鬆', content: 'Zone 2 有氧騎乘', distance: 45, elevation: 350, hours: 2.0 },
    { week: 14, day: 2, phase: '減量期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 14, day: 3, phase: '減量期', intensity: '中等', content: '短閾值：2x10min @ FTP', distance: 40, elevation: 300, hours: 2.0 },
    { week: 14, day: 4, phase: '減量期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 14, day: 5, phase: '減量期', intensity: '中等', content: '爬坡維持：2x8min 中強度', distance: 35, elevation: 500, hours: 1.5 },
    { week: 14, day: 6, phase: '減量期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 14, day: 7, phase: '減量期', intensity: '輕鬆', content: '中距離騎乘：Zone 2', distance: 80, elevation: 800, hours: 3.5 },

    // Week 15 - 減量期
    { week: 15, day: 1, phase: '減量期', intensity: '輕鬆', content: 'Zone 2 輕鬆騎', distance: 40, elevation: 300, hours: 2.0 },
    { week: 15, day: 2, phase: '減量期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 15, day: 3, phase: '減量期', intensity: '中等', content: '開腿訓練：3x3min @ FTP 間歇', distance: 35, elevation: 250, hours: 1.5 },
    { week: 15, day: 4, phase: '減量期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 15, day: 5, phase: '減量期', intensity: '輕鬆', content: '輕度爬坡：保持腿感', distance: 30, elevation: 400, hours: 1.5 },
    { week: 15, day: 6, phase: '減量期', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 15, day: 7, phase: '減量期', intensity: '輕鬆', content: '短距離騎乘：Zone 2', distance: 60, elevation: 500, hours: 2.5 },

    // Week 16 - 賽前週
    { week: 16, day: 1, phase: '賽前週', intensity: '輕鬆', content: '輕鬆騎：保持腿部活化', distance: 30, elevation: 200, hours: 1.5 },
    { week: 16, day: 2, phase: '賽前週', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 16, day: 3, phase: '賽前週', intensity: '中等', content: '開腿訓練：2x5min @ 95% FTP', distance: 30, elevation: 200, hours: 1.5 },
    { week: 16, day: 4, phase: '賽前週', intensity: '休息', content: '完全休息', distance: 0, elevation: 0, hours: 0 },
    { week: 16, day: 5, phase: '賽前週', intensity: '輕鬆', content: '賽前活化：輕度騎乘 30min', distance: 20, elevation: 100, hours: 1.0 },
    { week: 16, day: 6, phase: '賽前週', intensity: '休息', content: '賽前完全休息，準備比賽裝備與補給', distance: 0, elevation: 0, hours: 0 },
    { week: 16, day: 7, phase: '賽前週', intensity: '最大', content: '比賽日！西進武嶺 SUB4 挑戰', distance: 54, elevation: 2000, hours: 4.0 }
];

// Pre-generated workouts storage
let generatedWorkouts = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Load saved settings
    loadSavedSettings();

    // Pre-generate all workouts
    generateAllWorkouts();

    // Set up save settings button
    document.getElementById('saveSettingsBtn').addEventListener('click', saveSettings);

    // Allow Enter key to save settings
    document.getElementById('raceDateInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') saveSettings();
    });
    document.getElementById('ftpInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') saveSettings();
    });

    // Initialize components
    populateSchedule();
    displayTodayTraining();
    setupFilters();
    createWeeklyChart();
    updateCountdown();
    updatePacingDisplay();
    setInterval(updateCountdown, 1000);

    // Modal close handlers
    document.getElementById('workoutModal').addEventListener('click', (e) => {
        if (e.target.id === 'workoutModal') {
            closeModal();
        }
    });
});

// Generate all workouts for the training plan
function generateAllWorkouts() {
    generatedWorkouts = trainingData.map((day, index) => {
        if (day.intensity === '休息' || day.hours === 0) {
            return null; // No workout for rest days
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
function buildWorkout(day, dayIndex) {
    const trainingDate = getTrainingDate(dayIndex + 1);

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
function buildWorkoutDescription(day) {
    let desc = day.content;

    if (userFTP) {
        desc += `\n\n📊 功率目標 (FTP: ${userFTP}W):`;

        // Parse and add power targets based on content
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
function buildWorkoutSteps(day) {
    const steps = [];
    let stepId = 1;
    let stepOrder = 1;

    // Power zone definitions (% FTP)
    const zones = {
        z1: { low: 0, high: 55 },      // Recovery
        z2: { low: 55, high: 75 },     // Endurance
        z3: { low: 75, high: 90 },     // Tempo
        ss: { low: 88, high: 94 },     // Sweet Spot
        z4: { low: 90, high: 105 },    // Threshold
        ftp: { low: 95, high: 105 },   // FTP
        z5: { low: 105, high: 120 },   // VO2max
        z6: { low: 120, high: 150 }    // Anaerobic
    };

    // Helper: Create executable step
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
            // Fallback to power zone
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

    // Helper: Create repeat group
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

        // Reset step order for nested steps
        let nestedOrder = 1;

        // Interval step
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

        // Rest step
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

    // Parse interval patterns
    const intervalMatch = content.match(/(\d+)x(\d+)\s*min/i);

    // Determine main zone based on content
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

    // === BUILD WORKOUT STRUCTURE ===

    // 1. Warmup (10 min @ Zone 2)
    steps.push(createStep(1, "warmup", 600, zones.z2, "暖身 Warmup"));

    // 2. Main set
    if (intervalMatch) {
        // Structured intervals with RepeatGroupDTO
        const count = parseInt(intervalMatch[1]);
        const duration = parseInt(intervalMatch[2]) * 60;
        const restDuration = 300; // 5 min rest

        steps.push(createRepeatGroup(count, duration, mainZone, restDuration, zoneDesc));

    } else if (day.intensity === '高強度' || day.intensity === '最大') {
        // High intensity without explicit intervals - create default structure
        if (day.intensity === '最大') {
            // 5x5min @ VO2max
            steps.push(createRepeatGroup(5, 300, zones.z5, 300, 'VO2max @ 105-120% FTP'));
        } else {
            // 4x10min @ Threshold
            steps.push(createRepeatGroup(4, 600, zones.ftp, 300, '閾值 @ 95-105% FTP'));
        }

    } else {
        // Steady state ride
        const mainDuration = Math.max(600, Math.round((day.hours - 0.33) * 3600));
        steps.push(createStep(3, "interval", mainDuration, mainZone, zoneDesc));
    }

    // 3. Cooldown (10 min @ Zone 1)
    steps.push(createStep(2, "cooldown", 600, zones.z1, "緩和 Cooldown"));

    return steps;
}

// Load saved settings from localStorage
function loadSavedSettings() {
    // Load race date
    const savedRaceDate = localStorage.getItem('wulingRaceDate');
    if (savedRaceDate) {
        raceDate = new Date(savedRaceDate);
        document.getElementById('raceDateInput').value = savedRaceDate;
        updateRaceDateDisplay();
    }

    // Load FTP
    const savedFTP = localStorage.getItem('wulingUserFTP');
    if (savedFTP) {
        userFTP = parseInt(savedFTP);
        document.getElementById('ftpInput').value = userFTP;
        updateFTPDisplay();
    }
}

// Save settings
function saveSettings() {
    // Save race date
    const dateInput = document.getElementById('raceDateInput');
    const selectedDate = dateInput.value;

    if (selectedDate) {
        raceDate = new Date(selectedDate);
        localStorage.setItem('wulingRaceDate', selectedDate);
        updateRaceDateDisplay();
    }

    // Save FTP
    const ftpInput = document.getElementById('ftpInput');
    const ftpValue = parseInt(ftpInput.value);

    if (ftpValue && ftpValue >= 100 && ftpValue <= 500) {
        userFTP = ftpValue;
        localStorage.setItem('wulingUserFTP', ftpValue.toString());
        updateFTPDisplay();
    }

    // Regenerate workouts with new FTP
    generateAllWorkouts();

    // Refresh all displays with new settings
    populateSchedule();
    displayTodayTraining();
    updatePacingDisplay();
    updateCountdown();

    // Show confirmation
    const btn = document.getElementById('saveSettingsBtn');
    const originalText = btn.textContent;
    btn.textContent = '已儲存！';
    btn.style.background = '#00b894';
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 2000);
}

// Update FTP display
function updateFTPDisplay() {
    const ftpDisplay = document.getElementById('ftpDisplay');
    const ftpValue = document.getElementById('displayFTP');
    const ftpUnit = ftpDisplay.querySelector('.ftp-unit');

    if (userFTP) {
        ftpValue.textContent = userFTP;
        ftpUnit.style.display = 'inline';
        ftpDisplay.classList.remove('not-set');
    } else {
        ftpValue.textContent = '未設定';
        ftpUnit.style.display = 'none';
        ftpDisplay.classList.add('not-set');
    }
}

// Update pacing display with actual power values
function updatePacingDisplay() {
    if (!userFTP) return;

    // Update all metric values that show FTP percentages
    const metrics = document.querySelectorAll('.metric-value');
    metrics.forEach(metric => {
        const text = metric.textContent;
        // Match pattern like "FTP 65-70%"
        const match = text.match(/FTP (\d+)-(\d+)%/);
        if (match) {
            const minPercent = parseInt(match[1]);
            const maxPercent = parseInt(match[2]);
            const minPower = calculatePower(minPercent);
            const maxPower = calculatePower(maxPercent);
            metric.innerHTML = `${minPower}-${maxPower}W<br><small style="opacity:0.7">(${minPercent}-${maxPercent}% FTP)</small>`;
        }
    });
}

// Get power zones summary for display
function getPowerZonesSummary() {
    if (!userFTP) return null;

    return {
        z1: { name: 'Zone 1 恢復', range: `< ${calculatePower(55)}W` },
        z2: { name: 'Zone 2 耐力', range: `${calculatePower(55)}-${calculatePower(75)}W` },
        z3: { name: 'Zone 3 節奏', range: `${calculatePower(75)}-${calculatePower(90)}W` },
        z4: { name: 'Zone 4 閾值', range: `${calculatePower(90)}-${calculatePower(105)}W` },
        z5: { name: 'Zone 5 VO2max', range: `${calculatePower(105)}-${calculatePower(120)}W` },
        z6: { name: 'Zone 6 無氧', range: `> ${calculatePower(120)}W` }
    };
}

// Set race date (legacy function for compatibility)
function setRaceDate() {
    const dateInput = document.getElementById('raceDateInput');
    const selectedDate = dateInput.value;

    if (!selectedDate) {
        alert('請選擇比賽日期');
        return;
    }

    raceDate = new Date(selectedDate);
    localStorage.setItem('wulingRaceDate', selectedDate);

    updateRaceDateDisplay();
    populateSchedule();
    displayTodayTraining();
    updateCountdown();
}

// Update race date display
function updateRaceDateDisplay() {
    if (raceDate) {
        const displayDate = document.getElementById('displayRaceDate');
        displayDate.textContent = formatDate(raceDate);
    }
}

// Format date in Chinese
function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
}

// Update countdown timer
function updateCountdown() {
    if (!raceDate) {
        document.getElementById('countdown-days').textContent = '---';
        document.getElementById('countdown-hours').textContent = '--';
        document.getElementById('countdown-minutes').textContent = '--';
        document.getElementById('countdown-seconds').textContent = '--';
        return;
    }

    const now = new Date();
    const diff = raceDate - now;

    if (diff <= 0) {
        document.getElementById('countdown-days').textContent = '0';
        document.getElementById('countdown-hours').textContent = '0';
        document.getElementById('countdown-minutes').textContent = '0';
        document.getElementById('countdown-seconds').textContent = '0';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('countdown-days').textContent = days;
    document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('countdown-seconds').textContent = seconds.toString().padStart(2, '0');
}

// Calculate training date based on race date
function getTrainingDate(dayIndex) {
    if (!raceDate) return null;

    const trainingDate = new Date(raceDate);
    const daysFromRace = 112 - dayIndex; // 112 days total
    trainingDate.setDate(trainingDate.getDate() - daysFromRace);
    return trainingDate;
}

// Populate schedule table
function populateSchedule(filter = 'all') {
    const tbody = document.getElementById('scheduleBody');
    tbody.innerHTML = '';

    const filteredData = filter === 'all'
        ? trainingData
        : trainingData.filter(d => d.phase === filter);

    filteredData.forEach((day, index) => {
        const globalIndex = trainingData.indexOf(day);
        const trainingDate = getTrainingDate(globalIndex + 1);
        const dateStr = trainingDate ? formatDateShort(trainingDate) : `第 ${globalIndex + 1} 天`;

        const tr = document.createElement('tr');

        if (day.intensity === '休息') {
            tr.classList.add('rest-day');
        }
        if (day.week === 16 && day.day === 7) {
            tr.classList.add('race-day');
        }

        // Generate dynamic content with FTP-based power values
        const dynamicContent = generateDynamicContent(day.content, day.intensity);

        // Get power target display if FTP is set
        let powerTargetHtml = '';
        if (userFTP && day.intensity !== '休息') {
            const powerTargets = getPowerTargetForIntensity(day.intensity);
            if (powerTargets) {
                powerTargetHtml = `<span class="power-target">${powerTargets.min}-${powerTargets.max}W</span>`;
            }
        }

        tr.innerHTML = `
            <td>Week ${day.week}</td>
            <td>${dateStr}</td>
            <td><span class="phase-badge phase-${day.phase}">${day.phase}</span></td>
            <td><span class="intensity-badge intensity-${day.intensity}">${day.intensity}</span> ${powerTargetHtml}</td>
            <td>${dynamicContent}</td>
            <td>${day.distance > 0 ? day.distance + ' km' : '-'}</td>
            <td>${day.elevation > 0 ? day.elevation + ' m' : '-'}</td>
            <td>${day.hours > 0 ? day.hours + ' h' : '-'}</td>
            <td>
                ${day.intensity !== '休息' ? `<button class="btn-view-workout" onclick="openWorkoutModal(${globalIndex})">查看</button>` : '-'}
            </td>
        `;

        tbody.appendChild(tr);
    });
}

// Get power target for intensity level
function getPowerTargetForIntensity(intensity) {
    if (!userFTP) return null;

    const targets = {
        '輕鬆': { min: calculatePower(55), max: calculatePower(70) },
        '中等': { min: calculatePower(70), max: calculatePower(85) },
        '高強度': { min: calculatePower(90), max: calculatePower(105) },
        '最大': { min: calculatePower(105), max: calculatePower(120) }
    };

    return targets[intensity] || null;
}

// Format date short
function formatDateShort(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    const weekday = weekdays[date.getDay()];
    return `${month}/${day} (${weekday})`;
}

// Setup filter buttons
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            populateSchedule(btn.dataset.filter);
        });
    });
}

// Display today's training
function displayTodayTraining() {
    const todayTraining = document.getElementById('todayTraining');
    const todayLabel = document.getElementById('todayLabel');
    const todayPhase = document.getElementById('todayPhase');
    const todayIntensity = document.getElementById('todayIntensity');
    const todayDescription = document.getElementById('todayDescription');
    const todayDistance = document.getElementById('todayDistance');
    const todayElevation = document.getElementById('todayElevation');
    const todayHours = document.getElementById('todayHours');
    const todayNote = document.getElementById('todayNote');
    const todayActions = document.getElementById('todayActions');

    if (!raceDate) {
        todayLabel.textContent = '預覽訓練';
        const previewDay = trainingData[Math.floor(Math.random() * trainingData.length)];
        displayTrainingDay(previewDay, -1);
        todayNote.textContent = '請設定比賽日期以查看您的訓練計劃';
        todayActions.innerHTML = '';
        return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let foundDayIndex = -1;
    for (let i = 0; i < trainingData.length; i++) {
        const trainingDate = getTrainingDate(i + 1);
        if (trainingDate) {
            trainingDate.setHours(0, 0, 0, 0);
            if (trainingDate.getTime() === today.getTime()) {
                foundDayIndex = i;
                break;
            }
        }
    }

    if (foundDayIndex >= 0) {
        const dayData = trainingData[foundDayIndex];
        todayLabel.textContent = '今日訓練';
        displayTrainingDay(dayData, foundDayIndex);

        if (dayData.intensity !== '休息') {
            todayActions.innerHTML = `
                <button class="btn-today-workout" onclick="openWorkoutModal(${foundDayIndex})">
                    <span class="btn-icon">🚴</span>
                    查看訓練詳情
                </button>
            `;
        } else {
            todayActions.innerHTML = '';
        }
        todayNote.textContent = '';
    } else {
        // Check if before or after training period
        const firstTrainingDate = getTrainingDate(1);
        const lastTrainingDate = getTrainingDate(112);

        if (today < firstTrainingDate) {
            todayLabel.textContent = '訓練尚未開始';
            todayNote.textContent = `訓練將於 ${formatDate(firstTrainingDate)} 開始`;
            const previewDay = trainingData[0];
            displayTrainingDay(previewDay, 0);
        } else if (today > lastTrainingDate) {
            todayLabel.textContent = '訓練已結束';
            todayNote.textContent = '恭喜完成訓練計劃！';
            const previewDay = trainingData[trainingData.length - 1];
            displayTrainingDay(previewDay, trainingData.length - 1);
        } else {
            todayLabel.textContent = '休息日';
            todayNote.textContent = '好好休息，為下次訓練做準備';
        }
        todayActions.innerHTML = '';
    }

    function displayTrainingDay(day, index) {
        todayPhase.textContent = day.phase;
        todayPhase.className = `today-phase phase-${day.phase}`;

        // Show intensity with power target if FTP is set
        const powerTarget = getPowerTargetForIntensity(day.intensity);
        if (powerTarget && day.intensity !== '休息') {
            todayIntensity.innerHTML = `${day.intensity} <span class="power-target">${powerTarget.min}-${powerTarget.max}W</span>`;
        } else {
            todayIntensity.textContent = day.intensity;
        }
        todayIntensity.className = `today-intensity intensity-${day.intensity}`;

        // Show dynamic content with FTP-based power values
        const dynamicContent = generateDynamicContent(day.content, day.intensity);
        todayDescription.textContent = dynamicContent;

        todayDistance.textContent = day.distance > 0 ? `🚴 ${day.distance} km` : '';
        todayDistance.style.display = day.distance > 0 ? 'inline-flex' : 'none';

        todayElevation.textContent = day.elevation > 0 ? `⛰️ ${day.elevation} m` : '';
        todayElevation.style.display = day.elevation > 0 ? 'inline-flex' : 'none';

        todayHours.textContent = day.hours > 0 ? `⏱️ ${day.hours} h` : '';
        todayHours.style.display = day.hours > 0 ? 'inline-flex' : 'none';
    }
}

// Create weekly mileage chart
function createWeeklyChart() {
    const ctx = document.getElementById('weeklyMileageChart').getContext('2d');

    // Calculate weekly totals
    const weeklyData = [];
    for (let week = 1; week <= 16; week++) {
        const weekDays = trainingData.filter(d => d.week === week);
        const totalDistance = weekDays.reduce((sum, d) => sum + d.distance, 0);
        const totalElevation = weekDays.reduce((sum, d) => sum + d.elevation, 0);
        const totalHours = weekDays.reduce((sum, d) => sum + d.hours, 0);
        weeklyData.push({ week, totalDistance, totalElevation, totalHours });
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: weeklyData.map(d => `W${d.week}`),
            datasets: [
                {
                    label: '騎乘里程 (km)',
                    data: weeklyData.map(d => d.totalDistance),
                    backgroundColor: 'rgba(245, 166, 35, 0.8)',
                    borderColor: '#f5a623',
                    borderWidth: 1,
                    yAxisID: 'y'
                },
                {
                    label: '爬升高度 (m)',
                    data: weeklyData.map(d => d.totalElevation),
                    backgroundColor: 'rgba(0, 184, 148, 0.8)',
                    borderColor: '#00b894',
                    borderWidth: 1,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            scales: {
                y: {
                    type: 'linear',
                    position: 'left',
                    title: {
                        display: true,
                        text: '里程 (km)'
                    }
                },
                y1: {
                    type: 'linear',
                    position: 'right',
                    title: {
                        display: true,
                        text: '爬升 (m)'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        afterBody: function(context) {
                            const weekIndex = context[0].dataIndex;
                            const hours = weeklyData[weekIndex].totalHours;
                            return `訓練時數: ${hours.toFixed(1)} h`;
                        }
                    }
                }
            }
        }
    });
}

// Open workout modal
function openWorkoutModal(dayIndex) {
    const day = trainingData[dayIndex];
    const trainingDate = getTrainingDate(dayIndex + 1);
    const modal = document.getElementById('workoutModal');
    const modalContent = document.getElementById('workoutModalContent');

    const workout = convertToGarminWorkout(day, dayIndex);
    const workoutJson = JSON.stringify(workout, null, 2);

    // Generate dynamic content with FTP
    const dynamicContent = generateDynamicContent(day.content, day.intensity);

    // Get power target for this intensity
    const powerTarget = getPowerTargetForIntensity(day.intensity);
    const powerTargetHtml = powerTarget ?
        `<span class="power-target highlight">${powerTarget.min}-${powerTarget.max}W</span>` : '';

    // Generate power zones display if FTP is set
    const powerZonesHtml = userFTP ? `
        <div class="power-zones-display">
            <h4>您的功率區間 (FTP: ${userFTP}W)</h4>
            <div class="zones-grid">
                <div class="zone-item zone-1"><span class="zone-name">Z1 恢復</span><span class="zone-range">&lt;${calculatePower(55)}W</span></div>
                <div class="zone-item zone-2"><span class="zone-name">Z2 耐力</span><span class="zone-range">${calculatePower(55)}-${calculatePower(75)}W</span></div>
                <div class="zone-item zone-3"><span class="zone-name">Z3 節奏</span><span class="zone-range">${calculatePower(75)}-${calculatePower(90)}W</span></div>
                <div class="zone-item zone-4"><span class="zone-name">Z4 閾值</span><span class="zone-range">${calculatePower(90)}-${calculatePower(105)}W</span></div>
                <div class="zone-item zone-5"><span class="zone-name">Z5 VO2max</span><span class="zone-range">${calculatePower(105)}-${calculatePower(120)}W</span></div>
                <div class="zone-item zone-6"><span class="zone-name">Z6 無氧</span><span class="zone-range">&gt;${calculatePower(120)}W</span></div>
            </div>
        </div>
    ` : `
        <div class="ftp-reminder">
            <p>💡 設定您的 FTP 以顯示個人化功率目標</p>
        </div>
    `;

    modalContent.innerHTML = `
        <div class="modal-header">
            <h3>🚴 訓練詳情</h3>
            <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
            <div class="training-info">
                <span class="training-date">${trainingDate ? formatDate(trainingDate) : `Week ${day.week} Day ${day.day}`}</span>
                <span class="phase-badge phase-${day.phase}">${day.phase}</span>
                <span class="intensity-badge intensity-${day.intensity}">${day.intensity}</span>
                ${powerTargetHtml}
            </div>

            <div class="training-description">
                <strong>訓練內容：</strong>${dynamicContent}
            </div>

            ${day.intensity !== '休息' ? `
                ${powerZonesHtml}

                <div class="workout-section">
                    <div class="workout-header">
                        <span class="workout-type-label">🚴 自行車訓練</span>
                    </div>
                    <div class="workout-name">${workout.workoutName}</div>
                    <div class="workout-stats">
                        <span>距離：${day.distance} km</span>
                        <span>爬升：${day.elevation} m</span>
                        <span>時間：${day.hours} 小時</span>
                    </div>

                    ${renderWorkoutStepsPreview(workout)}

                    <div class="workout-download-section">
                        <h4>下載訓練檔案</h4>
                        <div class="download-buttons">
                            <button class="btn-download-format btn-erg" onclick="downloadErg(${dayIndex})">
                                <span class="format-icon">ERG</span>
                                <span class="format-desc">Wahoo / Tacx / TrainerRoad</span>
                            </button>
                            <button class="btn-download-format btn-zwo" onclick="downloadZwo(${dayIndex})">
                                <span class="format-icon">ZWO</span>
                                <span class="format-desc">Zwift</span>
                            </button>
                            <button class="btn-download-format btn-json" onclick="downloadJson(${dayIndex})">
                                <span class="format-icon">JSON</span>
                                <span class="format-desc">Garmin Connect</span>
                            </button>
                        </div>
                    </div>

                    <details class="workout-json-details">
                        <summary>查看 Garmin 訓練 JSON</summary>
                        <textarea class="workout-json" id="workoutJson" readonly rows="12">${workoutJson}</textarea>
                        <div class="json-actions">
                            <button class="btn-copy" onclick="copyJson()">複製 JSON</button>
                        </div>
                    </details>
                </div>

                <div class="garmin-section">
                    <h4>⌚ 匯入至 Garmin Connect</h4>
                    <div class="garmin-login-form">
                        <input type="email" class="garmin-input" id="garminEmail" placeholder="Garmin 帳號 (Email)">
                        <input type="password" class="garmin-input" id="garminPassword" placeholder="Garmin 密碼">
                        <button class="btn-garmin-import" onclick="importToGarmin(${dayIndex})">
                            一鍵匯入 Garmin Connect
                        </button>
                    </div>
                    <div class="garmin-status" id="garminStatus"></div>
                </div>
            ` : `
                <div class="no-workout">
                    <p>今天是休息日，好好恢復體力！</p>
                </div>
            `}
        </div>
        <div class="modal-footer">
            <button class="btn-close" onclick="closeModal()">關閉</button>
        </div>
    `;

    modal.classList.add('show');
}

// Render Garmin-style workout steps preview
function renderWorkoutStepsPreview(workoutData) {
    if (!workoutData.workoutSegments || workoutData.workoutSegments.length === 0) {
        return '';
    }

    let html = '<div class="steps-preview"><div class="steps-header">訓練步驟 Steps</div>';

    workoutData.workoutSegments.forEach(segment => {
        if (segment.workoutSteps) {
            segment.workoutSteps.forEach(step => {
                html += renderStepItem(step);
            });
        }
    });

    html += '</div>';
    return html;
}

// Render a single step item (handles both regular steps and repeat groups)
function renderStepItem(step) {
    const stepType = step.stepType?.stepTypeKey || 'interval';

    // Handle repeat groups
    if (stepType === 'repeat' && step.workoutSteps) {
        let html = `<div class="step-repeat-group">
            <div class="repeat-header">
                <span class="repeat-times">${step.numberOfIterations || 2}x</span>
                <span class="repeat-description">重複組</span>
            </div>
            <div class="repeat-steps">`;

        step.workoutSteps.forEach(subStep => {
            html += renderSingleStep(subStep);
        });

        html += '</div></div>';
        return html;
    }

    return renderSingleStep(step);
}

// Render a single executable step
function renderSingleStep(step) {
    const stepType = step.stepType?.stepTypeKey || 'interval';
    const stepColors = {
        'warmup': '#E2001A',
        'interval': '#007AFF',
        'recovery': '#8E8E93',
        'rest': '#8E8E93',
        'cooldown': '#34C759'
    };
    const stepLabels = {
        'warmup': '暖身 Warm Up',
        'interval': '主課表 Interval',
        'recovery': '恢復 Recover',
        'rest': '休息 Rest',
        'cooldown': '緩和 Cool Down'
    };

    const color = stepColors[stepType] || '#007AFF';
    const label = stepLabels[stepType] || 'Interval';

    // Format duration
    let durationText = '';
    const endCondition = step.endCondition?.conditionTypeKey;
    if (endCondition === 'time') {
        const secs = step.endConditionValue || 0;
        const mins = Math.floor(secs / 60);
        const remainingSecs = secs % 60;
        durationText = remainingSecs > 0 ? `${mins}:${String(remainingSecs).padStart(2, '0')}` : `${mins}:00`;
    } else if (endCondition === 'distance') {
        const meters = step.endConditionValue || 0;
        durationText = meters >= 1000 ? `${(meters / 1000).toFixed(1)} km` : `${meters} m`;
    } else if (endCondition === 'lap.button') {
        durationText = '按下計圈鍵';
    }

    // Format target (power)
    let targetText = '';
    const targetType = step.targetType?.workoutTargetTypeKey;
    if (targetType === 'power' && step.targetValueOne && step.targetValueTwo) {
        targetText = `功率目標 · ${Math.round(step.targetValueOne)}-${Math.round(step.targetValueTwo)} W`;
    } else if (targetType === 'power.zone' && step.targetValueOne) {
        targetText = `功率區間 · Zone ${step.targetValueOne}`;
    }

    // Description
    let descriptionText = step.description || '';

    return `
        <div class="step-item step-type-${stepType}">
            <div class="step-color-bar" style="background-color: ${color}"></div>
            <div class="step-content">
                <div class="step-label">${label}</div>
                ${descriptionText ? `<div class="step-description">${descriptionText}</div>` : ''}
                <div class="step-duration">${durationText}</div>
                ${targetText ? `<div class="step-target">${targetText}</div>` : ''}
            </div>
        </div>
    `;
}

// Close modal
function closeModal() {
    document.getElementById('workoutModal').classList.remove('show');
}

// Convert training data to Garmin workout format (uses pre-generated workouts)
function convertToGarminWorkout(day, dayIndex) {
    // Use pre-generated workout if available
    if (generatedWorkouts[dayIndex] && generatedWorkouts[dayIndex].workout) {
        return generatedWorkouts[dayIndex].workout;
    }

    // Fallback: generate on the fly if not pre-generated
    return buildWorkout(day, dayIndex);
}

// Legacy function for backward compatibility (deprecated)
function convertToGarminWorkoutLegacy(day, dayIndex) {
    const trainingDate = getTrainingDate(dayIndex + 1);
    const dateStr = trainingDate ? formatDate(trainingDate) : `Week ${day.week} Day ${day.day}`;

    const workout = {
        workoutId: null,
        ownerId: null,
        workoutName: `西進武嶺 W${day.week}D${day.day} - ${day.phase}`,
        description: `${day.content}\n\n距離：${day.distance}km | 爬升：${day.elevation}m | 時間：${day.hours}h`,
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
            workoutSteps: generateBikeSteps(day)
        }],
        estimatedDurationInSecs: Math.round(day.hours * 3600),
        estimatedDistanceInMeters: day.distance * 1000
    };

    return workout;
}

// Generate bike workout steps
function generateBikeSteps(day) {
    const steps = [];
    let stepId = 1;
    let stepOrder = 1;

    // Power target presets (% FTP ranges)
    const powerTargets = {
        zone1: { low: 0, high: 55, name: 'Recovery' },
        zone2: { low: 55, high: 75, name: 'Endurance' },
        zone3: { low: 75, high: 90, name: 'Tempo' },
        sweetSpot: { low: 88, high: 94, name: 'Sweet Spot' },
        zone4: { low: 90, high: 105, name: 'Threshold' },
        threshold: { low: 95, high: 105, name: 'FTP' },
        zone5: { low: 105, high: 120, name: 'VO2max' },
        zone6: { low: 120, high: 150, name: 'Anaerobic' }
    };

    // Helper function to create a step with power target
    function createStep(stepTypeId, stepTypeKey, durationSeconds, powerTarget, description) {
        const step = {
            type: "ExecutableStepDTO",
            stepId: stepId++,
            stepOrder: stepOrder++,
            childStepId: null,
            description: description || null,
            stepType: {
                stepTypeId: stepTypeId,
                stepTypeKey: stepTypeKey
            },
            endCondition: {
                conditionTypeId: 2,
                conditionTypeKey: "time"
            },
            endConditionValue: durationSeconds
        };

        if (powerTarget && userFTP) {
            // Use custom power target with actual watts
            const lowWatts = Math.round(userFTP * powerTarget.low / 100);
            const highWatts = Math.round(userFTP * powerTarget.high / 100);
            step.targetType = {
                workoutTargetTypeId: 2,
                workoutTargetTypeKey: "power"
            };
            step.targetValueOne = lowWatts;
            step.targetValueTwo = highWatts;
        } else if (powerTarget) {
            // No FTP set, use power zone
            let zoneNumber = 3;
            if (powerTarget.low >= 105) zoneNumber = 5;
            else if (powerTarget.low >= 88) zoneNumber = 4;
            else if (powerTarget.low >= 75) zoneNumber = 3;
            else if (powerTarget.low >= 55) zoneNumber = 2;
            else zoneNumber = 1;

            step.targetType = {
                workoutTargetTypeId: 6,
                workoutTargetTypeKey: "power.zone"
            };
            step.targetValueOne = zoneNumber;
            step.targetValueTwo = null;
        } else {
            // No target
            step.targetType = {
                workoutTargetTypeId: 1,
                workoutTargetTypeKey: "no.target"
            };
            step.targetValueOne = null;
            step.targetValueTwo = null;
        }

        return step;
    }

    // Parse content for interval patterns
    const content = day.content;

    // Match patterns like "2x20min", "3x15min", "5x6min", "4x5min", etc.
    const intervalMatch = content.match(/(\d+)x(\d+)\s*min/i);

    // Detect workout type and get power target
    let mainTarget = powerTargets.zone3; // Default tempo
    let description = '';

    if (content.includes('Sweet Spot') || content.includes('88-94%')) {
        mainTarget = powerTargets.sweetSpot;
        description = 'Sweet Spot @ 88-94% FTP';
    } else if (content.includes('閾值') || content.includes('Threshold') || content.match(/@ ?FTP/)) {
        mainTarget = powerTargets.threshold;
        description = 'Threshold @ 95-105% FTP';
    } else if (content.includes('VO2max') || content.includes('110%') || content.includes('105-120%')) {
        mainTarget = powerTargets.zone5;
        description = 'VO2max @ 105-120% FTP';
    } else if (content.includes('Zone 2') || content.includes('有氧') || content.includes('恢復騎')) {
        mainTarget = powerTargets.zone2;
        description = 'Zone 2 Endurance @ 55-75% FTP';
    } else if (content.includes('節奏') || content.includes('Tempo') || content.includes('75-90%') || content.includes('75%')) {
        mainTarget = powerTargets.zone3;
        description = 'Tempo @ 75-90% FTP';
    } else if (content.includes('爬坡') || content.includes('坡度')) {
        mainTarget = powerTargets.zone4;
        description = 'Climbing @ 90-105% FTP';
    }

    // Warmup - 10 minutes @ Zone 2
    steps.push(createStep(1, "warmup", 600, powerTargets.zone2, '暖身 Warmup'));

    if (intervalMatch) {
        // Structured intervals detected
        const intervalCount = parseInt(intervalMatch[1]);
        const intervalDuration = parseInt(intervalMatch[2]) * 60; // Convert to seconds
        const restDuration = 300; // 5 min rest between intervals

        for (let i = 0; i < intervalCount; i++) {
            steps.push(createStep(3, "interval", intervalDuration, mainTarget, `${description} (${i + 1}/${intervalCount})`));

            if (i < intervalCount - 1) {
                steps.push(createStep(4, "rest", restDuration, powerTargets.zone1, '恢復 Recovery'));
            }
        }
    } else {
        // No interval pattern - use intensity-based approach
        if (day.intensity === '輕鬆') {
            const mainDuration = Math.max(600, (day.hours - 0.33) * 3600);
            steps.push(createStep(3, "interval", mainDuration, powerTargets.zone2, 'Zone 2 有氧騎乘'));
        } else if (day.intensity === '中等') {
            const mainDuration = Math.max(600, (day.hours - 0.33) * 3600);
            steps.push(createStep(3, "interval", mainDuration, mainTarget, description || 'Tempo 騎乘'));
        } else if (day.intensity === '高強度') {
            // Default high intensity: 4x10min @ Threshold
            for (let i = 0; i < 4; i++) {
                steps.push(createStep(3, "interval", 600, powerTargets.threshold, `Threshold (${i + 1}/4)`));
                if (i < 3) {
                    steps.push(createStep(4, "rest", 300, powerTargets.zone1, '恢復'));
                }
            }
        } else if (day.intensity === '最大') {
            // Default max intensity: 5x5min @ VO2max
            for (let i = 0; i < 5; i++) {
                steps.push(createStep(3, "interval", 300, powerTargets.zone5, `VO2max (${i + 1}/5)`));
                if (i < 4) {
                    steps.push(createStep(4, "rest", 300, powerTargets.zone1, '恢復'));
                }
            }
        }
    }

    // Cooldown - 10 minutes @ Zone 1
    steps.push(createStep(2, "cooldown", 600, powerTargets.zone1, '緩和 Cooldown'));

    return steps;
}

// Copy JSON to clipboard
function copyJson() {
    const jsonTextarea = document.getElementById('workoutJson');
    jsonTextarea.select();
    document.execCommand('copy');

    const copyBtn = document.querySelector('.btn-copy');
    copyBtn.textContent = '已複製！';
    copyBtn.classList.add('copied');

    setTimeout(() => {
        copyBtn.textContent = '複製 JSON';
        copyBtn.classList.remove('copied');
    }, 2000);
}

// Download JSON file
function downloadJson(dayIndex) {
    const day = trainingData[dayIndex];
    const workout = convertToGarminWorkout(day, dayIndex);
    const json = JSON.stringify(workout, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wuling_W${day.week}D${day.day}_${day.phase}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Generate ERG file content (for Wahoo, Tacx, TrainerRoad, etc.)
function generateErgFile(day, dayIndex) {
    const ftpValue = userFTP || 200; // Default FTP if not set
    const workout = convertToGarminWorkout(day, dayIndex);
    const steps = workout.workoutSegments[0].workoutSteps;

    let ergContent = '[COURSE HEADER]\n';
    ergContent += 'VERSION = 2\n';
    ergContent += 'UNITS = ENGLISH\n';
    ergContent += `DESCRIPTION = ${day.content}\n`;
    ergContent += `FILE NAME = wuling_W${day.week}D${day.day}\n`;
    ergContent += 'MINUTES WATTS\n';
    ergContent += '[END COURSE HEADER]\n';
    ergContent += '[COURSE DATA]\n';

    let currentTime = 0; // in minutes

    steps.forEach(step => {
        const durationMinutes = (step.durationValue || 600) / 60;
        const powerPercent = getPowerPercentForZone(step.targetValue || 2);
        const watts = Math.round(ftpValue * powerPercent / 100);

        // Start point
        ergContent += `${currentTime.toFixed(2)}\t${watts}\n`;

        // End point
        currentTime += durationMinutes;
        ergContent += `${currentTime.toFixed(2)}\t${watts}\n`;
    });

    ergContent += '[END COURSE DATA]\n';

    return ergContent;
}

// Generate ZWO file content (for Zwift)
function generateZwoFile(day, dayIndex) {
    const workout = convertToGarminWorkout(day, dayIndex);
    const steps = workout.workoutSegments[0].workoutSteps;

    let zwoContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
    zwoContent += '<workout_file>\n';
    zwoContent += '    <author>西進武嶺 SUB4 訓練計劃</author>\n';
    zwoContent += `    <name>${escapeXml(workout.workoutName)}</name>\n`;
    zwoContent += `    <description>${escapeXml(day.content)}</description>\n`;
    zwoContent += '    <sportType>bike</sportType>\n';
    zwoContent += '    <tags>\n';
    zwoContent += `        <tag name="${day.phase}"/>\n`;
    zwoContent += `        <tag name="${day.intensity}"/>\n`;
    zwoContent += '    </tags>\n';
    zwoContent += '    <workout>\n';

    steps.forEach(step => {
        const duration = step.durationValue || 600;
        const powerPercent = getPowerPercentForZone(step.targetValue || 2) / 100;

        if (step.stepType === 'WARMUP') {
            zwoContent += `        <Warmup Duration="${duration}" PowerLow="0.50" PowerHigh="${powerPercent.toFixed(2)}"/>\n`;
        } else if (step.stepType === 'COOLDOWN') {
            zwoContent += `        <Cooldown Duration="${duration}" PowerLow="${powerPercent.toFixed(2)}" PowerHigh="0.50"/>\n`;
        } else if (step.stepType === 'REST') {
            zwoContent += `        <SteadyState Duration="${duration}" Power="0.55" Cadence="85"/>\n`;
        } else {
            // INTERVAL or other
            zwoContent += `        <SteadyState Duration="${duration}" Power="${powerPercent.toFixed(2)}"/>\n`;
        }
    });

    zwoContent += '    </workout>\n';
    zwoContent += '</workout_file>\n';

    return zwoContent;
}

// Helper function to get power percentage for zone
function getPowerPercentForZone(zone) {
    const zonePercents = {
        1: 50,   // Zone 1: Recovery
        2: 65,   // Zone 2: Endurance
        3: 82,   // Zone 3: Tempo
        4: 95,   // Zone 4: Threshold
        5: 110,  // Zone 5: VO2max
        6: 130   // Zone 6: Anaerobic
    };
    return zonePercents[zone] || 65;
}

// Helper function to escape XML special characters
function escapeXml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

// Download ERG file
function downloadErg(dayIndex) {
    const day = trainingData[dayIndex];
    const ergContent = generateErgFile(day, dayIndex);
    const blob = new Blob([ergContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wuling_W${day.week}D${day.day}_${day.phase}.erg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Download ZWO file
function downloadZwo(dayIndex) {
    const day = trainingData[dayIndex];
    const zwoContent = generateZwoFile(day, dayIndex);
    const blob = new Blob([zwoContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wuling_W${day.week}D${day.day}_${day.phase}.zwo`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Import to Garmin Connect
async function importToGarmin(dayIndex) {
    const email = document.getElementById('garminEmail').value;
    const password = document.getElementById('garminPassword').value;
    const statusDiv = document.getElementById('garminStatus');

    if (!email || !password) {
        statusDiv.textContent = '請輸入 Garmin 帳號和密碼';
        statusDiv.className = 'garmin-status error';
        return;
    }

    const day = trainingData[dayIndex];
    const workout = convertToGarminWorkout(day, dayIndex);
    const trainingDate = getTrainingDate(dayIndex + 1);

    statusDiv.textContent = '正在匯入...';
    statusDiv.className = 'garmin-status';
    statusDiv.style.display = 'block';
    statusDiv.style.background = 'rgba(245, 166, 35, 0.9)';

    try {
        const response = await fetch('/api/garmin/import', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                workouts: [{
                    workout,
                    scheduledDate: trainingDate ? trainingDate.toISOString().split('T')[0] : null,
                    dayIndex
                }]
            })
        });

        const result = await response.json();

        if (result.success) {
            statusDiv.textContent = `✓ ${result.message}`;
            statusDiv.className = 'garmin-status success';
        } else {
            statusDiv.textContent = `✗ ${result.error}`;
            statusDiv.className = 'garmin-status error';
        }
    } catch (error) {
        statusDiv.textContent = `✗ 匯入失敗：${error.message}`;
        statusDiv.className = 'garmin-status error';
    }
}

// Batch import all workouts
async function batchImportToGarmin() {
    const email = prompt('請輸入 Garmin 帳號 (Email)：');
    if (!email) return;

    const password = prompt('請輸入 Garmin 密碼：');
    if (!password) return;

    const workoutsToImport = trainingData
        .filter(day => day.intensity !== '休息')
        .map((day, index) => {
            const globalIndex = trainingData.indexOf(day);
            return {
                workout: convertToGarminWorkout(day, globalIndex),
                scheduledDate: getTrainingDate(globalIndex + 1)?.toISOString().split('T')[0],
                dayIndex: globalIndex
            };
        });

    alert(`即將匯入 ${workoutsToImport.length} 個訓練至 Garmin Connect。這可能需要幾分鐘時間。`);

    try {
        const response = await fetch('/api/garmin/import', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                workouts: workoutsToImport
            })
        });

        const result = await response.json();

        if (result.success) {
            alert(`匯入完成！\n${result.message}`);
        } else {
            alert(`匯入失敗：${result.error}`);
        }
    } catch (error) {
        alert(`匯入失敗：${error.message}`);
    }
}
