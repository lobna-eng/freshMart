"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader } from "lucide-react";

const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const passwordRegex = /^.{6,}$/;

const formSchema = z.object({
  email: z
    .string()
    .min(2, { message: "Email must be at least 2 characters." })
    .regex(emailRegex, { message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .regex(passwordRegex, {
      message: "Password must be at least 6 characters.",
    }),
});

type formFields = z.infer<typeof formSchema>;
export default function Login() {
  let searchParams = useSearchParams();
  // console.log(searchParams.get("error"));

  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: formFields) {
    setIsLoading(true);
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: "/products",
      redirect: true,
    });
    setIsLoading(false);
    // console.log(values);
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen ">
      <Card className="p-8 w-full max-w-md shadow-xl rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome Back!</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="ali@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full cursor-pointer border border-transparent hover:bg-white hover:text-black  hover:border-black text-white font-semibold py-2 rounded-lg"
            >
              {isLoading && <Loader className="animate-spin" />} Login
            </Button>
            <div className="  text-center">
              <Link
                className=" cursor-pointer font-semibold underline "
                href={"/forget-password"}
              >
                Forget Password
              </Link>
            </div>
            {searchParams.get("error") && (
              <p className="text-red-600 text-center">
                {searchParams.get("error")}
              </p>
            )}
          </form>
        </Form>
      </Card>
      <p className="text-[18px] text-gray-700 mt-4 text-center">
        Don't have an account?
        <Link
          href="/register"
          className="text-blue-500 cursor-pointer font-semibold underline "
        >
          Sign Up
        </Link>
        now
      </p>
    </div>
  );
}
