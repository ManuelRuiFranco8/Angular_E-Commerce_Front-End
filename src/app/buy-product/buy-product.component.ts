import { Component, OnInit } from '@angular/core';
import { OrderProductsResolverService } from '../order-products-resolver.service';
import { Product } from '../_model/product.model';
import { OrderRequest } from '../_model/OrderRequest.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css'],
  providers: [OrderProductsResolverService]
})
export class BuyProductComponent implements OnInit {

  orderProducts: Product[]=[]; //list of products associated to the order

  request: OrderRequest= {
    productsQuantityList: [],
    contact:"EMAIL"
  }

  constructor(private activatedRoute: ActivatedRoute,
              private productServ: ProductService,
              private router: Router) {}


  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any) => {
      console.log(data);
      console.log(data.productOrder);
      this.orderProducts = data.productOrder;
      console.log(this.orderProducts);
      this.orderProducts.forEach((x) =>this.request.productsQuantityList.push({ productId: x.id, quantity: 1 }));
      console.log(this.request);});
  }

  assignContactMail() {
    this.request.contact="EMAIL";
    console.log(this.request);
  }

  assignContactTelephone() {
    this.request.contact="TELEPHONE";
    console.log(this.request);
  }

  public placeOrder() {
    this.productServ.placeOrder(this.request).subscribe(
      (resp)=> {
        console.log(resp);
        alert("Order successfully placed");
        this.router.navigate(['/user']);
      }, (err: HttpErrorResponse) => {
        console.log(err.status)
        console.log(err);
        alert("Product's stock unsufficient to satisfy the order");
      });
  }

  setProductQuantity(productId: Number | null, quantityForm: NgForm) {
    const product=this.request.productsQuantityList.filter(
      (productQuantity)=>productQuantity.productId===productId);
    let quantity=parseInt(JSON.parse(JSON.stringify(quantityForm.value)).quantity)
    if(quantity && quantity>0) {
      product[0].quantity=quantity;
      console.log(this.request);
    } else {
      product[0].quantity=1;
      console.log(this.request);
    }
  }

  computePartial(productId: Number | null, productPrice: number) {
    const product=this.request.productsQuantityList.filter(
      (productQuantity)=>productQuantity.productId===productId);
    return product[0].quantity*productPrice;
  }

  computeTotal() {
    let total=0;
    this.request.productsQuantityList.forEach((productQuantity)=>{
        const price=this.orderProducts.filter(product=>product.id===productQuantity.productId)[0].price;
        total=total+(price*productQuantity.quantity);
      }
    );
    return total;
  }
}
