import { useParams } from "react-router-dom";
import supabase from "../../supabase";
import { useEffect, useState } from "react";
import { Tables } from "../../types/supabase.types";
import DefaultLayout from "../../layouts/default-layout";
import { Button } from "../../components/common";
import useAuth from "../../hooks/useAuth";
import clsx from "clsx";

interface Product extends Tables<"product"> {
  brand: {
    name: string;
  } | null;
}

enum Size {
  S,
  M,
  L,
  XL,
}

type SizeType = {
  shoulder: number;
  sleeve: number;
};

const sizes: Array<Partial<SizeType> & { size?: Size }> = [
  {
    size: Size.S,
    shoulder: 57,
    sleeve: 61,
  },
  {
    size: Size.M,
    shoulder: 58.5,
    sleeve: 62.5,
  },
  {
    size: Size.L,
    shoulder: 60,
    sleeve: 64,
  },
  {
    size: Size.XL,
    shoulder: 61.5,
    sleeve: 66.5,
  },
];

export default function ClothesDetail() {
  const [product, setProduct] = useState<Product | null>(null);
  const [recommendSize, setRecommendSize] = useState<Size>(Size.S); // [S, M, L, XL]
  const { getUserId } = useAuth();
  const { id } = useParams<{ id: string }>();

  const getClothesInfo = async () => {
    const { data: product, error } = await supabase
      .from("product")
      .select(
        `*,
        brand (
          name
        )`,
      )
      .eq("id", id ?? 0);

    if (error) {
      console.error(error);
      return;
    }
    setProduct(product?.[0] ?? null);
  };

  const getUserSize = async () => {
    const userId = await getUserId();
    const { data: userSize, error } = await supabase
      .from("user_size")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error(error);
      return;
    }
    return userSize?.[0] ?? null;
  };

  const getRecommendSize = (userSize?: Tables<"user_size">) => {
    if (!userSize) return;
    const { l_sleeve: user_sleeve, width: user_width } = userSize;
    if (!user_sleeve || !user_width) return;

    if (user_sleeve < 60) {
      setRecommendSize(Size.S);
      return;
    }
    if (user_sleeve < 62) {
      setRecommendSize(Size.M);
      return;
    }
    if (user_sleeve < 64) {
      setRecommendSize(Size.L);
      return;
    }
    if (user_sleeve < 66) {
      setRecommendSize(Size.XL);
      return;
    }
  };

  useEffect(() => {
    getClothesInfo();
    getUserSize().then(getRecommendSize);
  }, []);

  return (
    <DefaultLayout hasBackButton className="items-start gap-0 pb-[80px]">
      <div className="flex w-full items-center justify-between rounded-lg bg-blue-500 p-4 text-sm font-medium text-white">
        가상 피팅하기
        <div className="h-4 w-4 rounded-sm bg-gray-100 font-normal text-gray-600">
          {/* 첫 구매 이벤트 */}
        </div>
      </div>
      <img
        src={product?.image_url ?? ""}
        alt="product image"
        className="py-4"
      />
      <span className="my-2 w-full text-sm text-gray-400">
        {product?.brand?.name}
      </span>
      <h2 className="w-full text-xl font-semibold">{product?.name ?? ""}</h2>
      <p className="w-full text-xs">{product?.description ?? ""}</p>
      <p className="mt-2 w-full border-b-[1px] border-black py-2 text-xl font-medium">
        {product?.price?.toLocaleString("ko-KR", {
          style: "currency",
          currency: "KRW",
        }) ?? ""}
      </p>
      <div className="mb-4 mt-1 flex w-full justify-between text-xs font-normal text-gray-600">
        <p>배송: 2-3일 소요</p>
        <p className="text-right text-gray-400">
          배송비: 2,500원
          <br />
          도서산간지역 추가비용 발생
        </p>
      </div>
      <div className="flex w-full items-center gap-2">
        <button className="flex flex-1 items-center justify-center gap-2 rounded-md border-[1px] py-2 text-xs text-gray-400">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z"
              stroke="rgb(156, 163, 175)"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z"
              stroke="rgb(156, 163, 175)"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z"
              stroke="rgb(156, 163, 175)"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.59 13.51L15.42 17.49"
              stroke="rgb(156, 163, 175)"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.41 6.51L8.59 10.49"
              stroke="rgb(156, 163, 175)"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          공유하기
        </button>
        <button className="flex flex-1 items-center justify-center gap-2 rounded-md border-[1px] py-2 text-xs text-gray-400">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.84 4.60999C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.60999L12 5.66999L10.94 4.60999C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.60999C2.1283 5.64169 1.54871 7.04096 1.54871 8.49999C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.49999C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.60999V4.60999Z"
              stroke="rgb(156, 163, 175)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          좋아요 636
        </button>
      </div>
      <div className="w-full">
        <div className="my-4 flex w-full items-center justify-center gap-1 rounded-lg border-[1px] bg-white py-10 font-medium">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 16V7.99999C20.9996 7.64927 20.9071 7.3048 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.26999L13 2.26999C12.696 2.09446 12.3511 2.00204 12 2.00204C11.6489 2.00204 11.304 2.09446 11 2.26999L4 6.26999C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.3048 3.00036 7.64927 3 7.99999V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          AI가 추천하는 고객님의 사이즈는 <span>{Size[recommendSize]}</span>
          입니다.
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="h-[30px]">
              <th className="border-[1px] bg-gray-100 text-center font-normal">
                cm
              </th>
              <th className="border-[1px] bg-gray-100 text-center font-normal">
                어깨너비
              </th>
              <th className="border-[1px] bg-gray-100 text-center font-normal">
                소매길이
              </th>
            </tr>
          </thead>
          <tbody>
            {sizes.map((size, index) => (
              <tr
                className={clsx(
                  "h-[30px]",
                  index === recommendSize &&
                    "border-[2px] border-blue-500 bg-blue-100",
                )}
              >
                <td
                  className={clsx(
                    "border-[1px] text-center",
                    index === recommendSize && "border-gray-300",
                  )}
                >
                  {Size[size.size ?? 0]}
                </td>
                <td
                  className={clsx(
                    "border-[1px] text-center text-xs text-gray-500",
                    index === recommendSize && "border-gray-300",
                  )}
                >
                  {size.shoulder}
                </td>
                <td
                  className={clsx(
                    "border-[1px] text-center text-xs text-gray-500",
                    index === recommendSize && "border-gray-300",
                  )}
                >
                  {size.sleeve}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="fixed bottom-0 flex h-[80px] w-full gap-2 border-t-[1px] border-gray-300 bg-gray-50 px-2 pb-6 pt-2">
        <Button className="flex-1" color="secondary">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
        <Button className="flex-[6]">구매하기</Button>
      </div>
    </DefaultLayout>
  );
}
