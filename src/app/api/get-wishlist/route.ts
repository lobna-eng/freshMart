import { getUserToken } from "@/Helpers/getUserToken";
import { getwishlistI } from "@/interfaces";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await getUserToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/wishlist`,
    {
      headers: {
        token: token!,
      },
    }
  );
  const data: getwishlistI = await response.json();

  return NextResponse.json(data);
}
