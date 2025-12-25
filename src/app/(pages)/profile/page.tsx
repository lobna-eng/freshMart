"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Package,
  RotateCcw,
  Heart,
  MapPin,
  LucideIcon,
  ShoppingCart,
  Loader,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import changePasswordAction from "./actions/changePasswordAction";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  let session = useSession();
  let currentPasswordInput = useRef<HTMLInputElement | null>(null);
  let passwordInput = useRef<HTMLInputElement | null>(null);
  let rePasswordInput = useRef<HTMLInputElement | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [apiError, setapiError] = useState("");
  async function changePassword() {
    const passwordInfo = {
      currentPassword: currentPasswordInput.current?.value,
      password: passwordInput.current?.value,
      rePassword: rePasswordInput.current?.value,
    };
    setIsChangingPassword(true);
    const data = await changePasswordAction(passwordInfo);
    if (data.message == "success") {
      toast.success("password changed successfully");
      router.push("/");
      setapiError("");
    } else if (data.message == "fail") {
      setapiError(data.errors?.msg);
    } else {
      setapiError(data.message);
    }
    setIsChangingPassword(false);
  }
  return (
    <div className="min-h-screen  p-6">
      <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-[278px_1fr] gap-6">
        {/* Sidebar */}
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-4 space-y-6">
            {/* User Info */}
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback></AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">Hi {session.data?.user.name}</p>
                <p className="text-sm text-muted-foreground">
                  {session.data?.user.email}
                </p>
              </div>
            </div>

            <Separator />

            {/* Menu */}
            <ScrollArea className="h-[420px] pr-2">
              <div className="space-y-1">
                <Link href={"/allorders"}>
                  <SidebarItem icon={Package} label="Orders" />
                </Link>
                <Link href={"/wishlist"}>
                  <SidebarItem icon={Heart} label="Wishlist" />
                </Link>

                <p className="px-3 pt-4 text-xs font-semibold text-muted-foreground">
                  MY ACCOUNT
                </p>
                <Link href={"/address"}>
                  <SidebarItem icon={MapPin} label="Addresses" />
                </Link>

                <Link href={"/cart"}>
                  <SidebarItem icon={ShoppingCart} label="cart" />
                </Link>

                <Dialog>
                  <form>
                    <DialogTrigger asChild>
                      <Button className="my-10 text-sm cursor-pointer">
                        change password
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>change password </DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4">
                        <div className="grid gap-3">
                          <Label>current Password</Label>
                          <Input
                            type="password"
                            ref={currentPasswordInput}
                            id="currentPassword"
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label>password</Label>
                          <Input
                            type="password"
                            ref={passwordInput}
                            id="password"
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label>rePassword</Label>
                          <Input
                            type="password"
                            ref={rePasswordInput}
                            id="rePassword"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                          type="button"
                          onClick={() => {
                            changePassword();
                          }}
                        >
                          {isChangingPassword && (
                            <Loader className="animate-spin" />
                          )}
                          change
                        </Button>
                      </DialogFooter>
                      {apiError && (
                        <p className="text-red-600 text-center">{apiError}</p>
                      )}
                    </DialogContent>
                  </form>
                </Dialog>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Card className=" rounded-2xl shadow-sm flex items-center justify-center ">
          <CardContent className="text-center space-y-4 py-20">
            <div className="mx-auto h-20 w-20 rounded-full bg-muted flex items-center justify-center">
              <RotateCcw className="h-8 w-8 text-muted-foreground" />
            </div>

            <h2 className="text-xl font-semibold">No returns requested</h2>
            <p className="text-muted-foreground">
              You have not requested any previous returns
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ---------------- Sidebar Item ---------------- */

type SidebarItemProps = {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  badge?: string;
};

function SidebarItem({
  icon: Icon,
  label,
  active = false,
  badge,
}: SidebarItemProps) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm cursor-pointer transition
        ${active ? "bg-yellow-100 text-yellow-900" : "hover:bg-muted"}
      `}
    >
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>

      {badge && (
        <span className="text-xs rounded-full bg-muted px-2 py-0.5">
          {badge}
        </span>
      )}
    </div>
  );
}
