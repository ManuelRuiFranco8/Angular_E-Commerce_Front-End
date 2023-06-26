import { FileHandle } from "./file-handle.module";

export interface Product {
  id: null|Number, //union type
  name: string,
  vendor: string,
  description: string,
  price: number,
  quantity: number,
  productImages: FileHandle[]
}
