import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ResponseDashboard } from 'src/app/Models/ResponseDashboard';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { OrderService } from 'src/app/services/order/order.service';
import { SignalRService } from 'src/app/services/signalR/signal-r.service';

@Component({
  selector: 'app-dashboard-partner',
  templateUrl: './dashboard-partner.component.html',
  styleUrls: ['./dashboard-partner.component.css']
})
export class DashboardPartnerComponent {
  responseDashboard: ResponseDashboard = new ResponseDashboard();
  orderPending: any;
  orderWaiting: any;
  reason: any
  restaurantId: string = "";
  public order: any;
  public orderDetail: any;
  close:boolean = true;
  constructor(private router: Router,
    private activeRoute: ActivatedRoute,
    private dashboardService: DashboardService,
    private cookieService: CookieService, private signalRService: SignalRService, private orderService: OrderService) {
      
    this.signalRService.startConnection();
    this.signalRService.onMessageReceived((message) => {
      this.getOrderToday();
      this.getOrderPending();
      this.getOrderWaiting();
    });

  }
  ngOnInit(): void {
    this.dashboardService.setShowSilde(false);
    this.restaurantId = this.cookieService.get('restaurantId');
    this.getOrderToday();
    this.getOrderPending();
    this.getOrderWaiting();
  }
  closeModel(){
    console.log("kkkk")
    this.close=false;
  }
  orderId: string = "";
  setId(id: string) {
    this.orderId = id;
  }
  cancelOrder() {
    let order = {
      OrderId: this.orderId,
      Reason: this.reason
    }
    this.orderService.cancelOrder(order).subscribe({
      next: ((response: any) => {
        console.log("ok");
      })
    })
  }
  
  getOrderToday() {
    this.dashboardService.getOrderToday(this.restaurantId).subscribe({
      next: ((response: any) => {
        this.responseDashboard = response
        console.log(this.responseDashboard);
        
      })
    })
  }
  getOrderPending() {
    this.dashboardService.getOrderPending(this.restaurantId).subscribe({
      next: ((response: any) => {
        this.orderPending = response.data
      })
    })
  }
  getOrderWaiting() {
    this.dashboardService.getOrderWaiting(this.restaurantId).subscribe({
      next: ((response: any) => {
        this.orderWaiting = response.data
        console.log(response.data)
      })
    })
  }
  gettingOrder(status: number, orderId: string) {
    this.dashboardService.gettingOrder(this.restaurantId, status, orderId).subscribe({
      next: ((response: any) => {
        this.getOrderWaiting();
        this.getOrderPending();
      })
    })
  }
  getOrderById(id: string) {
    this.orderService.getOrderDetail(id).subscribe({
      next: ((response: any) => {
        console.log(response)
        console.log(response.data.note)
        console.log(response.dataOrderDetail)
        if (response.status) {
          this.order = response.data;
          this.orderDetail = response.dataOrderDetail
        }
      }),
      error: (error => {
        console.log(error)
        // this.location.back();
        //  if(error.status){
        //  this.router.navigate(['/not_found'])
        //  }
      })
    })
  }
  print(areaID: string) {
    const printContent: string = document.getElementById(areaID)?.innerHTML ?? '';
    const originalContent: string = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;

  }
}
