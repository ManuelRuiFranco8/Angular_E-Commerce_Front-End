import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_authorization/auth.guard';
import { AuthInterceptor } from './_authorization/auth.interceptor';
import { UserService } from './_services/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AddProductComponent } from './add-product/add-product.component';
import { ShowAllProductsComponent } from './show-all-products/show-all-products.component';
import {MatTableModule} from '@angular/material/table';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import { ImageProcessorComponent } from './image-processor/image-processor.component';
import { ShowImageComponent } from './show-image/show-image.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ViewProductDetailsComponent } from './view-product-details/view-product-details.component'
import { ProductResolverService } from './product-resolver.service';
import { UpdateProductComponent } from './update-product/update-product.component';
import { RegisterComponent } from './register/register.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { OrderProductsResolverService } from './order-products-resolver.service';
import { CartComponent } from './cart/cart.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    AddProductComponent,
    ShowAllProductsComponent,
    ShowImageComponent,
    ViewProductDetailsComponent,
    UpdateProductComponent,
    RegisterComponent,
    BuyProductComponent,
    CartComponent,
    UserOrdersComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule,
    MatSnackBarModule,
    MatButtonToggleModule
  ],
  providers: [
    AuthGuard, {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    UserService,
    ProductResolverService,
    ImageProcessorComponent,
    OrderProductsResolverService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
