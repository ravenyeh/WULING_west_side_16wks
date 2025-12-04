// 西進武嶺 SUB4 16週訓練計劃 - Training Data Module

// 訓練資料
export const trainingData = [
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

// Training content templates with FTP-based power targets
export const trainingTemplates = {
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
