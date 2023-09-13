import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ResponseDashboard } from 'src/app/Models/ResponseDashboard';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard-partner',
  templateUrl: './dashboard-partner.component.html',
  styleUrls: ['./dashboard-partner.component.css']
})
export class DashboardPartnerComponent {
  responseDashboard: ResponseDashboard = new ResponseDashboard();
  restaurantId: string = "";
  constructor(private router: Router,
    private activeRoute: ActivatedRoute,
    private dashboardService: DashboardService,
    private cookieService: CookieService) {

  }
  ngOnInit(): void {
    this.restaurantId = this.cookieService.get('restaurantId');
    this.getOrderToday();
  }
  getOrderToday() {
    this.dashboardService.getOrderToday(this.restaurantId).subscribe({
      next: ((response: any) => {
        this.responseDashboard = response
        console.log(this.responseDashboard)
      })
    })

  }
}
