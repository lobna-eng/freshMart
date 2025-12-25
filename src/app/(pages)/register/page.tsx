"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {  z } from "zod";

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
import { useRouter, useSearchParams } from "next/navigation";
import { Loader, Phone } from "lucide-react";
import { registerSchema } from "@/schema/auth.schema";
import { signUpAction } from "@/app/api/signUp/signUp.action";

type formFields = z.infer<typeof registerSchema>;
export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<formFields>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });
  async function signUp(userData: formFields) {
    const data = await signUpAction(userData)
    

    return data;
  }

  async function onSubmit(values: formFields) {
    setIsLoading(true);
    const data = await signUp(values);
    if (data.message == "success") {
      setIsLoading(false);
      router.push("/login");
    } else {
      form.setError("root.serverError", {
        message: data.message,
      });
    }
    
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen ">
      <Card className="p-8 w-full max-w-md shadow-xl rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          Welcome To ShopMart 🛒
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="ali" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>rePassword</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isLoading}
              type="submit"
              className="w-full cursor-pointer border border-transparent hover:bg-white hover:text-black  hover:border-black text-white font-semibold py-2 rounded-lg"
            >
              {isLoading && <Loader className="animate-spin" />} Register
            </Button>

            {form.formState.errors.root?.serverError && (
              <p className="text-red-600 text-center">
                {form.formState.errors.root.serverError.message}
              </p>
            )}
          </form>
        </Form>
      </Card>
      <p className="text-[18px] text-gray-700 mt-4 text-center">
        Already have an account?
        <Link
          href="/login"
          className="text-blue-500 cursor-pointer font-semibold underline "
        >
          log in
        </Link>
      </p>
    </div>
  );
}
