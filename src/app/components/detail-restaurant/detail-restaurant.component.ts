import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GlobalVariable } from 'src/apiGlobal';
import { Food } from 'src/app/Models/Food';

@Component({
  selector: 'app-detail-restaurant',
  templateUrl: './detail-restaurant.component.html',
  styleUrls: ['./detail-restaurant.component.css']
})
export class DetailRestaurantComponent implements OnInit {
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cookieService: CookieService,
    private http: HttpClient
  ) {
    this.restaurantId = this.cookieService.get('restaurantId');
  }

  restaurantId:any;
  res:any
  imagesApiUrl = GlobalVariable.IMAGES_API_URL;
  ngOnInit(): void {
    this.getOne();
  }
  getOne(){
    this.http
    .get(
      'http://localhost:7090/api/restaurants/getResById/' +
        this.restaurantId
    )
    .subscribe((x) => {
      this.res = x;
      this.res = this.res.data;
    });
  }
}


