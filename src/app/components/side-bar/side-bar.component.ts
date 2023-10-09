import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import { GlobalVariable } from 'src/apiGlobal';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';



@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  role: string = '';
  username:string = "";
  restaurantName:string="";
  img:string="";
  imagesApiUrl = GlobalVariable.IMAGES_API_URL
  constructor(private authService: AuthService, private cookie:CookieService, private router: Router,private dasd : DashboardService) { }

  ngOnInit(): void {
    this.role = this.authService.decodedToken().role
    this.username = this.authService.decodedToken().name
    if( this.role == "PARTNER"){
      this.restaurantName = this.cookie.get("restaurantname")
      this.img = this.cookie.get("img")
    }
    
  }

  changeRestaurant(){
    this.cookie.delete('restaurantId');
    this.cookie.delete('img');
    this.cookie.delete('restaurantname');
    this.dasd.setShowSilde(true);
    this.router.navigate(['/choose_restaurant'])

  }

}
