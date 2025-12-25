"use server";

import { getUserToken } from "@/Helpers/getUserToken";
import { cartI } from "@/interfaces";

export async function removeCartItemAction(productId: string) {
  const token = await getUserToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/cart/` + productId,
    {
      method: "DELETE",
      headers: {
        token: token!,
      },
    }
  );
  const data: cartI = await response.json();
  return data;
}
