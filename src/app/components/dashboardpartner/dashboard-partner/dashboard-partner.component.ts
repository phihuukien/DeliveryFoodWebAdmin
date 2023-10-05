import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ResponseDashboard } from 'src/app/Models/ResponseDashboard';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { SignalRService } from 'src/app/services/signalR/signal-r.service';

@Component({
  selector: 'app-dashboard-partner',
  templateUrl: './dashboard-partner.component.html',
  styleUrls: ['./dashboard-partner.component.css']
})
export class DashboardPartnerComponent {
  responseDashboard: ResponseDashboard = new ResponseDashboard();
  orderPending:any;
  orderWaiting:any;
  restaurantId: string = "";
  constructor(private router: Router,
    private activeRoute: ActivatedRoute,
    private dashboardService: DashboardService,
    private cookieService: CookieService,private signalRService: SignalRService) {
      this.signalRService.startConnection();
      this.signalRService.onMessageReceived(( message) => {
        this.getOrderToday();
        this.getOrderPending();
        this.getOrderWaiting();
      });

  }
  ngOnInit(): void {
    this.restaurantId = this.cookieService.get('restaurantId');
    this.getOrderToday();
    this.getOrderPending();
    this.getOrderWaiting();
  }
  getOrderToday() {
    this.dashboardService.getOrderToday(this.restaurantId).subscribe({
      next: ((response: any) => {
        this.responseDashboard = response
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
  gettingOrder(status:number, orderId:string){
    this.dashboardService.gettingOrder(this.restaurantId,status,orderId).subscribe({
      next: ((response: any) => {
        this.getOrderWaiting();
        this.getOrderPending();
      })
    })
  }
}
