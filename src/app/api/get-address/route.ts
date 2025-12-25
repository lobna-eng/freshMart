import { getUserToken } from "@/Helpers/getUserToken";
import { addressI } from "@/interfaces";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await getUserToken();
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
    headers: {
      token: token!,
    },
  });
  const data: addressI = await response.json();
  return NextResponse.json(data);
}



