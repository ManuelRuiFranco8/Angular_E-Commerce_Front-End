import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../_model/file-handle.module';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { ImageProcessorComponent } from '../image-processor/image-processor.component';
import { ProductResolverService } from '../product-resolver.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [ProductResolverService, ImageProcessorComponent]
})
export class AddProductComponent implements OnInit {

  public associatedImages: string="";

  product: Product={
    id:null,
    name:"",
    vendor:"",
    description:"",
    price:0.0,
    quantity:0,
    productImages:[]
  }

  constructor(private serv: ProductService,
              private sanitizer: DomSanitizer,
              private resolver: ProductResolverService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {}

  addProduct(productForm: NgForm) { //uploads the product specified in the form in the database
    const productFormData=this.prepareFormData(this.product);
    this.serv.addProduct(productFormData).subscribe(
      (response: Product)=>{
        console.log(response);
        productForm.reset();
        this.product.productImages=[];
        this.associatedImages="";
        const customAlert = (message: string): void => {
          alert(message);
        };
        customAlert('Product successfully added to the database');
        //this.showCustomMessage("Product successfully added from the database");
      },
      (err)=>{
        console.log(err);
        alert(err);
      }
    );
  }

  showCustomMessage(message: string): void {
    const dialog = document.getElementById("custom-dialog");
    const messageElement = document.getElementById("custom-message");

    if(messageElement!= null && dialog!=null) {
      messageElement.innerText = message;
      dialog.style.display = "block";
    }
  }

  clearForm(productForm: NgForm) { //clears the current form
    productForm.reset();
    this.product.productImages=[];
    this.associatedImages="";
  }

  clearImages() {
    this.product.productImages=[];
    this.associatedImages="";
  }

  onFileSelected(event: any) {
    if(event.target.files) {
      const file=event.target.files[0];
      const FileHandle: FileHandle={name: file.name, pic: file, url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))}
      this.product.productImages.push(FileHandle);
      this.associatedImages+=" - "+file.name;
    }

  }

  prepareFormData(product: Product): FormData {
    const formData=new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], {type: 'application/json'}));
    for(var i=0; i<product.productImages.length; i++) {
      formData.append('imageFile', product.productImages[i].pic,
                      product.productImages[i].pic.name);
    }
    return formData;
  }

  imagesAssociated(): boolean {
    return this.product.productImages.length===0;
  }
}
