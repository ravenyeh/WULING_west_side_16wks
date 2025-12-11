// Firebase Realtime Database Module
// For recording workout import history

const FIREBASE_DB_URL = 'https://ironmantrainingtw-default-rtdb.asia-southeast1.firebasedatabase.app';

/**
 * Write data to Firebase Realtime Database
 * @param {string} path - Database path (e.g., 'workout_imports')
 * @param {Object} data - Data to write
 * @returns {Promise<Object>} Result with success status
 */
export async function writeToFirebase(path, data) {
    try {
        const url = `${FIREBASE_DB_URL}/${path}.json`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...data,
                timestamp: new Date().toISOString()
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Firebase error: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        console.log('Firebase write success:', result);
        return { success: true, key: result.name };
    } catch (err) {
        console.error('Firebase write failed:', err);
        return { success: false, error: err.message };
    }
}

/**
 * Read data from Firebase Realtime Database
 * @param {string} path - Database path
 * @returns {Promise<Object>} Data or null
 */
export async function readFromFirebase(path) {
    try {
        const url = `${FIREBASE_DB_URL}/${path}.json`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Firebase error: ${response.status}`);
        }

        const data = await response.json();
        return { success: true, data };
    } catch (err) {
        console.error('Firebase read failed:', err);
        return { success: false, error: err.message };
    }
}

export { FIREBASE_DB_URL };
