import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="container mx-auto py-20  ">
        <div className="flex flex-col justify-center items-center text-center gap-8 py-10 ">
          <h1 className="text-3xl md:text-5xl font-bold">
            Welcome to ShopMart
          </h1>

          <p className="max-w-xl text-gray-600">
            Discover the latest technology, fashion and lifestyle products.
            Quality guaranteed with fast shipping and excellent customer
            service.
          </p>

          <div className="flex gap-2 md:gap-4">
            <Link href="/products">
              <Button className="px-10 cursor-pointer">Shop Now</Button>
            </Link>

            <Link href="/categories">
              <Button
                className="bg-primary-foreground text-primary px-10 cursor-pointer"
                variant="outline"
              >
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
