"use client";
import AddToCart from "@/components/addToCart/AddToCart";
import { WishListContext } from "@/components/context/WishListContext";
import EmptyWishList from "@/components/emptyWishList/EmptyWishList";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

export default function WishList() {
  const { wishlistIds, wishlistData } = useContext(WishListContext);

  return (
    <>
      {wishlistIds.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {wishlistData?.data.map((product) => (
            <div key={product._id}>
              <Card>
                <Link href={`/products/${product._id}`}>
                  <CardHeader>
                    <Image
                      src={product?.imageCover}
                      width={300}
                      height={300}
                      className="w-full"
                      alt={product?.title}
                    />
                    <CardDescription>{product?.brand.name}</CardDescription>
                    <CardTitle>
                      {product?.title.split(" ", 2).join(" ")}
                    </CardTitle>
                    <CardDescription>{product?.category.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center mb-2">
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
                      <span className="font-bold ml-1">{product.price}</span>{" "}
                      EGP
                    </p>
                  </CardContent>
                </Link>
                <AddToCart productId={product._id} />
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <EmptyWishList />
      )}
    </>
  );
}
