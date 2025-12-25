"use client";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { getwishlistI } from "@/interfaces";
import { addToWishlistAction } from "@/app/(pages)/products/actions/addToWishlist.action";
import { removeFromWishlistAction } from "@/app/(pages)/wishlist/actions/removeFromWishlist.action";


export const WishListContext = createContext<{
  wishlistIds: string[];
  setWishlistIds: (value: string[]) => void;
  wishlistData: null | getwishlistI;
  setWishlistData: (value: null | getwishlistI) => void;
  isLoaded: boolean;
  setIsLoaded: (value: boolean) => void;
  getWishlist: () => void;
  AddProductToWishList: (productId: string) => void;
  RemoveProductFromWishList: (productId: string) => void;
}>({
  wishlistIds: [],
  setWishlistIds: () => {},
  wishlistData: null,
  setWishlistData: () => {},
  isLoaded: true,
  setIsLoaded: () => {},
  getWishlist: () => {},
  AddProductToWishList: () => {},
  RemoveProductFromWishList: () => {},
});

export default function WishListContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  // const session = useSession();
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [wishlistData, setWishlistData] = useState<null | getwishlistI>(null);
  const [isLoaded, setIsLoaded] = useState(true);

  async function getWishlist() {
    setIsLoaded(false);
    const response = await fetch("/api/get-wishlist");
    const data: getwishlistI = await response.json();
    if (data.status === "success") {
      setWishlistIds(data.data.map((item) => item._id));
      setWishlistData(data);
    }
    setIsLoaded(true);
  }

  async function AddProductToWishList(productId: string) {
    // if (session.status == "authenticated") {
      const data = await addToWishlistAction(productId);
      if (data.status === "success") {
        setWishlistIds([...wishlistIds, productId]);
        getWishlist();
      // }
    }
  }

  async function RemoveProductFromWishList(productId: string) {
    const data = await removeFromWishlistAction(productId);
    if (data.status === "success") {
      setWishlistIds((prev) => prev.filter((id) => id !== productId));
      getWishlist();
    }
  }

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <WishListContext.Provider
      value={{
        wishlistIds,
        setWishlistIds,
        wishlistData,
        setWishlistData,
        isLoaded,
        setIsLoaded,
        getWishlist,
        AddProductToWishList,
        RemoveProductFromWishList,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
