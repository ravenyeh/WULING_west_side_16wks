// 西進武嶺 SUB4 16週訓練計劃 - Settings Module

import {
    raceDate, userFTP, targetTime,
    setRaceDate, setUserFTP, setTargetTime,
    calculatePower, calculateSegmentPacing
} from './powerZones.js';
import { generateAllWorkouts } from './workoutBuilder.js';

// LocalStorage keys
const STORAGE_KEYS = {
    RACE_DATE: 'wulingRaceDate',
    USER_FTP: 'wulingUserFTP',
    TARGET_TIME: 'wulingTargetTime',
    GARMIN_CREDENTIALS: 'wulingGarminCredentials'
};

// Load saved settings from localStorage
export function loadSavedSettings() {
    // Load race date
    const savedRaceDate = localStorage.getItem(STORAGE_KEYS.RACE_DATE);
    if (savedRaceDate) {
        setRaceDate(new Date(savedRaceDate));
        const raceDateInput = document.getElementById('raceDateInput');
        if (raceDateInput) raceDateInput.value = savedRaceDate;
        updateRaceDateDisplay();
    }

    // Load FTP
    const savedFTP = localStorage.getItem(STORAGE_KEYS.USER_FTP);
    if (savedFTP) {
        setUserFTP(parseInt(savedFTP));
        const ftpInput = document.getElementById('ftpInput');
        if (ftpInput) ftpInput.value = userFTP;
        updateFTPDisplay();
    }

    // Load target time
    const savedTargetTime = localStorage.getItem(STORAGE_KEYS.TARGET_TIME);
    if (savedTargetTime) {
        setTargetTime(parseInt(savedTargetTime));
    }
    const hours = Math.floor(targetTime / 60);
    const minutes = targetTime % 60;
    const targetHoursInput = document.getElementById('targetHours');
    const targetMinutesInput = document.getElementById('targetMinutes');
    if (targetHoursInput) targetHoursInput.value = hours;
    if (targetMinutesInput) targetMinutesInput.value = minutes;

    updateSegmentPacing();
    updateGoalDisplay();
}

// Save settings to localStorage
export function saveSettings() {
    // Save race date
    const dateInput = document.getElementById('raceDateInput');
    const selectedDate = dateInput?.value;

    if (selectedDate) {
        setRaceDate(new Date(selectedDate));
        localStorage.setItem(STORAGE_KEYS.RACE_DATE, selectedDate);
        updateRaceDateDisplay();
    }

    // Save FTP
    const ftpInput = document.getElementById('ftpInput');
    const ftpValue = parseInt(ftpInput?.value);

    if (ftpValue && ftpValue >= 100 && ftpValue <= 500) {
        setUserFTP(ftpValue);
        localStorage.setItem(STORAGE_KEYS.USER_FTP, ftpValue.toString());
        updateFTPDisplay();
    }

    // Save target time
    const targetHoursVal = parseInt(document.getElementById('targetHours')?.value) || 4;
    const targetMinutesVal = parseInt(document.getElementById('targetMinutes')?.value) || 0;
    const newTargetTime = targetHoursVal * 60 + targetMinutesVal;
    setTargetTime(newTargetTime);
    localStorage.setItem(STORAGE_KEYS.TARGET_TIME, newTargetTime.toString());

    // Regenerate workouts with new FTP
    generateAllWorkouts();

    // Update displays
    updateSegmentPacing();
    updateGoalDisplay();

    // Dispatch event for main module to handle UI refresh
    window.dispatchEvent(new CustomEvent('settingsSaved'));

    // Show confirmation
    const btn = document.getElementById('saveSettingsBtn');
    if (btn) {
        const originalText = btn.textContent;
        btn.textContent = '已儲存！';
        btn.style.background = '#00b894';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    }
}

// Update FTP display
export function updateFTPDisplay() {
    const ftpDisplay = document.getElementById('ftpDisplay');
    const ftpValue = document.getElementById('displayFTP');
    const ftpUnit = ftpDisplay?.querySelector('.ftp-unit');

    if (userFTP && ftpValue) {
        ftpValue.textContent = userFTP;
        if (ftpUnit) ftpUnit.style.display = 'inline';
        if (ftpDisplay) ftpDisplay.classList.remove('not-set');
    } else if (ftpValue) {
        ftpValue.textContent = '未設定';
        if (ftpUnit) ftpUnit.style.display = 'none';
        if (ftpDisplay) ftpDisplay.classList.add('not-set');
    }
}

// Update race date display
export function updateRaceDateDisplay() {
    const displayRaceDate = document.getElementById('displayRaceDate');
    if (displayRaceDate && raceDate) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
        displayRaceDate.textContent = raceDate.toLocaleDateString('zh-TW', options);
    }
}

// Update pacing display with actual power values
export function updatePacingDisplay() {
    if (!userFTP) return;

    const metrics = document.querySelectorAll('.metric-value');
    metrics.forEach(metric => {
        let minPercent, maxPercent;

        if (metric.dataset.ftpMin && metric.dataset.ftpMax) {
            minPercent = parseInt(metric.dataset.ftpMin);
            maxPercent = parseInt(metric.dataset.ftpMax);
        } else {
            const text = metric.textContent;
            const match = text.match(/FTP (\d+)-(\d+)%/);
            if (match) {
                minPercent = parseInt(match[1]);
                maxPercent = parseInt(match[2]);
                metric.dataset.ftpMin = minPercent;
                metric.dataset.ftpMax = maxPercent;
            }
        }

        if (minPercent && maxPercent) {
            const minPower = calculatePower(minPercent);
            const maxPower = calculatePower(maxPercent);
            metric.innerHTML = `${minPower}-${maxPower}W<br><small style="opacity:0.7">(${minPercent}-${maxPercent}% FTP)</small>`;
        }
    });
}

// Update segment pacing based on target time
export function updateSegmentPacing() {
    const pacingData = calculateSegmentPacing();

    pacingData.forEach((seg, index) => {
        const card = document.querySelector(`.pacing-card[data-segment="${index + 1}"]`);
        if (!card) return;

        const metrics = card.querySelectorAll('.metric');
        metrics.forEach(metric => {
            const label = metric.querySelector('.metric-label');
            const value = metric.querySelector('.metric-value');
            if (!label || !value) return;

            const labelText = label.textContent;

            if (labelText === '目標時間') {
                const mins = seg.timeMinutes;
                const rangeMin = Math.max(1, mins - 3);
                const rangeMax = mins + 3;
                value.textContent = `${rangeMin}-${rangeMax} 分鐘`;
            } else if (labelText === '平均時速') {
                value.textContent = `${seg.speed} km/h`;
            } else if (labelText === '目標功率' && userFTP) {
                const minPower = calculatePower(seg.powerPercentMin);
                const maxPower = calculatePower(seg.powerPercentMax);
                value.innerHTML = `${minPower}-${maxPower}W<br><small style="opacity:0.7">(${seg.powerPercentMin}-${seg.powerPercentMax}% FTP)</small>`;
                value.dataset.ftpMin = seg.powerPercentMin;
                value.dataset.ftpMax = seg.powerPercentMax;
            }
        });
    });

    updatePacingSummary(pacingData);
}

// Update pacing summary table
export function updatePacingSummary(pacingData) {
    const summaryTitle = document.getElementById('pacingSummaryTitle');
    if (summaryTitle) {
        const hours = Math.floor(targetTime / 60);
        const mins = targetTime % 60;
        const isExactHour = mins === 0 && hours >= 3 && hours <= 8;
        const goalText = isExactHour ? `SUB${hours}` : `${hours}:${String(mins).padStart(2, '0')}`;
        summaryTitle.textContent = `${goalText} 配速總結`;
    }

    const summaryTable = document.getElementById('pacingSummaryTable');
    if (!summaryTable) return;

    const rows = summaryTable.querySelectorAll('.summary-row:not(.header)');
    let cumulativeTime = 0;
    let cumulativeDistance = 0;

    rows.forEach((row, index) => {
        if (index < pacingData.length) {
            const seg = pacingData[index];
            const spans = row.querySelectorAll('span');

            cumulativeTime += seg.timeMinutes;
            cumulativeDistance += seg.distance;

            if (spans[3]) spans[3].textContent = `${seg.timeMinutes}min`;

            if (spans[4]) {
                const hours = Math.floor(cumulativeTime / 60);
                const mins = cumulativeTime % 60;
                spans[4].textContent = `${hours}:${String(mins).padStart(2, '0')}`;
            }
        }
    });
}

// Update goal display based on target time
export function updateGoalDisplay() {
    const hours = Math.floor(targetTime / 60);
    const mins = targetTime % 60;
    const isExactHour = mins === 0 && hours >= 3 && hours <= 8;
    const goalText = isExactHour ? `SUB${hours}` : `${hours}:${String(mins).padStart(2, '0')}`;

    // Update page title
    document.title = `西進武嶺 ${goalText} 16週訓練計劃 | Garmin 整合`;

    // Update nav brand
    const navBrand = document.querySelector('.nav-brand');
    if (navBrand) {
        navBrand.textContent = `西進武嶺 ${goalText}`;
    }

    // Update hero title
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        heroTitle.textContent = `西進武嶺 ${goalText}`;
    }

    const goalPrefix = document.getElementById('goalPrefix');
    const goalNumber = document.getElementById('goalNumber');
    const goalSuffix = document.getElementById('goalSuffix');
    const goalTimeText = document.getElementById('goalTimeText');
    const keyTipsTitle = document.getElementById('keyTipsTitle');

    if (goalPrefix && goalNumber && goalSuffix) {
        if (isExactHour) {
            goalPrefix.textContent = '突破';
            goalNumber.textContent = hours;
            goalSuffix.textContent = '小時大關';
        } else {
            goalPrefix.textContent = '目標';
            goalNumber.textContent = `${hours}:${String(mins).padStart(2, '0')}`;
            goalSuffix.textContent = '完賽';
        }
    }

    if (goalTimeText) {
        if (isExactHour) {
            goalTimeText.textContent = `SUB${hours}（${hours}小時內完成）是業餘車手的重要里程碑，需要優秀的體能與精準的配速策略。`;
        } else {
            goalTimeText.textContent = `${hours}小時${mins > 0 ? mins + '分鐘' : ''}內完成需要優秀的體能與精準的配速策略。`;
        }
    }

    // Update key tips title
    if (keyTipsTitle) {
        keyTipsTitle.textContent = `${goalText} 關鍵要點`;
    }
}

// Garmin credentials functions
export function getGarminCredentials() {
    const saved = localStorage.getItem(STORAGE_KEYS.GARMIN_CREDENTIALS);
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            return null;
        }
    }
    return null;
}

export function saveGarminCredentials(email, password) {
    localStorage.setItem(STORAGE_KEYS.GARMIN_CREDENTIALS, JSON.stringify({ email, password }));
}

export function hasGarminCredentials() {
    const creds = getGarminCredentials();
    return creds && creds.email && creds.password;
}

export function clearGarminCredentials() {
    localStorage.removeItem(STORAGE_KEYS.GARMIN_CREDENTIALS);
}
