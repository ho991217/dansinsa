import supabase from "../../supabase";
import { ProductType } from "../../types/product.types";

const getAllClothes = async () => {
  try {
    const { data } = await supabase.from("product").select(`
    *,
    product_img (
      image_url
    ),
    brand (
      name
    )
    `);

    return data as ProductType[];
  } catch (error) {
    console.log(error);
    return [] as ProductType[];
  }
};

export default getAllClothes;
