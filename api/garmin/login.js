const { GarminConnect } = require('@gooin/garmin-connect');

// In-memory session storage (for demo - production should use Redis/DB)
const sessions = new Map();

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
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: '請提供 Garmin 帳號和密碼'
            });
        }

        // Create new Garmin Connect instance with credentials
        const GC = new GarminConnect({
            username: email,
            password: password
        });

        // Attempt login
        await GC.login();

        // Get user profile
        const userProfile = await GC.getUserProfile();

        // Generate session ID
        const sessionId = `gc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Store session
        sessions.set(sessionId, {
            gc: GC,
            email: email,
            createdAt: Date.now()
        });

        // Clean up old sessions (older than 30 minutes)
        const thirtyMinutes = 30 * 60 * 1000;
        for (const [id, session] of sessions.entries()) {
            if (Date.now() - session.createdAt > thirtyMinutes) {
                sessions.delete(id);
            }
        }

        return res.status(200).json({
            success: true,
            sessionId: sessionId,
            user: {
                displayName: userProfile.displayName || email.split('@')[0],
                email: email
            }
        });

    } catch (error) {
        console.error('Login error:', error);

        let errorMessage = '登入失敗，請檢查帳號密碼';

        if (error.message?.includes('credentials')) {
            errorMessage = '帳號或密碼錯誤';
        } else if (error.message?.includes('network') || error.message?.includes('ENOTFOUND')) {
            errorMessage = '網路連線失敗，請稍後再試';
        } else if (error.message?.includes('captcha') || error.message?.includes('CAPTCHA')) {
            errorMessage = 'Garmin 要求驗證碼，請先在瀏覽器登入 Garmin Connect 網站後再試';
        } else if (error.message?.includes('blocked') || error.message?.includes('429')) {
            errorMessage = '請求過於頻繁，請稍後再試';
        }

        return res.status(401).json({
            success: false,
            error: errorMessage
        });
    }
};

// Export sessions for use in other modules
module.exports.sessions = sessions;
