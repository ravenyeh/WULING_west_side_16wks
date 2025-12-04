-- Supabase Schema for WULING West Side 16 Weeks Training Plan
-- Run this SQL in Supabase SQL Editor to create the required tables

-- Table: workout_import_history
-- Tracks when users import workouts to Garmin Connect
CREATE TABLE IF NOT EXISTS workout_import_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

    -- Garmin user identification
    garmin_display_name TEXT NOT NULL,
    garmin_full_name TEXT,
    garmin_email TEXT,

    -- Workout information
    day_index INTEGER NOT NULL,           -- 0-indexed day in training plan
    week INTEGER NOT NULL,                 -- Week number (1-16)
    day INTEGER NOT NULL,                  -- Day of week (1-7)
    phase TEXT NOT NULL,                   -- Training phase (基礎期, 建構期, etc.)
    intensity TEXT NOT NULL,               -- Intensity level
    workout_content TEXT NOT NULL,         -- Workout description

    -- Import details
    scheduled_date DATE,                   -- Scheduled date for the workout
    imported_at TIMESTAMPTZ DEFAULT NOW(), -- When the import happened

    -- Additional metadata
    user_ftp INTEGER,                      -- User's FTP at time of import
    target_time INTEGER,                   -- Target time in minutes
    race_date DATE,                        -- User's race date

    -- Constraints
    CONSTRAINT valid_week CHECK (week >= 1 AND week <= 16),
    CONSTRAINT valid_day CHECK (day >= 1 AND day <= 7)
);

-- Index for faster queries by user
CREATE INDEX IF NOT EXISTS idx_workout_import_garmin_user
ON workout_import_history (garmin_display_name, garmin_email);

-- Index for faster queries by date
CREATE INDEX IF NOT EXISTS idx_workout_import_date
ON workout_import_history (imported_at DESC);

-- Index for workout lookup
CREATE INDEX IF NOT EXISTS idx_workout_import_day
ON workout_import_history (day_index);

-- Enable Row Level Security (RLS)
ALTER TABLE workout_import_history ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert (for anonymous tracking)
CREATE POLICY "Allow anonymous insert" ON workout_import_history
    FOR INSERT
    WITH CHECK (true);

-- Policy: Allow users to read their own history (by email match)
CREATE POLICY "Allow read own history" ON workout_import_history
    FOR SELECT
    USING (true);

-- Optional: Create a view for import statistics
CREATE OR REPLACE VIEW workout_import_stats AS
SELECT
    garmin_display_name,
    garmin_email,
    COUNT(*) as total_imports,
    COUNT(DISTINCT day_index) as unique_workouts,
    MIN(imported_at) as first_import,
    MAX(imported_at) as last_import
FROM workout_import_history
GROUP BY garmin_display_name, garmin_email;
