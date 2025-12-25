import { productI } from "@/interfaces";
import { Params } from "next/dist/server/request/params";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";


import ProductSlider from "@/components/productSlider/ProductSlider";
import AddToCart from "@/components/addToCart/AddToCart";
import { Star } from "lucide-react";

export default async function ProductDetails({ params }: { params: Params }) {
  const { productId } = await params;

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${productId}`
  );

  const { data: product }: { data: productI } = await response.json();

  return (
    <>
      <Card className="grid md:grid-cols-2 gap-6 items-center w-11/12 md:w-3/4 mx-auto p-6 shadow-lg">
        <ProductSlider product={product} />
        <div className="flex flex-col gap-4">
          <CardHeader>
            <CardDescription className="text-gray-500 text-sm">
              {product.brand.name}
            </CardDescription>

            <CardTitle className="text-2xl font-bold">
              {product.title}
            </CardTitle>

            <CardDescription className="leading-relaxed">
              {product.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-3">
            <CardDescription className="font-semibold">
              Category: {product.category.name}
            </CardDescription>

            {/* Rating */}
            <div className="flex items-center gap-1">
                     {[0, 1, 2, 3, 4].map((star, index) => {
                    const filledStars =
                      index < Math.floor(product.ratingsAverage);
                    return (
                      <React.Fragment key={index}>
                      
                        <Star className={`${filledStars? "text-yellow-400  fill-yellow-400":"text-gray-500  fill-gray-500"}`} />
                      </React.Fragment>
                    );
                  })}

              <span className="text-sm text-gray-500">
                ({product.ratingsQuantity})
              </span>
            </div>

            {/* Price + Quantity */}
            <div className="flex flex-col gap-1 mt-2">
              <p className="font-bold text-lg">{product.price} EGP</p>
              <p className="font-bold text-sm">Quantity: {product.quantity}</p>
            </div>
          </CardContent>

          <AddToCart productId={product._id} />
        </div>
      </Card>
    </>
  );
}
