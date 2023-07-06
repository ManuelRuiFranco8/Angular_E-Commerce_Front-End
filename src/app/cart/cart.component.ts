import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductResolverService } from '../product-resolver.service';
import { OrderProductsResolverService } from '../order-products-resolver.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [ProductResolverService, OrderProductsResolverService]
})
export class CartComponent implements OnInit {

 cart: any[]=[];
 productsPresent: boolean=false;

 constructor(private serv: ProductService,
             private router: Router) {}

  ngOnInit(): void {
    this.getCartProducts();
  }

  public getCartProducts() {
    this.serv.getCartDetails().subscribe(
      (response: any)=>{
       this.cart=response; //fetches a list of all products in the current user's cart
       console.log(this.cart);
       if(this.cart.length>0) {
        this.productsPresent=true;
       } else {
        this.productsPresent=false;
       }
      }, (error: HttpErrorResponse)=>{console.log(error);}
    );
  }

  showProductDetails(productId: Number | null) {
    console.log(productId);
    this.router.navigate(['/viewProduct', {productId: productId}]);
  }

  checkout() {
    this.router.navigate(['/buyProduct', {singleProduct: false, productId:0}]);
    /*
    this.serv.getProductsForOrder(false, 0).subscribe(
      (response)=> {
        console.log(response);
      }, (error: any) => {
        console.log(error);
      });
    */
  }
}
