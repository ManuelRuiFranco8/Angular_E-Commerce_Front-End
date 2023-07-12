import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { OrderDetails } from '../_model/OrderDetails.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
  providers: [DatePipe]
})
export class UserOrdersComponent implements OnInit {

  myOrders: OrderDetails[]=[];
  ordersPresent: boolean=false;
  status: string='ALL';

  constructor(private productServ: ProductService,
              private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.getOrdersList(this.status);
  }

  getOrdersList(stat: string) {
    this.productServ.getOrdersList(stat).subscribe(
      (resp: OrderDetails[])=>{
        console.log(resp);
        this.myOrders=resp;
        if(this.myOrders.length>0) {
          this.ordersPresent=true;
        }
        console.log(this.myOrders);
      }, (err)=>{
        console.log(err);
        alert("Error, impossible to fetch order list");
      });
  }

  formatDate(date: any) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}
