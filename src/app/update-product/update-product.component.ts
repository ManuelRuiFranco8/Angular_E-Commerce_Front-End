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
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
  providers: [ProductResolverService, ImageProcessorComponent]
})
export class UpdateProductComponent {
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
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.product=this.route.snapshot.data['product'];
    if(this.product && this.product.id) {
      if(this.product.productImages.length>0) {
        for(var i=0; i<this.product.productImages.length; i++) {
          this.associatedImages+=" - "+this.product.productImages[i].name;
        }
      console.log(this.associatedImages);
      }
    }
  }

  updateProductDetails(productForm: NgForm) { //uploads the product specified in the form in the database
    if(this.product.id!=null) {
      const productFormData=this.prepareFormData(this.product);
      console.log(productFormData);
      console.log(this.product.id);
      this.serv.updateProduct(this.product.id, productFormData).subscribe(
        (response: Product)=>{
          console.log(response);
          productForm.reset();
          this.product.productImages=[];
          this.associatedImages="";
          const customAlert=(message: string): void => {
            alert(message);
          };
          customAlert('Product details successfully updated');
          this.router.navigate(['/viewProduct', {productId: this.product.id}]);
        },
        (err)=>{alert('Incorrect Data. Impossible to updated product details');}
      );
    }
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
