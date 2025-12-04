// 西進武嶺 SUB4 16週訓練計劃 - Garmin Connect Module

import { trainingData } from './trainingData.js';
import {
    getGarminCredentials,
    saveGarminCredentials,
    hasGarminCredentials,
    clearGarminCredentials
} from './settings.js';
import { getLocalDateString } from './utils.js';
import { convertToGarminWorkout, getTrainingDate } from './workoutBuilder.js';
import { saveGarminUser, getGarminUser, clearGarminUser, recordWorkoutImport } from './workoutHistory.js';
import { raceDate, userFTP, targetTime } from './powerZones.js';

// Track current preview mode for import date handling
export let currentPreviewMode = false;

export function setPreviewMode(mode) {
    currentPreviewMode = mode;
}

// Update Garmin status display
export function updateGarminStatus(message, isError = false) {
    const statusDiv = document.getElementById('garminStatus');
    if (!statusDiv) return;

    statusDiv.textContent = message;
    statusDiv.className = `garmin-status ${isError ? 'error' : 'success'}`;
    statusDiv.style.display = 'block';
}

// Import to Garmin Connect (with login)
export async function importToGarmin(dayIndex) {
    const email = document.getElementById('garminEmail')?.value;
    const password = document.getElementById('garminPassword')?.value;
    const statusDiv = document.getElementById('garminStatus');

    if (!email || !password) {
        updateGarminStatus('請輸入 Garmin 帳號和密碼', true);
        return;
    }

    await doGarminImport(dayIndex, email, password, true);
}

// Direct import to Garmin Connect (using saved credentials)
export async function directImportToGarmin(dayIndex) {
    const creds = getGarminCredentials();
    if (!creds || !creds.email || !creds.password) {
        updateGarminStatus('請先登入 Garmin 帳號', true);
        return;
    }

    await doGarminImport(dayIndex, creds.email, creds.password, false);
}

// Core Garmin import function
export async function doGarminImport(dayIndex, email, password, isNewLogin) {
    const statusDiv = document.getElementById('garminStatus');
    const day = trainingData[dayIndex];
    const workout = convertToGarminWorkout(day, dayIndex);
    const trainingDate = currentPreviewMode ? new Date() : getTrainingDate(dayIndex + 1);

    if (statusDiv) {
        statusDiv.textContent = '正在匯入...';
        statusDiv.className = 'garmin-status';
        statusDiv.style.display = 'block';
        statusDiv.style.background = 'rgba(245, 166, 35, 0.9)';
    }

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
                    scheduledDate: trainingDate ? getLocalDateString(trainingDate) : null,
                    dayIndex
                }]
            })
        });

        const result = await response.json();

        if (result.success) {
            if (isNewLogin) {
                saveGarminCredentials(email, password);
            }

            // Save user profile and record import history
            if (result.user) {
                saveGarminUser(result.user);
                // Record to Supabase with visible status feedback
                updateGarminStatus(`✓ ${result.message} | 記錄中...`, false);

                recordWorkoutImport({
                    dayIndex,
                    scheduledDate: trainingDate ? getLocalDateString(trainingDate) : null,
                    user: result.user,
                    userFTP,
                    targetTime,
                    raceDate
                }).then(res => {
                    console.log('Supabase record result:', res);
                    if (res.success) {
                        updateGarminStatus(`✓ ${result.message} | DB: 已記錄 ✓`, false);
                    } else {
                        updateGarminStatus(`✓ ${result.message} | DB失敗: ${res.error || 'Unknown'}`, true);
                    }
                }).catch(err => {
                    console.warn('Failed to record import:', err);
                    updateGarminStatus(`✓ ${result.message} | DB錯誤: ${err.message}`, true);
                });
            } else {
                updateGarminStatus(`✓ ${result.message} | 無user資料`, true);
            }

            // Don't call updateGarminStatus again here - it's handled above

            // Dispatch event to refresh modal
            if (isNewLogin) {
                setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('garminLoginSuccess', {
                        detail: { dayIndex, previewMode: currentPreviewMode }
                    }));
                }, 1500);
            }
        } else {
            if (result.error && (
                result.error.includes('認證') ||
                result.error.includes('密碼') ||
                result.error.includes('帳號') ||
                result.error.includes('authentication') ||
                result.error.includes('credentials')
            )) {
                clearGarminCredentials();
            }
            updateGarminStatus(`✗ ${result.error}`, true);
        }
    } catch (error) {
        updateGarminStatus(`✗ 匯入失敗：${error.message}`, true);
    }
}

// Logout from Garmin (clear saved credentials and user profile)
export function logoutGarmin() {
    clearGarminCredentials();
    clearGarminUser();
    window.dispatchEvent(new CustomEvent('garminLogout'));
}

// Batch import all workouts
export async function batchImportToGarmin() {
    let email, password;
    let isNewLogin = false;

    const savedCreds = getGarminCredentials();
    if (savedCreds && savedCreds.email && savedCreds.password) {
        const useSaved = confirm(`使用已儲存的帳號 ${savedCreds.email} 進行匯入？\n\n點擊「確定」使用已儲存帳號\n點擊「取消」輸入新帳號`);
        if (useSaved) {
            email = savedCreds.email;
            password = savedCreds.password;
        }
    }

    if (!email || !password) {
        email = prompt('請輸入 Garmin 帳號 (Email)：');
        if (!email) return;

        password = prompt('請輸入 Garmin 密碼：');
        if (!password) return;

        isNewLogin = true;
    }

    const workoutsToImport = trainingData
        .filter(day => day.intensity !== '休息')
        .map((day, index) => {
            const globalIndex = trainingData.indexOf(day);
            const trainingDate = getTrainingDate(globalIndex + 1);
            return {
                workout: convertToGarminWorkout(day, globalIndex),
                scheduledDate: trainingDate ? getLocalDateString(trainingDate) : null,
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
            if (isNewLogin) {
                saveGarminCredentials(email, password);
            }

            // Save user profile and record import history for each workout
            if (result.user) {
                saveGarminUser(result.user);
                // Record each successful import to Supabase
                for (const workoutResult of (result.results || [])) {
                    if (workoutResult.success) {
                        const workoutData = workoutsToImport.find(w => w.dayIndex === workoutResult.dayIndex) ||
                            workoutsToImport[result.results.indexOf(workoutResult)];
                        if (workoutData) {
                            recordWorkoutImport({
                                dayIndex: workoutData.dayIndex,
                                scheduledDate: workoutData.scheduledDate,
                                user: result.user,
                                userFTP,
                                targetTime,
                                raceDate
                            }).catch(err => console.warn('Failed to record import:', err));
                        }
                    }
                }
            }

            alert(`匯入完成！\n${result.message}`);
        } else {
            if (result.error && (
                result.error.includes('認證') ||
                result.error.includes('密碼') ||
                result.error.includes('帳號') ||
                result.error.includes('authentication') ||
                result.error.includes('credentials')
            )) {
                clearGarminCredentials();
            }
            alert(`匯入失敗：${result.error}`);
        }
    } catch (error) {
        alert(`匯入失敗：${error.message}`);
    }
}
