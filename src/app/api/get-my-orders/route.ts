import { getUserToken } from "@/Helpers/getUserToken";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await getUserToken();

  const userResponse = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
    {
      headers: {
        token: token!,
      },
    }
  );

  const userData = await userResponse.json();
  const userId = userData.decoded.id;

  const ordersResponse = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    {
      headers: {
        token: token!,
      },
    }
  );

  const orders = await ordersResponse.json();

  return NextResponse.json(orders);
}
