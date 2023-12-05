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
import { useVtonOnState } from "../store/vton-store";
import getAllVtonImages from "../api/vton/getAllVtonImages";
import useAuth from "../hooks/useAuth";
import { Tables } from "../types/database.types";
import { VtonType } from "../types/user.types";

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [vtonImages, setVtonImages] = useState<VtonType[]>([]);
  const { getUserId } = useAuth();
  const { vtonOn } = useVtonOnState();

  const getVtonImages = async () => {
    const userId = await getUserId();
    const data = await getAllVtonImages(userId);
    if (!data) return;

    setVtonImages(data);
  };

  useEffect(() => {
    getAllClothes().then(setProducts);
  }, []);

  useEffect(() => {
    if (vtonOn) {
      getVtonImages();
    }
  }, [vtonOn]);

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
              <Card
                key={product.id}
                {...product}
                vtonImage={vtonImages.find(
                  (vton) => vton.product_id === product.id,
                )}
                isVtonOn={vtonOn}
              />
            ))}
          </Card.Container>
        </section>
      </DefaultLayout>
    </>
  );
}
