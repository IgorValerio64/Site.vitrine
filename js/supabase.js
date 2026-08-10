// Cliente do Supabase (autenticação + banco). A chave "publishable" é pública
// de propósito — o que protege os dados são as regras de RLS no banco.
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://gqiudpgbdunuwtyurxag.supabase.co';
const SUPABASE_KEY = 'sb_publishable_QNO3PexSTLwiAg9sJ6HM5g_HBXTbwd_';

export const supa = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});
