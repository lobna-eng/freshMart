import { productI } from "./product"

export interface getwishlistI {
  status: string
  count: number
  data: productI[]
}


export interface wishlistI {
  status: string;
  message: string;
  data: string[];
}