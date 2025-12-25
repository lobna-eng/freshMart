import { Card, CardTitle } from "@/components/ui/card";
import { categoryI } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Categories() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories"
  );
  const { data: categories }: { data: categoryI[] } = await response.json();


  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center tracking-tight">
        Explore Our categories
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Card
            key={category._id}
            className="rounded-xl overflow-hidden border shadow-sm hover:shadow-lg transition-all cursor-pointer group"
          >
            <Link href={"/categories/" + category._id}>
              <div className="w-full h-48 relative overflow-hidden bg-gray-100">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardTitle className="text-center text-lg font-semibold tracking-tight py-2">
                {category.name}
              </CardTitle>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
