import { Product } from "./product.model";

export interface OrderDetails {
  id: number;
  buyer: string;
  shipmentAddress: string;
  contact: string;
  status: string;
  amount: number;
  date: string;
  shipmentDate: string;
  boughtProduct: Product;
  buyingUser: any;
}
