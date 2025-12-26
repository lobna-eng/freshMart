"use server";

import { getUserToken } from "@/Helpers/getUserToken";
import { cartI } from "@/interfaces";

export async function updateCartProductQuantityAction(
  productId: string,
  count: number
) {
  const token = await getUserToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/cart/` + productId,
    {
      method: "PUT",
      body: JSON.stringify({ count }),
      headers: {
        token: token!,
        "content-type": "application/json",
      },
    }
  );
  const data: cartI = await response.json();
  return data;
}
