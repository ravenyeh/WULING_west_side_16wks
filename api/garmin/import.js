const { GarminConnect } = require('@gooin/garmin-connect');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email, password, workouts } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: '請提供 Garmin 帳號和密碼'
            });
        }

        if (!workouts || !Array.isArray(workouts) || workouts.length === 0) {
            return res.status(400).json({
                success: false,
                error: '請提供要匯入的訓練'
            });
        }

        // Create and authenticate Garmin Connect instance
        const GC = new GarminConnect({
            username: email,
            password: password
        });

        try {
            await GC.login();
        } catch (loginError) {
            let errorMessage = '登入失敗';

            if (loginError.message?.includes('credentials')) {
                errorMessage = '帳號或密碼錯誤';
            } else if (loginError.message?.includes('captcha') || loginError.message?.includes('CAPTCHA')) {
                errorMessage = 'Garmin 要求驗證碼，請先在瀏覽器登入 Garmin Connect 網站後再試';
            } else if (loginError.message?.includes('blocked') || loginError.message?.includes('429')) {
                errorMessage = '請求過於頻繁，請稍後再試';
            }

            return res.status(401).json({
                success: false,
                error: errorMessage
            });
        }

        // Process workouts
        const results = [];
        let successCount = 0;
        let failCount = 0;
        let scheduledCount = 0;

        for (const workoutData of workouts) {
            const { workout, scheduledDate, dayIndex } = workoutData;

            try {
                let createdWorkout;

                // Try primary method
                try {
                    createdWorkout = await GC.addWorkout(workout);
                } catch (primaryError) {
                    // Fallback method
                    try {
                        const response = await GC.client.post(
                            'https://connect.garmin.com/workout-service/workout',
                            workout
                        );
                        createdWorkout = response.data || response;
                    } catch (fallbackError) {
                        throw primaryError;
                    }
                }

                // Extract workoutId from various possible response formats
                const workoutId = createdWorkout?.workoutId
                    || createdWorkout?.id
                    || createdWorkout?.data?.workoutId
                    || createdWorkout?.data?.id;

                console.log('Created workout response:', JSON.stringify(createdWorkout, null, 2));
                console.log('Extracted workoutId:', workoutId);

                let scheduled = false;
                let scheduleError = null;

                // Schedule if date provided
                if (scheduledDate && workoutId) {
                    try {
                        // Format date as YYYY-MM-DD
                        const dateStr = typeof scheduledDate === 'string'
                            ? scheduledDate
                            : scheduledDate.toISOString().split('T')[0];

                        await GC.scheduleWorkout({ workoutId: workoutId }, dateStr);
                        scheduled = true;
                        scheduledCount++;
                    } catch (err) {
                        console.error(`Schedule error for workout ${dayIndex}:`, err);
                        scheduleError = err.message;
                    }
                }

                successCount++;
                results.push({
                    dayIndex,
                    success: true,
                    workoutId,
                    scheduled,
                    scheduleError: scheduleError,
                    scheduledDate: scheduledDate || null,
                    workoutName: workout.workoutName
                });

            } catch (workoutError) {
                failCount++;
                results.push({
                    dayIndex,
                    success: false,
                    error: workoutError.message,
                    workoutName: workout?.workoutName
                });
            }

            // Add small delay between requests to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        return res.status(200).json({
            success: true,
            message: `匯入完成：${successCount} 成功，${failCount} 失敗，${scheduledCount} 已排程`,
            summary: {
                total: workouts.length,
                success: successCount,
                failed: failCount,
                scheduled: scheduledCount
            },
            results
        });

    } catch (error) {
        console.error('Import error:', error);
        return res.status(500).json({
            success: false,
            error: error.message || '匯入失敗'
        });
    }
};
