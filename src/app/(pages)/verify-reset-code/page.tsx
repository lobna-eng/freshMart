"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { verifyResetCodeAction } from "./actions/verifyResetCodeAction";

export default function verifyResetCode() {
  const [resetCode, setResetCode] = useState("");
  const [resetCodeError, setresetCodeError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  async function verifyResetCode(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const data = await verifyResetCodeAction(resetCode);
    

    if (data.status == "Success") {
      toast.success("valid code");
      setresetCodeError("");
      router.push('/reset-password')
      
    } else {
      setresetCodeError(data.message);
    }
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-sm">
        <CardContent className="p-6 space-y-6">
          {/* Title */}
          <div className="text-center space-y-2">
            <h1 className="text-xl font-semibold">Enter the 6-digit code.</h1>
            <p className="text-sm text-muted-foreground">
              Check *****@gmail.com for the verification code.
            </p>
          </div>
          {/* Input */}
          <form
            onSubmit={(e) => {
              verifyResetCode(e);
            }}
          >
            <Input
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              placeholder="6-digit code"
              className="h-11"
            />

            {/* Button */}
            <Button type="submit" className="w-full h-11 my-10 cursor-pointer">
              {isLoading && <Loader className="animate-spin" />} Send
            </Button>
            {resetCodeError && (
              <p className="text-red-600 text-center">{resetCodeError}</p>
            )}
          </form>

          <div className="text-center ">
            <p className="text-sm text-muted-foreground">
              If you don't see the email in your inbox, check your spam folder.
              If it's not there, the email address may not be verified or may
              not match an existing LinkedIn account.
            </p>
          </div>
          <div className=" text-center">
            <Link href={"/forget-password"}>
              <Button  className="my-5  cursor-pointer">Change email</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
