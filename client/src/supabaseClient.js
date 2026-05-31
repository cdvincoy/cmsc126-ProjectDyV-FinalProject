import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://clokrsyjnjvwhaukwjbi.supabase.co";
const supabaseAnonKey = "sb_publishable_v7LlFUfKl49KR0kdGWfTlw_VefW8Rd_";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);