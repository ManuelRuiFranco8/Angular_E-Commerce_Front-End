import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { StartComponent } from './start/start.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './_authorization/auth.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { ShowAllProductsComponent } from './show-all-products/show-all-products.component';
import { ViewProductDetailsComponent } from './view-product-details/view-product-details.component';
import { ProductResolverService } from './product-resolver.service';
import { ImageProcessorComponent } from './image-processor/image-processor.component';
import { UpdateProductComponent } from './update-product/update-product.component';

const routes: Routes = [ //frontend end-points
  {path:'', component:StartComponent}, //no token-access
  {path:'admin', component:AdminComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']}}, //token access only administrator
  {path:'user', component:UserComponent, canActivate:[AuthGuard], data:{roles:['USER']}}, //token access generic user
  {path:'login', component:LoginComponent}, //no token-access
  {path:'forbidden', component:ForbiddenComponent}, //no token-access
  {path:'addProduct', component:AddProductComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']}}, //token access only administrator
  {path:'updateProduct', component:UpdateProductComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']}, resolve: {product: ProductResolverService}},
  {path:'showAllProducts', component:ShowAllProductsComponent, canActivate:[AuthGuard], data:{roles:['ADMIN', 'USER']}}, //token access only administrator
  {path: "viewProduct", component: ViewProductDetailsComponent, resolve: {product: ProductResolverService}, data:{roles:['ADMIN', 'USER']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ProductResolverService, ImageProcessorComponent]
})
export class AppRoutingModule { }
