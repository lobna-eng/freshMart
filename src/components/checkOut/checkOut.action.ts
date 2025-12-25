"use server";

import { getUserToken } from "@/Helpers/getUserToken";

export async function checkoutAction(cartId: string, shippingAddress: object) {
  const token = await getUserToken();
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXT_URL}`,

    {
      method: "POST",
      body: JSON.stringify({ shippingAddress }),
      headers: {
        token: token!,
        "content-type": "application/json",
      },
    }
  );

  const data = await response.json();
  return data;
}
