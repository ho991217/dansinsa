import supabase from "../../supabase";
import { VtonType } from "../../types/user.types";

const getAllVtonImages = async (userId: string) => {
  try {
    const { data } = await supabase
      .from("user_result")
      .select("*")
      .eq("user_id", userId);
    if (!data) throw new Error("No data");

    return data as VtonType[];
  } catch (error) {
    console.log(error);
  }
};

export default getAllVtonImages;
