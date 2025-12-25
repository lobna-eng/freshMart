export async function verifyResetCodeAction(resetCode:string) {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
    {
      method: "POST",
      body: JSON.stringify({resetCode}),
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const data=await response.json()

  return data
}
