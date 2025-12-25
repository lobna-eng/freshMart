import React from "react";
import { Button } from "../ui/button";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

export default function EmptyWishList() {
  return (
    <div className="container px-6 py-5 mx-auto flex flex-col justify-center items-center h-[75vh] space-y-4 text-center">
      <p className="text-2xl font-bold">Ready to make a wish?</p>

      <p className="text-muted-foreground max-w-md">
        Start adding items you love to your wishlist by tapping on the heart
        icon.
      </p>
      <Link href={'/products'}>
        <Button className=" cursor-pointer">
          <ShoppingCartIcon /> Go Shopping
        </Button>
      </Link>
    </div>
  );
}
