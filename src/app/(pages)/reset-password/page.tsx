"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { resetPasswordAction } from "./actions/resetPasswordAction";

export default function ResetPasswordPage() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  async function resetPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const data = await resetPasswordAction(emailInput, passwordInput);

    if (data.token) {
      toast.success("password reset successfuly");
      setApiError("");
      router.push("/login");
    } else {
      setApiError(data.message);
    }
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-sm">
        <CardContent className="p-6 space-y-6">
          {/* Input */}
          <form
            onSubmit={(e) => {
              resetPassword(e);
            }}
          >
            <div className="flex flex-col mb-4">
              <label
                htmlFor="email"
                className="mb-2 font-medium text-sm text-gray-700"
              >
                Email Address
              </label>
              <Input
                id="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="ali@gmail.com"
                className="h-11"
              />
            </div>

            <div className="flex flex-col mb-4">
              <label
                htmlFor="password"
                className="mb-2 font-medium text-sm text-gray-700"
              >
                New password
              </label>
              <Input
                id="password"
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="ali@123"
                className="h-11"
              />
            </div>

            {/* Button */}
            <Button type="submit" className="w-full h-11 my-5 cursor-pointer">
              {isLoading && <Loader className="animate-spin" />} submit for
              resetting password
            </Button>
            {apiError && <p className="text-red-600 text-center">{apiError}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
