export async function resetPasswordAction(email: string, newPassword: string) {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
    {
      method: "PUT",
      body: JSON.stringify({ email, newPassword }),
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const data = await response.json();

  return data;
}
