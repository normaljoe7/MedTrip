
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dgfuuafmutvjxcgayhpg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnZnV1YWZtdXR2anhjZ2F5aHBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NjI5NTYsImV4cCI6MjA1NjIzODk1Nn0.qWl2TWbAz3K_tsU-EIUy6atNawZXE330OAI3sGfjiPc";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
