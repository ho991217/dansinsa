import { Tables } from "./database.types";

export interface ProductType extends Tables<"product"> {
  product_img: Tables<"product_img">;
  brand: Tables<"brand">;
}
