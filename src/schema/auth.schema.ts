import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters." }),

    email: z
      .string()
      .email({ message: "Invalid email address." }),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),

    rePassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),

    phone: z
      .string()
      .regex(/^01[0-2,5]\d{8}$/, {
        message: "Invalid Egyptian phone number.",
      }),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Password and Re-password must be the same",
  });
