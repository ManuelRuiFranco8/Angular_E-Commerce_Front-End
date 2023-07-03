import { ProductQuantity } from "./ProductQuantity.model";

export interface OrderRequest {
  productsQuantityList: ProductQuantity[];
  contact: string;
  shipment: string;
}
