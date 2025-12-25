import NotInStore from "@/components/notInStore/NotInStore";
import ProductCardDisplay from "@/components/productCardDisplay/ProductCardDisplay";
import { BrandI, productI } from "@/interfaces";
import { Params } from "next/dist/server/request/params";
import React from "react";

export default async function BrandDetails({ params }: { params: Params }) {
  let classification: string = "brand";
  const { brandId } = await params;
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/brands/" + brandId
  );
  const { data: brand }: { data: BrandI } = await response.json();
  const productResponse = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products?brand=" + brandId
  );
  //(products)alias name for data from api
  const { data: products }: { data: productI[] } = await productResponse.json();

  return (
    <>
      {products.length > 0 ? (
        <ProductCardDisplay products={products} />
      ) : (
        <NotInStore classification={classification}  />
      )}
    </>
  );
}
