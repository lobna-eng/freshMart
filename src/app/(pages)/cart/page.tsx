"use client";
import Loading from "@/app/loading";
import Checkout from "@/components/checkOut/Checkout";
import { CartContext } from "@/components/context/CartContext";
import EmptyUserCart from "@/components/emptyUserCart/EmptyUserCart";
import { Button } from "@/components/ui/button";

import { Loader, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateCartProductQuantityAction } from "./actions/updateCartQuantity.action";
import { removeCartItemAction } from "./actions/removeCartItem";
import { clearUserCartAction } from "./actions/clearCartAction";

export default function Cart() {
  let { cartData, setCartData, isLoading, getCart } = useContext(CartContext);

  const [updatingId, setUpdatingId] = useState<null | string>(null);
  const [removingId, setRemovingId] = useState<null | string>(null);
  const [isClearingCart, setIsClearingCart] = useState(false);



  async function updateCartProductQuantity(productId: string, count: number) {
    setUpdatingId(productId);

    const data = await updateCartProductQuantityAction(productId,count)
    if (data.status == "success") {
      setCartData(data);
      toast.success("Product quantity updated successfully");
    }
    setUpdatingId(null);
  }

  async function removeCartItem(productId: string) {
    setRemovingId(productId);

    const data=await removeCartItemAction(productId)
    if (data.status == "success") {
      toast.success("product deleted from cart successfully");
      setCartData(data);
    }
    setRemovingId(null);
  }

  async function clearUserCart() {
    setIsClearingCart(true);

    const data = await clearUserCartAction()
    if (data.message == "success") {
      setCartData(null);
    }
    setIsClearingCart(false);
  }

  useEffect(() => {
    if (
      typeof cartData?.data?.products?.[0]?.product === "string" ||
      cartData == null
    ) {
      getCart();
    }
  }, [cartData]);





  return (
    <>
      {isLoading ||
      typeof cartData?.data?.products?.[0]?.product === "string" ? (
        <Loading />
      ) : cartData?.numOfCartItems! > 0 ? (
        <div className="container mx-auto py-8 px-4">
          {/* Page title */}
          <div className="mb-6">
            <h1 className="font-bold text-4xl tracking-tight">Shopping Cart</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              {cartData?.numOfCartItems} items in your cart
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-5">
              {cartData?.data.products.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-5 p-5 bg-card border rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-28 h-28 rounded-xl object-cover shadow-sm"
                  />

                  <div className="flex-1">
                    {/* Product Heading */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div>
                        <h3 className="text-lg font-semibold leading-tight line-clamp-2">
                          {item.product.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.product.brand.name} —
                          {item.product.category.name}
                        </p>
                      </div>

                      <div className="text-right font-semibold text-lg">
                        EGP {item.price}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex items-center justify-between">
                      {/* Quantity Buttons */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            updateCartProductQuantity(
                              item.product._id,
                              item.count - 1
                            );
                          }}
                          disabled={item.count == 1}
                          className="size-9 rounded-lg border font-bold text-xl hover:bg-accent transition"
                        >
                          -
                        </button>

                        <span className="w-6 text-center text-lg">
                          {updatingId == item.product._id ? (
                            <Loader className="animate-spin" />
                          ) : (
                            item.count
                          )}
                        </span>

                        <button
                          onClick={() => {
                            updateCartProductQuantity(
                              item.product._id,
                              item.count + 1
                            );
                          }}
                          className="size-9 rounded-lg border font-bold text-xl hover:bg-accent transition"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => {
                          removeCartItem(item.product._id);
                        }}
                        className="flex  text-destructive font-medium hover:underline"
                      >
                        {removingId == item.product._id && (
                          <Loader className="animate-spin" />
                        )}
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="border rounded-xl shadow-md p-6 sticky top-20 bg-card">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Subtotal ({cartData?.numOfCartItems} items)
                    </span>
                    <span className="font-medium">
                      {cartData?.data.totalCartPrice} EGP
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-emerald-600">Free</span>
                  </div>
                </div>

                <div className="border-t mt-4 pt-4 space-y-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{cartData?.data.totalCartPrice} EGP</span>
                  </div>


              <Checkout  cartId={cartData?.cartId!}/>
                  <Link href={"/products"}>
                 
                    <Button variant="secondary" className="w-full h-12 text-lg">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                <Button
                  onClick={() => {
                    clearUserCart();
                  }}
                  variant="secondary"
                  className="cursor-pointer mt-4 text-destructive flex items-center gap-2 hover:text-destructive"
                >
                  {isClearingCart ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <Trash2 size={18} />
                  )}
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EmptyUserCart />
      )}
    </>
  );
}
