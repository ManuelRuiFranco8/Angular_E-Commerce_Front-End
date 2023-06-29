import { Component, NgModule, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CdkColumnDef } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';
import { CompactProduct } from '../_model/CompactProduct.model';
import { map } from 'rxjs';


@Component({
  selector: 'app-show-all-products',
  templateUrl: './show-all-products.component.html',
  styleUrls: ['./show-all-products.component.css'],
  providers: [CdkColumnDef]
})

export class ShowAllProductsComponent implements OnInit {

  products: Product[]=[];
  public pageNumber: number=0;
  public showNext: boolean=false;
  public showPrevious: boolean=false;
  public noProducts: boolean=false;
  public searchKey: string="";
  public message: string="";

  constructor(private serv: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }


  public getAllProducts(searchKey: string="") {
    this.serv.getAllProducts(this.pageNumber, searchKey)
    .pipe(map((page: any)=>page.content as Product[]))
    .subscribe(
      (response: Product[])=>{
        if(this.pageNumber>0) {
          this.showPrevious=true; //show the previous page button when we are not on the first page
        } else {
          this.showPrevious=false; //do not show the previous page button when we are on the first page
        }
        if(response.length==8) { //there are still products to show
          this.showNext=true; //show the next page button
          this.products=response; //fetches a list of all products from the database
          this.noProducts=false; //do not show the no product
          console.log(this.products);
        } else if(response.length==0) {
          this.showNext=false; //do not show the next page button
          this.noProducts=true; //show the no product message
          if(this.searchKey!="" && this.pageNumber==0) {
            this.message="No product corresponding to search criteria";
          } else {
            this.message="There are no more products!";
          }
        } else { //there are no pages to show
          this.noProducts=false; //do not show the no product
          this.showNext=false; //do not show the next page button
          this.products=response; //fetches a list of all products from the database
          console.log(this.products);
        }
      }, (error: HttpErrorResponse)=>{console.log(error);}
    );
  }

  deleteProduct(productName: String, productVendor: String) {
    this.serv.deleteProduct(productName, productVendor).subscribe(
      (response)=>{
        console.log(response);
        alert('Product successfully deleted from the database');
        this.getAllProducts(); //continues to show the table after deleting a product
      }, (error: HttpErrorResponse)=>{
        console.log(error);
        alert('Impossible to delete product from the database');
      }
    );
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
    this.getAllProducts(JSON.parse(JSON.stringify(searchKey)).searchKey);
  }
}
