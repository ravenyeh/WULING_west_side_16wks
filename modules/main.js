// 西進武嶺 SUB4 16週訓練計劃 - Main Module (Entry Point)

import { trainingData } from './trainingData.js';
import {
    raceDate, userFTP, targetTime,
    calculatePower, generateDynamicContent, getPowerTargetForIntensity,
    getPowerZonesSummary
} from './powerZones.js';
import {
    loadSavedSettings, saveSettings,
    updateFTPDisplay, updateRaceDateDisplay, updatePacingDisplay,
    updateSegmentPacing, updateGoalDisplay,
    hasGarminCredentials, getGarminCredentials
} from './settings.js';
import { formatDate, formatDateShort } from './utils.js';
import { generateAllWorkouts, convertToGarminWorkout, getTrainingDate } from './workoutBuilder.js';
import { downloadJson, downloadErg, downloadZwo, copyJson } from './workoutExport.js';
import {
    importToGarmin, directImportToGarmin, logoutGarmin, batchImportToGarmin,
    currentPreviewMode, setPreviewMode
} from './garminConnect.js';

// Expose functions to window for onclick handlers
window.openWorkoutModal = openWorkoutModal;
window.closeModal = closeModal;
window.importToGarmin = importToGarmin;
window.directImportToGarmin = directImportToGarmin;
window.logoutGarmin = logoutGarmin;
window.batchImportToGarmin = batchImportToGarmin;
window.downloadJson = downloadJson;
window.downloadErg = downloadErg;
window.downloadZwo = downloadZwo;
window.copyJson = copyJson;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadSavedSettings();
    generateAllWorkouts();

    // Set up save settings button
    document.getElementById('saveSettingsBtn')?.addEventListener('click', saveSettings);

    // Allow Enter key to save settings
    document.getElementById('raceDateInput')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') saveSettings();
    });
    document.getElementById('ftpInput')?.addEventListener('keypress', (e) => {
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
    document.getElementById('workoutModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'workoutModal') {
            closeModal();
        }
    });

    // Listen for settings saved event
    window.addEventListener('settingsSaved', () => {
        populateSchedule();
        displayTodayTraining();
        updatePacingDisplay();
        updateCountdown();
    });

    // Listen for Garmin events
    window.addEventListener('garminLoginSuccess', (e) => {
        openWorkoutModal(e.detail.dayIndex, e.detail.previewMode);
    });

    window.addEventListener('garminLogout', () => {
        // Re-open current modal if open
        const modal = document.getElementById('workoutModal');
        if (modal?.classList.contains('show')) {
            const btn = modal.querySelector('.btn-garmin-direct-import, .btn-garmin-import');
            if (btn) {
                const onclick = btn.getAttribute('onclick');
                const match = onclick?.match(/(?:direct)?ImportToGarmin\((\d+)\)/);
                if (match) {
                    openWorkoutModal(parseInt(match[1]), currentPreviewMode);
                }
            }
        }
    });
});

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
        document.getElementById('countdown-hours').textContent = '00';
        document.getElementById('countdown-minutes').textContent = '00';
        document.getElementById('countdown-seconds').textContent = '00';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('countdown-days').textContent = days;
    document.getElementById('countdown-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('countdown-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('countdown-seconds').textContent = String(seconds).padStart(2, '0');
}

// Populate schedule table
function populateSchedule(filter = 'all') {
    const tbody = document.getElementById('scheduleBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    const filteredData = filter === 'all'
        ? trainingData
        : trainingData.filter(d => d.phase === filter);

    filteredData.forEach((day, index) => {
        const globalIndex = trainingData.indexOf(day);
        const trainingDate = getTrainingDate(globalIndex + 1);
        const isToday = trainingDate && isSameDay(trainingDate, new Date());
        const isPast = trainingDate && trainingDate < new Date() && !isToday;

        const row = document.createElement('tr');
        row.className = `${isToday ? 'today-row' : ''} ${isPast ? 'past-row' : ''}`;

        row.innerHTML = `
            <td>W${day.week}D${day.day}</td>
            <td>${trainingDate ? formatDateShort(trainingDate) : '-'}</td>
            <td><span class="phase-badge phase-${day.phase}">${day.phase}</span></td>
            <td><span class="intensity-badge intensity-${day.intensity}">${day.intensity}</span></td>
            <td class="content-cell">${day.content}</td>
            <td>${day.distance > 0 ? day.distance + 'km' : '-'}</td>
            <td>${day.elevation > 0 ? day.elevation + 'm' : '-'}</td>
            <td>${day.hours > 0 ? day.hours + 'h' : '-'}</td>
            <td>
                ${day.intensity !== '休息' ? `<button class="btn-view-workout" onclick="openWorkoutModal(${globalIndex})">查看</button>` : '-'}
            </td>
        `;

        tbody.appendChild(row);
    });
}

// Check if two dates are the same day
function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
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
    const container = document.getElementById('todayTraining');
    if (!container) return;

    if (!raceDate) {
        container.innerHTML = `
            <div class="today-training-left">
                <div class="today-training-header">
                    <span class="today-label">設定比賽日期</span>
                </div>
                <div class="today-training-content">
                    <div class="today-description">請先設定比賽日期以顯示訓練計劃</div>
                </div>
            </div>
        `;
        return;
    }

    const now = new Date();
    let foundDayIndex = -1;

    for (let i = 0; i < trainingData.length; i++) {
        const trainingDate = getTrainingDate(i + 1);
        if (trainingDate && isSameDay(trainingDate, now)) {
            foundDayIndex = i;
            break;
        }
    }

    if (foundDayIndex >= 0) {
        const day = trainingData[foundDayIndex];
        const trainingDate = getTrainingDate(foundDayIndex + 1);

        container.innerHTML = `
            <div class="today-training-left">
                <div class="today-training-header">
                    <span class="today-label">今日訓練</span>
                </div>
                <div class="today-training-content">
                    <div class="today-tags">
                        <span class="today-phase phase-${day.phase}">${day.phase}</span>
                        <span class="today-intensity intensity-${day.intensity}">${day.intensity}</span>
                    </div>
                    <div class="today-description">${day.content}</div>
                    <div class="today-stats">
                        ${day.distance > 0 ? `<span class="today-stat">🚴 ${day.distance}km</span>` : ''}
                        ${day.elevation > 0 ? `<span class="today-stat">⛰️ ${day.elevation}m</span>` : ''}
                        ${day.hours > 0 ? `<span class="today-stat">⏱️ ${day.hours}h</span>` : ''}
                    </div>
                </div>
            </div>
            <div class="today-actions">
                ${day.intensity !== '休息' ? `
                    <button class="btn-today-workout" onclick="openWorkoutModal(${foundDayIndex})">
                        查看訓練
                    </button>
                ` : ''}
            </div>
        `;
    } else {
        // Check if before or after training period
        const firstDate = getTrainingDate(1);
        const lastDate = getTrainingDate(112);

        if (firstDate && now < firstDate) {
            const daysUntil = Math.ceil((firstDate - now) / (1000 * 60 * 60 * 24));
            container.innerHTML = `
                <div class="today-training-left">
                    <div class="today-training-header">
                        <span class="today-label">訓練即將開始</span>
                    </div>
                    <div class="today-training-content">
                        <div class="today-description">訓練將於 ${daysUntil} 天後開始</div>
                    </div>
                </div>
            `;
        } else if (lastDate && now > lastDate) {
            container.innerHTML = `
                <div class="today-training-left">
                    <div class="today-training-header">
                        <span class="today-label">訓練已完成</span>
                    </div>
                    <div class="today-training-content">
                        <div class="today-description">恭喜完成 16 週訓練計劃！</div>
                    </div>
                </div>
            `;
        } else {
            // Show next training day
            let nextDayIndex = -1;
            for (let i = 0; i < trainingData.length; i++) {
                const trainingDate = getTrainingDate(i + 1);
                if (trainingDate && trainingDate > now) {
                    nextDayIndex = i;
                    break;
                }
            }

            if (nextDayIndex >= 0) {
                const day = trainingData[nextDayIndex];
                const trainingDate = getTrainingDate(nextDayIndex + 1);

                container.innerHTML = `
                    <div class="today-training-left">
                        <div class="today-training-header">
                            <span class="today-label">下次訓練 (${formatDate(trainingDate)})</span>
                        </div>
                        <div class="today-training-content">
                            <div class="today-tags">
                                <span class="today-phase phase-${day.phase}">${day.phase}</span>
                                <span class="today-intensity intensity-${day.intensity}">${day.intensity}</span>
                            </div>
                            <div class="today-description">${day.content}</div>
                            <div class="today-stats">
                                ${day.distance > 0 ? `<span class="today-stat">🚴 ${day.distance}km</span>` : ''}
                                ${day.elevation > 0 ? `<span class="today-stat">⛰️ ${day.elevation}m</span>` : ''}
                                ${day.hours > 0 ? `<span class="today-stat">⏱️ ${day.hours}h</span>` : ''}
                            </div>
                        </div>
                    </div>
                    <div class="today-actions">
                        ${day.intensity !== '休息' ? `
                            <button class="btn-today-workout" onclick="openWorkoutModal(${nextDayIndex})">
                                查看訓練
                            </button>
                        ` : ''}
                    </div>
                `;
            }
        }
    }
}

// Create weekly mileage chart
function createWeeklyChart() {
    const canvas = document.getElementById('weeklyMileageChart');
    if (!canvas || typeof Chart === 'undefined') return;

    const weeklyData = [];
    for (let week = 1; week <= 16; week++) {
        const weekDays = trainingData.filter(d => d.week === week);
        const totalDistance = weekDays.reduce((sum, d) => sum + d.distance, 0);
        const totalElevation = weekDays.reduce((sum, d) => sum + d.elevation, 0);
        const totalHours = weekDays.reduce((sum, d) => sum + d.hours, 0);
        weeklyData.push({ week, distance: totalDistance, elevation: totalElevation, hours: totalHours });
    }

    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: weeklyData.map(w => `W${w.week}`),
            datasets: [{
                label: '距離 (km)',
                data: weeklyData.map(w => w.distance),
                backgroundColor: 'rgba(245, 166, 35, 0.7)',
                borderColor: 'rgba(245, 166, 35, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '距離 (km)'
                    }
                }
            }
        }
    });
}

// Open workout modal
function openWorkoutModal(dayIndex, previewMode = false) {
    setPreviewMode(previewMode);
    const day = trainingData[dayIndex];
    const trainingDate = previewMode ? new Date() : getTrainingDate(dayIndex + 1);
    const modal = document.getElementById('workoutModal');
    const modalContent = document.getElementById('workoutModalContent');
    if (!modal || !modalContent) return;

    const workout = convertToGarminWorkout(day, dayIndex);
    const workoutJson = JSON.stringify(workout, null, 2);

    const dynamicContent = generateDynamicContent(day.content, day.intensity);
    const powerTarget = getPowerTargetForIntensity(day.intensity);
    const powerTargetHtml = powerTarget ?
        `<span class="power-target highlight">${powerTarget.min}-${powerTarget.max}W</span>` : '';

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
                    ${hasGarminCredentials() ? `
                        <div class="garmin-logged-in">
                            <div class="garmin-user-info">
                                <span class="garmin-user-icon">👤</span>
                                <span class="garmin-user-email">${getGarminCredentials().email}</span>
                            </div>
                            <div class="garmin-action-buttons">
                                <button class="btn-garmin-direct-import" onclick="directImportToGarmin(${dayIndex})">
                                    直接匯入訓練
                                </button>
                                <button class="btn-garmin-logout" onclick="logoutGarmin()">
                                    登出
                                </button>
                            </div>
                        </div>
                    ` : `
                        <div class="garmin-login-form">
                            <input type="email" class="garmin-input" id="garminEmail" placeholder="Garmin 帳號 (Email)">
                            <input type="password" class="garmin-input" id="garminPassword" placeholder="Garmin 密碼">
                            <button class="btn-garmin-import" onclick="importToGarmin(${dayIndex})">
                                登入並匯入訓練
                            </button>
                            <p class="garmin-hint">登入成功後，帳號資訊會儲存在瀏覽器中，下次可直接匯入</p>
                        </div>
                    `}
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

// Render workout steps preview
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

// Render single step item (handles both regular steps and repeat groups)
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
    const modal = document.getElementById('workoutModal');
    if (modal) {
        modal.classList.remove('show');
    }
}
