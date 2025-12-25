"use server";
import { getUserToken } from "@/Helpers/getUserToken";
import { addressI } from "@/interfaces";

export async function addAddressAction(addressInfo: object) {
  const token = await getUserToken();

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/addresses",
    {
      method: "POST",
      body: JSON.stringify( addressInfo ),

      headers: {
        token: token!,
        "content-type": "application/json",
      },
    }
  );

  const data: addressI = await response.json();
  return data;
}
