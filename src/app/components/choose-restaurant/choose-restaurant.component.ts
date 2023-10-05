import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { RestaurantsService } from 'src/app/services/restaurants/restaurants.service';
import {GlobalVariable} from 'src/apiGlobal'
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-restaurant',
  templateUrl: './choose-restaurant.component.html',
  styleUrls: ['./choose-restaurant.component.css']
})
export class ChooseRestaurantComponent implements OnInit {

  imagesApiUrl = GlobalVariable.IMAGES_API_URL
  restaurants: any;
  constructor(private restaurantService: RestaurantsService, 
    private auth: AuthService,
    private cookieService: CookieService,
    private router : Router) {

  }
  ngOnInit(): void {

    this.getRestaurantsByUsername()

  }

  getRestaurantsByUsername() {
    this.restaurantService.getRestaurantsByUsername(this.auth.decodedToken().name).subscribe((response: any) => {
      if (response.status) {
        this.restaurants = response.data
      }
    })
  }
 

  activeRestaurant(name: string, id: string, img :string, username :string) {
    const current = document.getElementsByClassName("active");
    if (current.length > 0) {
      (current[0] as HTMLElement).className = (current[0] as HTMLElement).className.replace(" active", "");
    }
    const btns = document.getElementsByClassName(name);
    btns[0].className += " active"
    this.cookieService.set('restaurantId', id);
    this.cookieService.set('restaurantname', name);
    this.cookieService.set('img', img);
    this.cookieService.set('username', username);
  }
}
