import { Injectable, NgModule } from '@angular/core';
import { Product } from './_model/product.model';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { ProductService } from './_services/product.service';
import { ImageProcessorComponent } from './image-processor/image-processor.component';

@Injectable({
  providedIn: 'root'
})

@NgModule({
  providers: [ImageProcessorComponent],
})
export class OrderProductsResolverService implements Resolve<Product[]>{

  emptyProductList: Product[]=[];

  constructor(private productServ: ProductService,
              private imageServ: ImageProcessorComponent) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] | Observable<Product[]> | Promise<Product[]> {
    const id=route.paramMap.get("productId");
    const singleProduct=route.paramMap.get("singleProduct");
    console.log(id);
    console.log(singleProduct);
    if(id && singleProduct) {
      if(singleProduct=="true") {
        console.log(this.productServ.getProductsForOrder(true, parseInt(id))
        .pipe(map((x: Product[], i)=>x.map((product: Product)=>this.imageServ.createImage(product)))));
        return this.productServ.getProductsForOrder(true, parseInt(id))
        .pipe(map((x: Product[], i)=>x.map((product: Product)=>this.imageServ.createImage(product))));
      } else {
        return this.productServ.getProductsForOrder(false, parseInt(id))
        .pipe(map((x: Product[], i)=>x.map((product: Product)=>this.imageServ.createImage(product))));
      }
    } else {
      return this.emptyProductList;
    }
  }
}
