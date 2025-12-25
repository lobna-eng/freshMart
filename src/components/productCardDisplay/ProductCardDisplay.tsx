import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import Image from "next/image";

import AddToCart from "../addToCart/AddToCart";
import { productI } from "@/interfaces";
import { Star } from "lucide-react";

export default function ProductCardDisplay({
  products,
}: {
  products: productI[];
}) {
  return (

 
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {products.map((product) => (
          <div key={product.id}  >
            <Card className="mx-5 md:mx-0">
              <Link href={"/products/" + product._id}>
                <CardHeader>
                  <Image
                    src={product.imageCover}
                    width={300}
                    height={300}
                    className="w-full"
                    alt={product.title}
                  />
                  <CardDescription>{product.brand.name}</CardDescription>
                  <CardTitle>{product.title.split(" ", 2).join(" ")}</CardTitle>
                  <CardDescription>{product.category.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center my-2">
                    {[0, 1, 2, 3, 4].map((star, index) => {
                      const filledStars =
                        index < Math.floor(product.ratingsAverage);
                      return (
                        <React.Fragment key={index}>
                          <Star
                            className={`${
                              filledStars
                                ? "text-yellow-400  fill-yellow-400"
                                : "text-gray-500  fill-gray-500"
                            }`}
                          />
                        </React.Fragment>
                      );
                    })}

                    <p className="ml-2 text-sm text-gray-600">
                      {product.ratingsAverage}
                    </p>
                  </div>

                  <p>
                    Price :
                    <span className="font-bold ml-1">{product.price}</span>
                    EGP
                  </p>
                </CardContent>
              </Link>
              <AddToCart productId={product.id} />
            </Card>
          </div>
        ))}
      </div>
  
  );
}
