import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  PATH_START="http://localhost:8080" //starting endpoint of back-end server

  constructor(private HttpClient: HttpClient) { }

  public addProduct(product: FormData) { //addProduct method redirects to /addProduct endpoint of back-end server
    return this.HttpClient.post<Product>(this.PATH_START+"/addProduct", product);
  }

  public updateProduct(productId: Number, product: FormData) { //updateProduct method redirects to /updateProduct endpoint of back-end server
    return this.HttpClient.put<Product>(this.PATH_START+"/updateProduct?productId="+productId, product);
  }

  public getAllProducts() { //getAllProducts method redirects to /getAllProducts endpoint of back-end server
    return this.HttpClient.get<Product[]>(this.PATH_START+"/getAllProducts");
  }

  public getProductDetailsNV(productName: String, productVendor: String) { //getProductDetailsNV method redirects to /getProductDetailsNV endpoint of back-end server
    return this.HttpClient.get<Product>(this.PATH_START+"/getProductDetailsNV?productName="+productName+"&productVendor="+productVendor);
  }

  public getProductDetails(productId: Number) { //getProductDetails method redirects to /getProductDetails endpoint of back-end server
    return this.HttpClient.get<Product>(this.PATH_START+"/getProductDetails?productId="+productId);
  }

  public deleteProduct(productName: String, productVendor: String) { //remoreProduct method redirects to /remoteProductNV endpoint of back-end server
    return this.HttpClient.delete(this.PATH_START+"/deleteProductNV?productName="+productName+"&productVendor="+productVendor);
  }
}
