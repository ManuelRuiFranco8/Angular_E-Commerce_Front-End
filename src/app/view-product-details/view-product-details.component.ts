import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductResolverService } from '../product-resolver.service';
import { UserAuthenticationService } from '../_services/user-authentication.service';
import { OrderProductsResolverService } from '../order-products-resolver.service';

@Component({
  selector: 'app-view-product-details',
  templateUrl: './view-product-details.component.html',
  styleUrls: ['./view-product-details.component.css'],
  providers: [ProductResolverService, OrderProductsResolverService]
})
export class ViewProductDetailsComponent implements OnInit {

  product: Product={
    id:null,
    name:"",
    vendor:"",
    description:"",
    price:0.0,
    quantity:0,
    productImages:[]
  };
  selectedIndex: number | null=0;

  constructor(private activatedRoute: ActivatedRoute,
              private userAuth: UserAuthenticationService,
              private router: Router) {}

  ngOnInit(): void {
    this.product=this.activatedRoute.snapshot.data['product'];
    console.log(this.product);
  }

  changeIndex(index: number | null) {
    this.selectedIndex=index;
  }

  hasImage(p: Product): boolean {
    return p.productImages.length>0;
  }

  public isAdmin() { //returns true if the current user in an administrator
    return this.userAuth.isAdmin();
  }

  public isUser() { //returns true if the current user in NOT an administrator
    return this.userAuth.isUser();
  }

  editProductDetails(productId: Number | null) {
    console.log(productId);
    if(productId!=null) {
      console.log(productId);
      this.router.navigate(['/updateProduct', {productId: productId}]);
    }
  }

  buyProduct(productId: Number | null) {
    console.log(productId);
    if(productId!=null) {
      console.log(productId);
      this.router.navigate(['/buyProduct', {singleProduct: true, productId: productId}]);
    }
  }
}
