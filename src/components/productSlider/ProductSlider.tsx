"use client";
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { productI } from "@/interfaces";

export default function ProductSlider({ product }: { product: productI }) {
  return (
    <>
      <Carousel
        plugins={[
          Autoplay({
            delay: 1000,
          }),
        ]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {product.images.map((img, index) => (
            <CarouselItem key={index}>
              <div className="flex justify-center">
                <Image
                  src={img}
                  width={400}
                  height={400}
                  alt={product.title}
                  className="rounded-lg object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
