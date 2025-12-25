"use client";
import React, { useContext, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { CartContext } from "../context/CartContext";
import { createCashAction } from "./createCashAction";
import { checkoutAction } from "./checkOut.action";

export default function Checkout({ cartId }: { cartId: string }) {
  let { setCartData } = useContext(CartContext);
  const router = useRouter();
  const [visaLoading, setVisaLoading] = useState(false);
  const [cashLoading, setCashLoading] = useState(false);
  let detailsInput = useRef<HTMLInputElement | null>(null);
  let phoneInput = useRef<HTMLInputElement | null>(null);
  let cityInput = useRef<HTMLInputElement | null>(null);
  async function checkOutSession({ cartId }: { cartId: string }) {
    setVisaLoading(true);
    const shippingAddress = {
      details: detailsInput.current?.value,
      phone: phoneInput.current?.value,
      city: cityInput.current?.value,
    };
    const data = await checkoutAction(cartId, shippingAddress);

    if (data.status == "success") {
      window.location.href = data.session.url;
    }
    setVisaLoading(false);
  }

  async function createCashOrder({ cartId }: { cartId: string }) {
    setCashLoading(true);
    const shippingAddress = {
      details: detailsInput.current?.value,
      phone: phoneInput.current?.value,
      city: cityInput.current?.value,
    };
    const data = await createCashAction(cartId, shippingAddress);

    if (data.status == "success") {
      router.push("/allorders");
      setCartData(null);
    }
    setCashLoading(false);
  }
  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button className="w-full h-12 text-lg mt-3">
              Proceed to Checkout
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Address</DialogTitle>
              <DialogDescription>
                Add a shipping address for your deliveries.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label>City</Label>
                <Input ref={cityInput} id="City" />
              </div>
              <div className="grid gap-3">
                <Label>details</Label>
                <Input ref={detailsInput} id="details" />
              </div>
              <div className="grid gap-3">
                <Label>Phone Number</Label>
                <Input ref={phoneInput} id="phoneNumber" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                type="submit"
                onClick={() => {
                  checkOutSession({ cartId });
                }}
              >
                {visaLoading && <Loader className="animate-spin" />} Visa
              </Button>
              <Button
                type="submit"
                onClick={() => {
                  createCashOrder({ cartId });
                }}
              >
                {cashLoading && <Loader className="animate-spin" />}
                Cash
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
