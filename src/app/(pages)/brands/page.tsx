import { Card, CardTitle } from "@/components/ui/card";
import { BrandI } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Brands() {
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
  const { data: brands }: { data: BrandI[] } = await response.json();

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center tracking-tight">
        Explore Our Brands
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <Card
            key={brand._id}
            className="rounded-xl overflow-hidden border shadow-sm hover:shadow-lg transition-all cursor-pointer group"
          >
            <Link href={"/brands/" + brand._id}>
              <div className="w-full  bg-gray-100 overflow-hidden">
                <Image
                  width={300}
                  height={300}
                  src={brand.image}
                  alt={brand.name}
                  priority={true}
                  className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
                />
              </div>

              <CardTitle className="text-center  text-lg font-semibold tracking-tight ">
                {brand.name}
              </CardTitle>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
