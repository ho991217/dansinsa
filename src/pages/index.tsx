import { useEffect, useState } from "react";
import {
  Banner,
  Filter,
  SearchBar,
  Card,
  VtonButton,
} from "../components/main";
import DefaultLayout from "../layouts/default-layout";
import supabase from "../supabase";
import { Tables } from "../types/supabase.types";

export default function Home() {
  const [products, setProducts] = useState<Tables<"product">[]>([]);
  const getClothes = async () => {
    try {
      const { data, error } = await supabase.from("product").select("*");
      setProducts(data ?? []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClothes();
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
