// Supabase Client Module for Browser
// Uses ES module import from CDN for static site compatibility

import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabaseConfig.js';

// Import Supabase from CDN
const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');

// Create and export the Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper function to check connection
export async function checkConnection() {
    try {
        const { data, error } = await supabase.from('_health_check').select('*').limit(1);
        // Note: This will fail with 404 if table doesn't exist, but confirms API is reachable
        if (error && error.code !== 'PGRST116') {
            console.error('Supabase connection error:', error);
            return { connected: false, error };
        }
        return { connected: true };
    } catch (err) {
        console.error('Supabase connection failed:', err);
        return { connected: false, error: err };
    }
}

// Export config for reference
export { SUPABASE_URL, SUPABASE_ANON_KEY };
