import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dyrobhraybcrjafnviqc.supabase.co';
const supabaseAnonKey = 'sb_publishable_yrYSAnjnXou4DDBW_pSpAQ_cqzPEsXW';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
