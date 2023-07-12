import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ProductService } from '../_services/product.service';
import { ImageProcessorComponent } from '../image-processor/image-processor.component';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { ProductResolverService } from '../product-resolver.service';
import { Router } from '@angular/router';
import { Page } from 'ngx-pagination';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ImageProcessorComponent, ProductResolverService]
})

export class AdminComponent implements OnInit {

  public message: string | undefined;
  public productDetails: Product[]=[];
  public pageNumber: number=0;
  public showNext: boolean=false;
  public showPrevious: boolean=false;
  public noProducts: boolean=false;
  public searchKey: string="";
  public message2: string="";

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
      (error)=>{
        console.log(error);}
    );
  }

  public getAllProducts(searchKey: string="") {
    this.servProd.getAllProducts(this.pageNumber, searchKey)
    .pipe(map((page: any)=>page.content.map((product: Product)=>this.imgProc.createImage(product)) as Product[]))
    .subscribe(
      (response: Product[])=>{
        if(this.pageNumber>0) {
          this.showPrevious=true; //show the previous page button when we are not on the first page
        } else {
          this.showPrevious=false; //do not show the previous page button when we are on the first page
        }
        if(response.length==8) { //there are still products to show
          this.showNext=true; //show the next page button
          this.productDetails=response; //fetches a list of all products from the database
          this.noProducts=false; //do not show the no product
          console.log(this.productDetails);
        } else if(response.length==0) {
          this.showNext=false; //do not show the next page button
          this.noProducts=true; //show the no product message
          if(this.searchKey!="" && this.pageNumber==0) {
            this.message2="No product corresponding to search criteria";
          } else {
            this.message2="There are no more products!";
          }
        } else { //there are no pages to show
          this.noProducts=false; //do not show the no product
          this.showNext=false; //do not show the next page button
          this.productDetails=response; //fetches a list of all products from the database
          console.log(this.productDetails);
        }
      }, (error: HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }

  hasImage(p: Product): boolean {
    return p.productImages.length>0;
  }

  showProductDetails(productId: Number | null) {
    console.log(productId);
    this.router.navigate(['/viewProduct', {productId: productId}]);
  }

  public loadNextPage() {
    this.pageNumber=this.pageNumber+1; //advances to next page
    this.getAllProducts(this.searchKey); //shows next page
  }

  public loadPreviousPage() {
    this.pageNumber=this.pageNumber-1; //goes back to previous page
    this.getAllProducts(this.searchKey); //shows previous page
  }

  searchByKeyWord(searchKey: string) {
    console.log(searchKey);
    console.log(JSON.parse(JSON.stringify(searchKey)).searchKey);
    this.searchKey=JSON.parse(JSON.stringify(searchKey)).searchKey;
    this.pageNumber=0;
    this.productDetails=[];
    this.getAllProducts(JSON.parse(JSON.stringify(searchKey)).searchKey);
  }
}
