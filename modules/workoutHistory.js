// Workout Import History Module
// Tracks workout imports to Garmin Connect using Supabase

import { supabase } from './supabase.js';
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
 * Record a workout import to Supabase
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
    if (!user || !user.displayName) {
        console.warn('Cannot record import: no Garmin user info');
        return { success: false, error: 'No user info' };
    }

    const workout = trainingData[dayIndex];
    if (!workout) {
        console.warn('Cannot record import: invalid day index');
        return { success: false, error: 'Invalid day index' };
    }

    try {
        const { data, error } = await supabase
            .from('workout_import_history')
            .insert({
                garmin_display_name: user.displayName,
                garmin_full_name: user.fullName || null,
                garmin_email: user.email || null,
                day_index: dayIndex,
                week: workout.week,
                day: workout.day,
                phase: workout.phase,
                intensity: workout.intensity,
                workout_content: workout.content,
                scheduled_date: scheduledDate || null,
                user_ftp: userFTP || null,
                target_time: targetTime || null,
                race_date: raceDate ? raceDate.toISOString().split('T')[0] : null
            });

        if (error) {
            console.error('Error recording import:', error);
            return { success: false, error: error.message };
        }

        console.log('Workout import recorded:', data);
        return { success: true, data };
    } catch (err) {
        console.error('Failed to record import:', err);
        return { success: false, error: err.message };
    }
}

/**
 * Get import history for current user
 * @param {string} email - User's email (optional, for filtering)
 * @returns {Promise<Array>} Import history records
 */
export async function getImportHistory(email = null) {
    try {
        let query = supabase
            .from('workout_import_history')
            .select('*')
            .order('imported_at', { ascending: false });

        if (email) {
            query = query.eq('garmin_email', email);
        }

        const { data, error } = await query.limit(100);

        if (error) {
            console.error('Error fetching import history:', error);
            return [];
        }

        return data || [];
    } catch (err) {
        console.error('Failed to fetch import history:', err);
        return [];
    }
}

/**
 * Check if a workout has been imported by current user
 * @param {number} dayIndex - Day index to check
 * @param {string} email - User's email
 * @returns {Promise<boolean>} True if already imported
 */
export async function hasWorkoutBeenImported(dayIndex, email) {
    if (!email) return false;

    try {
        const { data, error } = await supabase
            .from('workout_import_history')
            .select('id')
            .eq('day_index', dayIndex)
            .eq('garmin_email', email)
            .limit(1);

        if (error) {
            console.error('Error checking import status:', error);
            return false;
        }

        return data && data.length > 0;
    } catch (err) {
        console.error('Failed to check import status:', err);
        return false;
    }
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

    try {
        const { data, error } = await supabase
            .from('workout_import_history')
            .select('day_index')
            .eq('garmin_email', email);

        if (error) {
            console.error('Error fetching stats:', error);
            return { totalImports: 0, uniqueWorkouts: 0 };
        }

        const uniqueDays = new Set(data.map(d => d.day_index));
        return {
            totalImports: data.length,
            uniqueWorkouts: uniqueDays.size
        };
    } catch (err) {
        console.error('Failed to fetch stats:', err);
        return { totalImports: 0, uniqueWorkouts: 0 };
    }
}
