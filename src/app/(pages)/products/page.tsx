import { productI } from "@/interfaces";
import ProductCardDisplay from "@/components/productCardDisplay/ProductCardDisplay";

export default async function Products() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products"
  );
  //(products)alias name for data from api
  const { data: products }: { data: productI[] } = await response.json();


  return <ProductCardDisplay products={products} />;
}
