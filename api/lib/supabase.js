// Supabase Client for Server-side (Vercel Serverless Functions)

const { createClient } = require('@supabase/supabase-js');

// Use environment variables for server-side, with fallback to hardcoded values
// In production, set these in Vercel Environment Variables
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://yxdpafgasbihbphplsim.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4ZHBhZmdhc2JpaGJwaHBsc2ltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NDk4MzcsImV4cCI6MjA4MDQyNTgzN30.Rq1Ebd646zkrpq8hghGvWnOvc1dcAjfspM-EJD7Djg4';

// For admin operations, use the service role key (keep secret!)
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

// Create Supabase client with anon key (respects RLS)
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Create admin client (bypasses RLS) - only if service key is available
const supabaseAdmin = SUPABASE_SERVICE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    : null;

module.exports = {
    supabase,
    supabaseAdmin,
    SUPABASE_URL,
    SUPABASE_ANON_KEY
};
