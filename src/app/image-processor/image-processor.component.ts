import { Component, Injectable } from '@angular/core';
import { FileHandle } from '../_model/file-handle.module';
import { Product } from '../_model/product.model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn:"root",
})
export class ImageProcessorComponent {

  constructor(private sanitizer: DomSanitizer){}

  public createImage(product: Product) { //processes all images associated with the product
    const images: any[]=product.productImages; //takes all the images associated to that product
    const imagesToFile: FileHandle[]=[]; //FileHandle is the interface defined for image files
    for(let i=0; i<images.length; i++) { //takes all associated images 1 by 1
      const image=images[i];
      const imageBlob=this.dataURItoBlob(image.picture, image.type);
      const imageFile=new File([imageBlob], image.name, {type: image.type});//create the file from the blob
      const finalHandle: FileHandle={
        name:image.name,
        pic: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))};
      imagesToFile.push(finalHandle);
    }
    product.productImages=imagesToFile;
      return product;
  }

  public dataURItoBlob(bytes: any, imageType: any) { //takes the bytes of the image file and convert them into a blob
    const byteString=window.atob(bytes);
    const buffer=new ArrayBuffer(byteString.length);
    const intArray=new Uint8Array(buffer);
    for(let i=0; i<byteString.length; i++) { //accesses every single byte and store it in the array
      intArray[i]=byteString.charCodeAt(i);
    }
    const blob=new Blob([intArray], {type: imageType});
    return blob;
  }
}
