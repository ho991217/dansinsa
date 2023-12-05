import supabase from "../../supabase";
import { VtonType } from "../../types/user.types";

const getVtonImagesByProductId = async (userId: string, productId: number) => {
  try {
    const { data } = await supabase
      .from("user_result")
      .select("*")
      .eq("user_id", userId)
      .eq("product_id", productId);
    console.log(userId, productId);
    console.log(data);
    if (!data) throw new Error("No data");

    return data[0] as VtonType;
  } catch (error) {
    console.log(error);
  }
};

export default getVtonImagesByProductId;
