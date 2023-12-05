import { useEffect, useState } from "react";
import {
  Banner,
  Filter,
  SearchBar,
  Card,
  VtonButton,
} from "../components/main";
import DefaultLayout from "../layouts/default-layout";
import getAllClothes from "../api/clothes/getAllClothes";
import { ProductType } from "../types/product.types";

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    getAllClothes().then(setProducts);
  }, []);

  return (
    <>
      <DefaultLayout title="DANSINSA" className="mb-0">
        <Banner />
        <SearchBar />
        <section className="flex w-screen max-w-lg flex-col items-center gap-6 rounded-t-2xl bg-gray-100 p-6 pb-[100px]">
          <VtonButton />
          <Filter />
          <Card.Container>
            {products.map((product) => (
              <Card key={product.id} {...product} />
            ))}
          </Card.Container>
        </section>
      </DefaultLayout>
    </>
  );
}
