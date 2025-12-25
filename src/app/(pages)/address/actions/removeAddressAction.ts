"use server";

import { getUserToken } from "@/Helpers/getUserToken";
import { addressI } from "@/interfaces";

export async function RemoveAddressAction(addressId: string) {
  const token = await getUserToken();

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,
    {
      method: "DELETE",
      headers: {
        token: token!,
      },
    }
  );
  const data: addressI = await response.json();
  return data;
}
