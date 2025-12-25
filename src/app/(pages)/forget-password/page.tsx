"use client";
import React, { useState } from "react";
import { forgotPasswordAction } from "./actions/forgetPasswordAction";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader, Lock } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ForgetPassword() {
  const [emailForResetPassword, setEmailForResetPassword] = useState("");
  const [forgetPasswordError, setforgetPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
const router=useRouter();
  async function forgotPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const data = await forgotPasswordAction(emailForResetPassword);
    
    if (data.statusMsg == "success") {
      toast.success("Reset code sent to your email");
      setforgetPasswordError('');

      router.push('/verify-reset-code')
      


    } else {
      setforgetPasswordError(data.message);
    }
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-sm">
        <CardContent className="p-6 space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full border flex items-center justify-center">
              <Lock className="h-8 w-8" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center space-y-2">
            <h1 className="text-xl font-semibold">Trouble logging in?</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and we will send you a link to get back into your
              account.
            </p>
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              forgotPassword(e);
            }}
          >
            <Input
              value={emailForResetPassword}
              onChange={(e) => setEmailForResetPassword(e.target.value)}
              placeholder="ali@gmail.com"
              className="h-11"
            />

            {/* Button */}
            <Button type="submit" className="w-full h-11 my-10 cursor-pointer">
              {isLoading && <Loader className="animate-spin" />} Send login link
            </Button>
            {forgetPasswordError && (
              <p className="text-red-600 text-center">{forgetPasswordError}</p>
            )}
          </form>

          {/* Create account */}
          <div className="text-center">
            <Link href={"/register"}>
              <button className=" font-medium hover:underline">
                Create new account
              </button>
            </Link>
          </div>
        </CardContent>
        {/* Divider */}
        <div className="flex items-center gap-1">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">OR</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Footer */}
        <div className="p-2 text-center">
          <Link href={"/login"}>
            <button className="font-medium hover:underline">
              Back to login
            </button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
