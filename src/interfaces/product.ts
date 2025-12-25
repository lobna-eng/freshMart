import { BrandI } from "./brand"
import { categoryI } from "./category"
import { subCategoryI } from "./subCategory"

export interface productI {
  sold: number
  images: string[]
  subcategory: subCategoryI[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: categoryI
  brand: BrandI
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
}




