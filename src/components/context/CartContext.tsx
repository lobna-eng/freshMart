"use client";
import { cartI } from "@/interfaces";
import React, { createContext, ReactNode, useEffect, useState } from "react";

export const CartContext = createContext<{
  cartData: null | cartI;
  setCartData: (value: null | cartI) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  getCart: () => void;
}>({
  cartData: null,

  setCartData: () => {},
  isLoading: false,
  setIsLoading: () => {},
  getCart: () => {},
});

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartData, setCartData] = useState<null | cartI>(null);
  const [isLoading, setIsLoading] = useState(false);

  // ---------------- get cart from server ----------------
  async function getCart() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/get-cart");
      const data: cartI = await response.json();
      setCartData(data);


    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // ---------------- fetch cart on mount ----------------
  useEffect(() => {
    getCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartData,
        setCartData,
        isLoading,
        setIsLoading,
        getCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
