// Workout Import History Module
// Tracks workout imports to Garmin Connect using Firebase

import { writeToFirebase, readFromFirebase } from './firebase.js';
import { trainingData } from './trainingData.js';

// LocalStorage key for Garmin user profile
const GARMIN_USER_KEY = 'wulingGarminUser';

/**
 * Save Garmin user profile to localStorage
 * @param {Object} user - User object with displayName, fullName, email
 */
export function saveGarminUser(user) {
    if (user) {
        localStorage.setItem(GARMIN_USER_KEY, JSON.stringify(user));
    }
}

/**
 * Get saved Garmin user profile
 * @returns {Object|null} User object or null
 */
export function getGarminUser() {
    try {
        const saved = localStorage.getItem(GARMIN_USER_KEY);
        return saved ? JSON.parse(saved) : null;
    } catch (e) {
        console.error('Error reading Garmin user:', e);
        return null;
    }
}

/**
 * Clear Garmin user profile
 */
export function clearGarminUser() {
    localStorage.removeItem(GARMIN_USER_KEY);
}

/**
 * Record a workout import to Firebase
 * @param {Object} params - Import parameters
 * @param {number} params.dayIndex - Day index in training plan (0-indexed)
 * @param {string} params.scheduledDate - Scheduled date (YYYY-MM-DD)
 * @param {Object} params.user - Garmin user info
 * @param {number} params.userFTP - User's FTP
 * @param {number} params.targetTime - Target time in minutes
 * @param {Date} params.raceDate - Race date
 */
export async function recordWorkoutImport({
    dayIndex,
    scheduledDate,
    user,
    userFTP,
    targetTime,
    raceDate
}) {
    console.log('recordWorkoutImport called:', { dayIndex, user: user?.displayName });

    if (!user || !user.displayName) {
        console.warn('Cannot record import: no Garmin user info');
        return { success: false, error: 'No user info' };
    }

    const workout = trainingData[dayIndex];
    if (!workout) {
        console.warn('Cannot record import: invalid day index', dayIndex);
        return { success: false, error: 'Invalid day index' };
    }

    const record = {
        // User info
        garmin_display_name: user.displayName,
        garmin_full_name: user.fullName || null,
        garmin_email: user.email || null,

        // Workout info
        day_index: dayIndex,
        week: workout.week,
        day: workout.day,
        phase: workout.phase,
        intensity: workout.intensity,
        workout_content: workout.content,

        // Schedule info
        scheduled_date: scheduledDate || null,

        // User settings
        user_ftp: userFTP || null,
        target_time: targetTime || null,
        race_date: raceDate ? raceDate.toISOString().split('T')[0] : null
    };

    const result = await writeToFirebase('wuling_workout_imports', record);

    if (result.success) {
        console.log('Workout import recorded successfully');
    }

    return result;
}

/**
 * Get import history for current user
 * @param {string} email - User's email (optional, for filtering)
 * @returns {Promise<Array>} Import history records
 */
export async function getImportHistory(email = null) {
    const result = await readFromFirebase('wuling_workout_imports');

    if (!result.success || !result.data) {
        return [];
    }

    // Convert Firebase object to array
    const records = Object.entries(result.data).map(([key, value]) => ({
        id: key,
        ...value
    }));

    // Filter by email if provided
    if (email) {
        return records.filter(r => r.garmin_email === email);
    }

    // Sort by timestamp descending
    return records.sort((a, b) =>
        new Date(b.timestamp) - new Date(a.timestamp)
    );
}

/**
 * Check if a workout has been imported by current user
 * @param {number} dayIndex - Day index to check
 * @param {string} email - User's email
 * @returns {Promise<boolean>} True if already imported
 */
export async function hasWorkoutBeenImported(dayIndex, email) {
    if (!email) return false;

    const history = await getImportHistory(email);
    return history.some(r => r.day_index === dayIndex);
}

/**
 * Get import statistics for a user
 * @param {string} email - User's email
 * @returns {Promise<Object>} Statistics object
 */
export async function getImportStats(email) {
    if (!email) {
        return { totalImports: 0, uniqueWorkouts: 0 };
    }

    const history = await getImportHistory(email);
    const uniqueDays = new Set(history.map(r => r.day_index));

    return {
        totalImports: history.length,
        uniqueWorkouts: uniqueDays.size
    };
}

// ============================================
// Daily Stats Functions
// ============================================

/**
 * Record daily stats to Firebase
 * @param {Object} params - Stats parameters
 * @param {Object} params.user - User info (displayName, email)
 * @param {string} params.date - Date string (YYYY-MM-DD)
 * @param {Object} params.stats - Stats data (flexible structure)
 */
export async function recordDailyStat({ user, date, stats }) {
    if (!user || !user.displayName) {
        console.warn('Cannot record daily stat: no user info');
        return { success: false, error: 'No user info' };
    }

    const record = {
        garmin_display_name: user.displayName,
        garmin_email: user.email || null,
        date: date || new Date().toISOString().split('T')[0],
        ...stats
    };

    const result = await writeToFirebase('wuling_daily_stats', record);

    if (result.success) {
        console.log('Daily stat recorded successfully');
    }

    return result;
}

/**
 * Get daily stats from Firebase
 * @param {string} email - User's email (optional, for filtering)
 * @param {string} startDate - Start date filter (YYYY-MM-DD)
 * @param {string} endDate - End date filter (YYYY-MM-DD)
 * @returns {Promise<Array>} Daily stats records
 */
export async function getDailyStats(email = null, startDate = null, endDate = null) {
    const result = await readFromFirebase('wuling_daily_stats');

    if (!result.success || !result.data) {
        return [];
    }

    // Convert Firebase object to array
    let records = Object.entries(result.data).map(([key, value]) => ({
        id: key,
        ...value
    }));

    // Filter by email if provided
    if (email) {
        records = records.filter(r => r.garmin_email === email);
    }

    // Filter by date range if provided
    if (startDate) {
        records = records.filter(r => r.date >= startDate);
    }
    if (endDate) {
        records = records.filter(r => r.date <= endDate);
    }

    // Sort by date descending
    return records.sort((a, b) => new Date(b.date) - new Date(a.date));
}
