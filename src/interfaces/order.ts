import { BrandI } from "./brand"
import { item } from "./cart"
import { categoryI } from "./category"
import { productI } from "./product"
import { subCategoryI } from "./subCategory"
import { UserI } from "./user"


export interface orderI {
  shippingAddress: ShippingAddress
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  _id: string
  user: UserI
  cartItems: item[]
  createdAt: string
  updatedAt: string
  id: number
  __v: number
  paidAt?: string
}

export interface ShippingAddress {
  details: string
  phone: string
  city: string
}



