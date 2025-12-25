"use client";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import {  Loader, ShoppingCartIcon } from "lucide-react";
import { CardFooter } from "../ui/card";
import toast from "react-hot-toast";
import { CartContext } from "../context/CartContext";
import AddToWishList from "../addToWishlist/AddToWishList";
import { addToCartAction } from "@/app/(pages)/products/actions/addToCart.action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddToCart({ productId }: { productId: string }) {
  const session=useSession()
  const router=useRouter()
  const { setCartData  } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  async function addProductoCart() {
    setIsLoading(true);
if (session.status=='authenticated'){
      const data = await addToCartAction(productId);
    data.status == "success" && toast.success("Product added successfuly");
    setCartData(data);
        setIsLoading(false);
}
else{
  router.push('/login')
}
    


  }

  return (
    <>
      <CardFooter className="gap-2">
        <Button onClick={addProductoCart} className="grow cursor-pointer">
          {isLoading ? (
            <Loader className="animate-spin" />
          ) : (
            <ShoppingCartIcon />
          )}
          Add to cart
        </Button>
        <AddToWishList productId={productId} />
      </CardFooter>
    </>
  );
}
