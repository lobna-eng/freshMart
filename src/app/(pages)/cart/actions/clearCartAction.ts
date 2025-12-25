"use server";

import { getUserToken } from "@/Helpers/getUserToken";
import { cartI } from "@/interfaces";

export async function clearUserCartAction() {
  const token = await getUserToken();
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "DELETE",
    headers: {
      token: token!,
    },
  });
  const data = await response.json();
  return data;
}
