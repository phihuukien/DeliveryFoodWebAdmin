import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  ordersAll: any;
  fromDate: string = '';
  toDate: string = '';
  order_status: number = 0;
  searchString: string = '';
  sort_orderBy: string = '';
  sort_order: string = '';
  total_pages: number = 0;
  page: number = 1;
  constructor(private orderService: OrderService, private router: Router) {}
  ngOnInit(): void {
    this.getOrdersAll(
      this.searchString,
      this.page,
      this.sort_orderBy,
      this.sort_order,
      this.fromDate,
      this.toDate,
      this.order_status
    );
  }
  deleteOrder(id:string) {
    this.orderService.deleteOrder(id).subscribe({
      next: ((response: any) => {
        this.getOrdersAll(this.searchString,this.page,this.sort_orderBy,this.sort_order,this.fromDate,this.toDate,this.order_status);
        
      })
    })
  }
  getOrdersAll(searchString:string,
               page:number,
               sort_orderBy:string,
               sort_order:string,
               fromDate:string,
               toDate:string,
               order_status:number
               ){
    this.orderService.getOrdersAll(searchString,page,sort_orderBy,sort_order,fromDate,toDate,order_status).subscribe({
      next:((response: any)=>{
        console.log(response)
        if(response.status){

          this.ordersAll = response.data;
           this.total_pages = response.total_Page;
           this.page = response.page;
           this.sort_orderBy = response.sort_orderBy;
           this.sort_order = response.sort_order;
           this.fromDate = fromDate;
           this.toDate = toDate;
           this.order_status = order_status;
         }
       }),
       error:( error =>{
        console.log(error)
        // this.location.back();
        //  if(error.status){
        //  this.router.navigate(['/not_found'])
        //  }
       })
    })
  }
}
