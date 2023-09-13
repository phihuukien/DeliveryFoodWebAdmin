import { Component, OnInit } from '@angular/core';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import { GlobalVariable } from 'src/apiGlobal';
import { AuthService } from 'src/app/services/authentication/auth.service';



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
  constructor(private authService: AuthService, private cookie:CookieService) { }

  ngOnInit(): void {
    this.role = this.authService.decodedToken().role
    this.username = this.authService.decodedToken().name
    this.restaurantName = this.cookie.get("restaurantname")
  
    this.img = this.cookie.get("img")
  }

}
