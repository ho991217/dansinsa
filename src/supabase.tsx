import { createClient } from "@supabase/supabase-js";
import { Database } from "./types/database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseApi = import.meta.env.VITE_SUPABASE_API_KEY;

const supabase = createClient<Database>(supabaseUrl, supabaseApi);

supabase
  .channel("room1")
  .on(
    "postgres_changes",
    { event: "UPDATE", schema: "public", table: "user_img" },
    (payload) => {
      console.log("Change received!", payload);
    },
  )
  .subscribe();

export default supabase;
