"use client";
import React, { useContext } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { HeartIcon, Loader, ShoppingCartIcon, UserIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CartContext } from "../context/CartContext";
import { WishListContext } from "../context/WishListContext";
import { signOut, useSession } from "next-auth/react";
export default function Navbar() {
  let session = useSession();
  const { cartData, isLoading } = useContext(CartContext);
  const { isLoaded, wishlistIds } = useContext(WishListContext);

  // console.log(session);

  return (
    <nav className="font-semibold py-3 md:py-4 text-lg md:text-2xl bg-[#f3f5f6] px-4 sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="font-bold">
            <Link href={"/"}>
              <span className="m-auto px-2 py-.5 rounded-lg text-white bg-black me-2">
                S
              </span>
              ShopMart
            </Link>
          </h1>

          {/* Desktop Menu */}
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="space-x-3">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/products">Products</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/brands">Brands</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/categories">Categories</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Menu */}
          <div className="md:hidden ">
            <DropdownMenu>
              <DropdownMenuTrigger className="text-xl cursor-pointer">
                ☰
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href="/products">
                  <DropdownMenuItem>Products</DropdownMenuItem>
                </Link>
                <Link href="/brands">
                  <DropdownMenuItem>Brands</DropdownMenuItem>
                </Link>
                <Link href="/categories">
                  <DropdownMenuItem>Categories</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-4">
            {session.status == "authenticated" && (
              <span className="text-[18px]  hidden md:block">
                Hi {session.data.user.name}
              </span>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <UserIcon className="cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {session.status == "authenticated" ? (
                  <>
                    <Link href="/profile">
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      onClick={() => {
                        signOut({ callbackUrl: "/" });
                      }}
                    >
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <DropdownMenuItem>login</DropdownMenuItem>
                    </Link>
                    <Link href="/register">
                      <DropdownMenuItem>register</DropdownMenuItem>
                    </Link>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {session.status == "authenticated" && (
              <>
                <div className="relative">
                  <Link href={"/cart"}>
                    <ShoppingCartIcon />

                    <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute -top-3 -end-3">
                      {isLoading ? (
                        <Loader className="animate-spin " />
                      ) : (
                        cartData?.numOfCartItems
                      )}
                    </Badge>
                  </Link>
                </div>
                <div className="relative">
                  <Link href={"/wishlist"}>
                    <HeartIcon className="cursor-pointer" />
                    <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute -top-3 -end-3">
                      {!isLoaded ? (
                        <Loader className="animate-spin" />
                      ) : (
                        wishlistIds.length
                      )}
                    </Badge>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
