// Supabase Client Module for Browser
// Uses ES module import from CDN for static site compatibility

import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabaseConfig.js';

// Lazy-loaded Supabase client
let supabaseClient = null;
let initPromise = null;

/**
 * Initialize Supabase client (lazy loading)
 * @returns {Promise<Object>} Supabase client
 */
async function initSupabase() {
    if (supabaseClient) {
        return supabaseClient;
    }

    if (initPromise) {
        return initPromise;
    }

    initPromise = (async () => {
        try {
            // Use specific version for stability
            const module = await import('https://esm.sh/@supabase/supabase-js@2.47.10');
            const { createClient } = module;

            supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
                auth: {
                    persistSession: false,
                    autoRefreshToken: false,
                    detectSessionInUrl: false
                }
            });

            console.log('Supabase client initialized successfully');
            return supabaseClient;
        } catch (err) {
            console.error('Failed to initialize Supabase:', err);
            initPromise = null;
            throw err;
        }
    })();

    return initPromise;
}

/**
 * Get the Supabase client (initializes if needed)
 * @returns {Promise<Object>} Supabase client
 */
export async function getSupabase() {
    return initSupabase();
}

// Helper function to check connection
export async function checkConnection() {
    try {
        const supabase = await getSupabase();
        const { data, error } = await supabase.from('_health_check').select('*').limit(1);
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
