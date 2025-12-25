export async function forgotPasswordAction(email:string) {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
    {
      method: "POST",
      body: JSON.stringify({email}),
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const data=await response.json()

  return data
}
