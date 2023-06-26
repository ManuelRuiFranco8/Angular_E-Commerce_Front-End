import { Component, NgModule, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CdkColumnDef } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';
import { CompactProduct } from '../_model/CompactProduct.model';


@Component({
  selector: 'app-show-all-products',
  templateUrl: './show-all-products.component.html',
  styleUrls: ['./show-all-products.component.css'],
  providers: [CdkColumnDef]
})

export class ShowAllProductsComponent implements OnInit {

  products: Product[]=[];

  constructor(private serv: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }


  public getAllProducts() {
    this.serv.getAllProducts().subscribe(
      (response: Product[])=>{
        this.products=response; //fetches a list of all products from the database
        console.log(this.products);
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
}
