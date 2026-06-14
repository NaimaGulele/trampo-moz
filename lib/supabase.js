import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rvhblgwvrmilqyzjbkla.supabase.co';
const supabaseAnonKey = 'sb_publishable_HLfNpiWYSqiNPCN9DTy0lw_49rhUSb-';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
