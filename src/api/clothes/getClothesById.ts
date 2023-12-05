import supabase from "../../supabase";
import { ProductType } from "../../types/product.types";

const getClothesById = async (id: number) => {
  try {
    const { data } = await supabase
      .from("product")
      .select(
        `
      *, 
      product_img (*),
      brand (*)`,
      )
      .eq("id", id ?? 0);
    if (!data) throw new Error("No data");

    return data[0] as ProductType;
  } catch (error) {
    console.log(error);
    return {} as ProductType;
  }
};

export default getClothesById;
