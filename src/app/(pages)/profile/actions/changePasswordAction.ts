"use server";

import { getUserToken } from "@/Helpers/getUserToken";

export default async function changePasswordAction(passwordInfo:object) {
  const token = await getUserToken();
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
    {
      method: "PUT",
      body: JSON.stringify(passwordInfo),
      headers: {
        token: token!,
        "content-type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}
