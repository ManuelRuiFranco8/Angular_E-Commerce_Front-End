import { Component, Injectable, NgModule } from '@angular/core';
import { ProductService } from './_services/product.service';
import { ImageProcessorComponent } from './image-processor/image-processor.component';
import { Product } from './_model/product.model';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn:"root",
})

@NgModule({
  providers: [ImageProcessorComponent],
  // other module configuration...
})
export class ProductResolverService implements Resolve<Product> {
  constructor(private serv: ProductService,
              private imageProcessor: ImageProcessorComponent) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const id=route.paramMap.get("productId"); //check if right
    console.log(id);
    if(id) {
      return this.serv.getProductDetails(parseInt(id))
             .pipe(map(p=>this.imageProcessor.createImage(p)));
    } else {
      return of(this.getVoidProduct());
    }
  }

  resolveNV(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const name=route.paramMap.get("productName"); //check if right
    const vendor=route.paramMap.get("productVendor"); //check if right
    if(name && vendor) {
      return this.serv.getProductDetailsNV(name, vendor)
             .pipe(map(p=>this.imageProcessor.createImage(p)));
    } else {
      return of(this.getVoidProduct());
    }
  }

  getVoidProduct() {
    return {
      id:null,
      name:"",
      vendor:"",
      description:"",
      price:0.0,
      quantity:0,
      productImages:[]};
  }
}
