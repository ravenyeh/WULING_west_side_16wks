// 西進武嶺 SUB4 16週訓練計劃
// Training Plan Data - 112 Days (16 Weeks)

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

// Race date management
let raceDate = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Load saved race date
    const savedRaceDate = localStorage.getItem('wulingRaceDate');
    if (savedRaceDate) {
        raceDate = new Date(savedRaceDate);
        document.getElementById('raceDateInput').value = savedRaceDate;
        updateRaceDateDisplay();
    }

    // Set up race date button
    document.getElementById('setRaceDateBtn').addEventListener('click', setRaceDate);
    document.getElementById('raceDateInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') setRaceDate();
    });

    // Initialize components
    populateSchedule();
    displayTodayTraining();
    setupFilters();
    createWeeklyChart();
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Modal close handlers
    document.getElementById('workoutModal').addEventListener('click', (e) => {
        if (e.target.id === 'workoutModal') {
            closeModal();
        }
    });
});

// Set race date
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

        tr.innerHTML = `
            <td>Week ${day.week}</td>
            <td>${dateStr}</td>
            <td><span class="phase-badge phase-${day.phase}">${day.phase}</span></td>
            <td><span class="intensity-badge intensity-${day.intensity}">${day.intensity}</span></td>
            <td>${day.content}</td>
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
        todayIntensity.textContent = day.intensity;
        todayIntensity.className = `today-intensity intensity-${day.intensity}`;
        todayDescription.textContent = day.content;

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
            </div>

            <div class="training-description">
                <strong>訓練內容：</strong>${day.content}
            </div>

            ${day.intensity !== '休息' ? `
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

                    <details class="workout-json-details">
                        <summary>查看 Garmin 訓練 JSON</summary>
                        <textarea class="workout-json" id="workoutJson" readonly rows="12">${workoutJson}</textarea>
                        <div class="json-actions">
                            <button class="btn-copy" onclick="copyJson()">複製 JSON</button>
                            <button class="btn-download" onclick="downloadJson(${dayIndex})">下載 JSON</button>
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

// Close modal
function closeModal() {
    document.getElementById('workoutModal').classList.remove('show');
}

// Convert training data to Garmin workout format
function convertToGarminWorkout(day, dayIndex) {
    const trainingDate = getTrainingDate(dayIndex + 1);
    const dateStr = trainingDate ? formatDate(trainingDate) : `Week ${day.week} Day ${day.day}`;

    const workout = {
        workoutName: `西進武嶺 W${day.week}D${day.day} - ${day.phase}`,
        description: `${day.content}\n\n距離：${day.distance}km | 爬升：${day.elevation}m | 時間：${day.hours}h`,
        sport: 'CYCLING',
        subSport: 'ROAD',
        workoutSegments: [{
            segmentOrder: 1,
            sportType: 'CYCLING',
            workoutSteps: generateBikeSteps(day)
        }]
    };

    return workout;
}

// Generate bike workout steps
function generateBikeSteps(day) {
    const steps = [];
    let stepOrder = 1;

    // Warmup
    steps.push({
        stepOrder: stepOrder++,
        stepType: 'WARMUP',
        childStepId: null,
        description: '暖身',
        durationType: 'TIME',
        durationValue: 600, // 10 minutes in seconds
        targetType: 'POWER_ZONE',
        targetValue: 2, // Zone 2
        targetValueLow: null,
        targetValueHigh: null
    });

    // Main set based on intensity
    if (day.intensity === '輕鬆') {
        steps.push({
            stepOrder: stepOrder++,
            stepType: 'INTERVAL',
            description: 'Zone 2 有氧騎乘',
            durationType: 'TIME',
            durationValue: (day.hours - 0.5) * 3600,
            targetType: 'POWER_ZONE',
            targetValue: 2
        });
    } else if (day.intensity === '中等') {
        steps.push({
            stepOrder: stepOrder++,
            stepType: 'INTERVAL',
            description: 'Zone 2-3 節奏騎乘',
            durationType: 'TIME',
            durationValue: (day.hours - 0.5) * 3600,
            targetType: 'POWER_ZONE',
            targetValue: 3
        });
    } else if (day.intensity === '高強度') {
        // Interval set
        const intervalCount = 4;
        const intervalDuration = 1200; // 20 min
        const restDuration = 300; // 5 min

        for (let i = 0; i < intervalCount; i++) {
            steps.push({
                stepOrder: stepOrder++,
                stepType: 'INTERVAL',
                description: `間歇 ${i + 1}/${intervalCount}`,
                durationType: 'TIME',
                durationValue: intervalDuration,
                targetType: 'POWER_ZONE',
                targetValue: 4 // Zone 4 (Threshold)
            });

            if (i < intervalCount - 1) {
                steps.push({
                    stepOrder: stepOrder++,
                    stepType: 'REST',
                    description: '恢復',
                    durationType: 'TIME',
                    durationValue: restDuration,
                    targetType: 'POWER_ZONE',
                    targetValue: 1
                });
            }
        }
    } else if (day.intensity === '最大') {
        // High intensity intervals
        const intervalCount = 5;
        const intervalDuration = 360; // 6 min
        const restDuration = 300; // 5 min

        for (let i = 0; i < intervalCount; i++) {
            steps.push({
                stepOrder: stepOrder++,
                stepType: 'INTERVAL',
                description: `最大強度 ${i + 1}/${intervalCount}`,
                durationType: 'TIME',
                durationValue: intervalDuration,
                targetType: 'POWER_ZONE',
                targetValue: 5 // Zone 5 (VO2max)
            });

            if (i < intervalCount - 1) {
                steps.push({
                    stepOrder: stepOrder++,
                    stepType: 'REST',
                    description: '恢復',
                    durationType: 'TIME',
                    durationValue: restDuration,
                    targetType: 'POWER_ZONE',
                    targetValue: 1
                });
            }
        }
    }

    // Cooldown
    steps.push({
        stepOrder: stepOrder++,
        stepType: 'COOLDOWN',
        description: '緩和',
        durationType: 'TIME',
        durationValue: 600, // 10 minutes
        targetType: 'POWER_ZONE',
        targetValue: 1
    });

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
