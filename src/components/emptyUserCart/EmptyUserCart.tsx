import React from "react";
import { Button } from "../ui/button";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
export default function EmptyUserCart() {
  return (
    <div className="container px-6 py-5 mx-auto flex flex-col justify-center items-center h-[75vh] space-y-4 text-center">
      <p className="text-2xl font-bold">Your Shopping cart looks empty.</p>

      <p className="text-muted-foreground max-w-md">
       What are you looking for?
      </p>
      <Link href={'/products'}>
        <Button className=" cursor-pointer">
          <ShoppingCartIcon /> Start Shopping
        </Button>
      </Link>
    </div>
  );
}
