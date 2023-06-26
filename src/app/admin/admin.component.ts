import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ProductService } from '../_services/product.service';
import { ImageProcessorComponent } from '../image-processor/image-processor.component';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { ProductResolverService } from '../product-resolver.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ImageProcessorComponent, ProductResolverService]
})

export class AdminComponent implements OnInit {

  public message: string | undefined;
  public productDetails: Product[]=[];

  constructor(private serv: UserService,
              private servProd: ProductService,
              private imgProc: ImageProcessorComponent,
              private router: Router) {}

  ngOnInit(): void {
    this.forAdmin();
    this.getAllProducts();
  }

  forAdmin() { //forAdmin method redirects to /forAdmin endpoint of back-end server
    this.serv.forAdmin().subscribe(
      (response)=> {
        console.log(response);
        this.message=response; //assigns to the message to be displayed the response from the /forAdmin endpoint
      },
      (error)=>{console.log(error);}
    );
  }

  public getAllProducts() {
    this.servProd.getAllProducts()
    .pipe(map((x: Product[], i)=>x.map((product: Product)=>this.imgProc.createImage(product)) as Product[]))
    .subscribe(
      (response: Product[])=>{
        this.productDetails=response; //fetches a list of all products from the database
        console.log(this.productDetails);
      }, (error: HttpErrorResponse)=>{console.log(error);}
    );
  }

  hasImage(p: Product): boolean {
    return p.productImages.length>0;
  }

  showProductDetails(productId: Number | null) {
    console.log(productId);
    this.router.navigate(['/viewProduct', {productId: productId}]);
  }
}
