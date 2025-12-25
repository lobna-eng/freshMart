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


import React from "react";

import { Loader, Trash2 } from "lucide-react";


export default function DialogForRemoveAddress({
  addressId,
  removeAddress,
  isRemovingAddress,
}: {
  addressId: string;
  removeAddress: (id: string) => void;
  isRemovingAddress: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="cursor-pointer mt-4 text-destructive flex items-center gap-2 hover:text-destructive"
        >
          <Trash2 size={18} /> Remove address
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remove address </DialogTitle>
          <DialogDescription>
            Are you sure you want to remove address?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={() => {
            removeAddress(addressId)
          }}>
            {isRemovingAddress && <Loader className="animate-spin" />} ok
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
