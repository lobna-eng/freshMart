"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { orderI } from "@/interfaces";
import React, { useEffect, useState } from "react";
import Loading from "@/app/loading";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

export default function AllOrders() {
  const [userOrders, setUserOrders] = useState<orderI[] | null>(null);

  async function getUserOrder() {
    const response = await fetch("api/get-my-orders");
    const data: orderI[] = await response.json();
    setUserOrders(data);
  }

  useEffect(() => {
    getUserOrder();
  }, []);

  // ---------- Loading ----------
  if (userOrders === null) {
    return <Loading />;
  }

  // ---------- No Orders ----------
  if (userOrders.length === 0) {
    return (
      <div className="container px-6 py-5 mx-auto flex flex-col justify-center items-center h-[75vh] space-y-4 text-center">
        <p className="text-2xl font-bold">You have no previous orders</p>
        <p className="text-muted-foreground max-w-md">
          We have thousands of items available across our wide range of sellers.
          Start ordering today!
        </p>
       <Link href={'/products'}> <Button className="cursor-pointer">Continue Shopping</Button></Link>
      </div>
    );
  }

  // ---------- Orders List ----------
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="font-bold text-4xl tracking-tight mb-8">All Orders</h1>

      <div className="grid gap-6">
        {userOrders?.map((order, index) => (
          <Card key={order._id} className="border shadow-sm">
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">
                  Order #{index + 1}
                </CardTitle>

                <Badge variant={order.isPaid ? "default" : "secondary"}>
                  {order.isPaid ? "Paid" : "Not paid"}
                </Badge>
              </div>

              <CardDescription>
                Order Date:
                {new Date(order.createdAt).toLocaleString("en-GB", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </CardDescription>
              <CardDescription>
                Payment Method: {order.paymentMethodType}
              </CardDescription>

              <CardDescription>
                Delivered:
                <span className="text-[#de9617]">
                  {order.isDelivered ? "Yes" : "NO"}
                </span>
              </CardDescription>

              <p className="text-lg font-medium mt-2">
                Total:
                <span className="font-bold ml-1 text-[#4a5565]">
                  {order.totalOrderPrice}
                </span>
              </p>

              <div className="mt-4">
                <CardTitle className="text-lg">Shipping Address</CardTitle>
                <CardDescription>
                  {order.shippingAddress.details} - {order.shippingAddress.city}
                </CardDescription>
                <CardDescription>
                  Phone:{order.shippingAddress.phone}
                </CardDescription>
              </div>

              <Dialog>
                <form>
                  <DialogTrigger asChild>
                    <Button className="mt-4 w-fit"> View Order Items</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>order items</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div className="grid gap-4">
                        {order.cartItems.map((item) => (
                          <div
                            key={item._id}
                            className="flex items-center gap-3 border p-2 rounded"
                          >
                            <img
                              src={item.product.imageCover}
                              alt={item.product.title}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                              <p>Qty: {item.count}</p>
                              <p>Price: {item.price} EGP</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </form>
              </Dialog>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
