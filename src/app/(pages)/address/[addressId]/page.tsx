import DialogForRemoveAddress from "@/components/dialogForRemoveAddress/DialogForRemoveAddress";
import { getUserToken } from "@/Helpers/getUserToken";
import { addressI, specificAddressI } from "@/interfaces";
import { Params } from "next/dist/server/request/params";
import React from "react";

export default async function AddressDetails({ params }: { params: Params }) {
  const token = await getUserToken();
  let { addressId } = await params;

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,
    {
      headers: {
        token: token!,
        "content-type": "application/json",
      },
    }
  );
  const data: specificAddressI = await response.json();
  const specificAddress = data.data;


  return (
    <div className="lg:col-span-1 border rounded-xl shadow-md p-6 sticky top-20 bg-card">
      <div className="space-y-3">
        <div className="flex flex-col justify-between">
          <h2>
            Name :{" "}
            <span className="text-muted-foreground">
              {specificAddress.name}{" "}
            </span>
          </h2>
          <h2>
            Details :{" "}
            <span className="text-muted-foreground">
              {specificAddress.details}{" "}
            </span>
          </h2>
          <h2>
            City :{" "}
            <span className="text-muted-foreground">
              {specificAddress.city}{" "}
            </span>
          </h2>
          <h2>
            Phone :{" "}
            <span className="text-muted-foreground">
              {specificAddress.phone}{" "}
            </span>
          </h2>
        </div>
      </div>

    </div>
  );
}
