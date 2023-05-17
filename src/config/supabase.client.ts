import { createClient } from "@supabase/supabase-js";
import { Database } from './../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
console.log(import.meta.env.VITE_SUPABASE_URL);
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;