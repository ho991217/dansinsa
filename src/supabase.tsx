import { createClient } from "@supabase/supabase-js";
import { Database } from "./types/database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseApi = import.meta.env.VITE_SUPABASE_API_KEY;

const supabase = createClient<Database>(supabaseUrl, supabaseApi);



export default supabase;
