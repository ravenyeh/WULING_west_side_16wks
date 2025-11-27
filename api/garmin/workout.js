const { sessions } = require('./login');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Session-Id');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const sessionId = req.headers['x-session-id'];

        if (!sessionId || !sessions.has(sessionId)) {
            return res.status(401).json({
                success: false,
                error: '請先登入 Garmin Connect'
            });
        }

        const session = sessions.get(sessionId);
        const GC = session.gc;
        const { workout, scheduledDate } = req.body;

        if (!workout) {
            return res.status(400).json({
                success: false,
                error: '請提供訓練內容'
            });
        }

        let createdWorkout;

        // Try to create workout
        try {
            createdWorkout = await GC.addWorkout(workout);
        } catch (addError) {
            console.error('Primary addWorkout failed, trying fallback:', addError);

            // Fallback: try direct API call
            try {
                const response = await GC.client.post(
                    'https://connect.garmin.com/workout-service/workout',
                    workout
                );
                createdWorkout = response.data || response;
            } catch (fallbackError) {
                throw new Error(`無法建立訓練：${fallbackError.message}`);
            }
        }

        const workoutId = createdWorkout?.workoutId || createdWorkout?.id;

        // Schedule workout if date provided
        if (scheduledDate && workoutId) {
            try {
                await GC.scheduleWorkout({ workoutId }, scheduledDate);
            } catch (scheduleError) {
                console.error('Schedule error:', scheduleError);
                return res.status(200).json({
                    success: true,
                    message: '訓練已建立但排程失敗',
                    workout: createdWorkout,
                    workoutId: workoutId,
                    scheduled: false,
                    scheduleError: scheduleError.message
                });
            }
        }

        return res.status(200).json({
            success: true,
            message: scheduledDate ? '訓練已建立並排程成功' : '訓練已建立',
            workout: createdWorkout,
            workoutId: workoutId,
            scheduled: !!scheduledDate,
            scheduledDate: scheduledDate || null
        });

    } catch (error) {
        console.error('Workout creation error:', error);
        return res.status(500).json({
            success: false,
            error: error.message || '建立訓練失敗'
        });
    }
};
