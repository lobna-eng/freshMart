"use client";
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

import React, { useEffect, useRef, useState } from "react";
import { addAddressAction } from "./actions/addAddressAction";
import { addressDetailsI, addressI } from "@/interfaces";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

import Link from "next/link";
import DialogForRemoveAddress from "@/components/dialogForRemoveAddress/DialogForRemoveAddress";
import { RemoveAddressAction } from "./actions/removeAddressAction";


export default function Address() {
  const [addingAddressLoading, setAddingAddressLoading] = useState(false);
  const [isRemovingAddress, setIsRemovingAddress] = useState(false);

  const [gettingAddressLoading, setGettingAddressLoading] = useState(false);
  const [AddressData, setAddressData] = useState<addressDetailsI[] | null>(
    null
  );
  let nameInput = useRef<HTMLInputElement | null>(null);
  let detailsInput = useRef<HTMLInputElement | null>(null);
  let phoneInput = useRef<HTMLInputElement | null>(null);
  let cityInput = useRef<HTMLInputElement | null>(null);

  async function getUserAddresses() {
    try {
      setGettingAddressLoading(true);

      const response = await fetch("/api/get-address");
      const data: addressI = await response.json();

      if (data.status === "success") {
        setAddressData(data.data);
        console.log(data);
      } else {
        toast.error("Failed to load addresses");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setGettingAddressLoading(false);
    }
  }

  async function addAddress() {
    const addressInfo = {
      name: nameInput.current?.value,
      details: detailsInput.current?.value,
      phone: phoneInput.current?.value,
      city: cityInput.current?.value,
    };
    setAddingAddressLoading(true);
    const data = await addAddressAction(addressInfo);
    if (data.status == "success") {
      toast.success("Address added successfully");
      setAddressData(data.data);
    }

    setAddingAddressLoading(false);
  }

  async function removeAddress(addressId: string) {
    setIsRemovingAddress(true);
    const data: addressI = await RemoveAddressAction(addressId)
    if (data.status == "success") {
      setAddressData(data.data);
      toast.success("Address removed successfully");
    }

    setIsRemovingAddress(false);
  }

  useEffect(() => {
    getUserAddresses();
  }, []);

  return (
    <div className="container mx-auto px-6 py-5 space-y-8">
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button className=" h-12 text-lg mt-3">Add new address</Button>
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
                <Label>name</Label>
                <Input ref={nameInput} id="name" />
              </div>
              <div className="grid gap-3">
                <Label>details</Label>
                <Input ref={detailsInput} id="details" />
              </div>
              <div className="grid gap-3">
                <Label>phone</Label>
                <Input ref={phoneInput} id="phone" />
              </div>
              <div className="grid gap-3">
                <Label>city</Label>
                <Input ref={cityInput} id="city" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                type="button"
                onClick={() => {
                  addAddress();
                }}
              >
                {addingAddressLoading && <Loader className="animate-spin" />}{" "}
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>

      {AddressData?.map((address, index) => (
        <div key={address._id}>
          <div className="lg:col-span-1 border rounded-xl shadow-md p-6 sticky top-20 bg-card">
            <Link href={`/address/${address._id}`}>
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Address {index + 1}
                </h2>

                <div className="space-y-3">
                  <div className="flex flex-col justify-between">
                    <h2>
                      Name :{" "}
                      <span className="text-muted-foreground">
                        {address.name}{" "}
                      </span>
                    </h2>
                    <h2>
                      Details :{" "}
                      <span className="text-muted-foreground">
                        {address.details}{" "}
                      </span>
                    </h2>
                    <h2>
                      City :{" "}
                      <span className="text-muted-foreground">
                        {address.city}{" "}
                      </span>
                    </h2>
                    <h2>
                      Phone :{" "}
                      <span className="text-muted-foreground">
                        {address.phone}{" "}
                      </span>
                    </h2>
                  </div>
                </div>
              </div>
            </Link>

<DialogForRemoveAddress
  addressId={address._id}
  removeAddress={removeAddress}
  isRemovingAddress={isRemovingAddress}
/>
          </div>
        </div>
      ))}
    </div>
  );
}
