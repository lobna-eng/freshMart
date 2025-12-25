"use client";
import { HeartIcon } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { WishListContext } from "../context/WishListContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddToWishList({ productId }: { productId: string }) {
  const { wishlistIds, AddProductToWishList, RemoveProductFromWishList } =
    useContext(WishListContext);
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const session = useSession();
  const router = useRouter();

  // check every time when change occured to wishlistIds if the productId still in it or now
  //if yes(means adding to wishlist) return true and put make state=true and make heart solid
  //if no(means remove from wishlist) return false and put make state=false

  useEffect(() => {
    setAddedToWishlist(wishlistIds.includes(productId));
  }, [wishlistIds, productId]);

  async function toggleWish() {
    if (session.status == "authenticated") {
      if (!addedToWishlist) {
        await AddProductToWishList(productId);
        toast("Product Added to your wishlist successfully❤️");
      } else {
        await RemoveProductFromWishList(productId);
        toast("Product removed from your wishlist successfully❤️");
      }
    } else {
      router.push("/login");
    }
  }

  return (
    <div className="cursor-pointer" onClick={toggleWish}>
      {addedToWishlist ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6  hover:text-red-500 "
        >
          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
        </svg>
      ) : (
        <HeartIcon className="size-6 hover:text-red-500" />
      )}
    </div>
  );
}
