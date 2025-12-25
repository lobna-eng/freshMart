import NotInStore from "@/components/notInStore/NotInStore";
import ProductCardDisplay from "@/components/productCardDisplay/ProductCardDisplay";
import { productI } from "@/interfaces";
import { Params } from "next/dist/server/request/params";

import React from "react";

export default async function CategoryDetails({ params }: { params: Params }) {
  let classification: string = "category";
  const { categoryId } = await params;
  const categoryResponse = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories/" + categoryId
  );

  const productResponse = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products?category=" + categoryId
  );
  //(products)alias name for data from api
  const { data: products }: { data: productI[] } = await productResponse.json();

  return (
    <>
      {products.length > 0 ? (
        <ProductCardDisplay products={products} />
      ) : (
        <NotInStore classification={classification} />
      )}
    </>
  );
}
