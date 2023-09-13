import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ResponseDashboard } from 'src/app/Models/ResponseDashboard';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private router : Router, private auth : AuthService){
    if(this.auth.decodedToken().role == "ADMIN"){
        this.router.navigate(['/dasboard_admin']);
    }
    if(this.auth.decodedToken().role == "PARTNER"){
      this.router.navigate(['/dasboard_partner']);
  }
  }
  ngOnInit():void {
    
  }

  
}
