import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GlobalVariable } from 'src/apiGlobal';
import { Food } from 'src/app/Models/Food';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css'],
})
export class FoodsComponent implements OnInit {
  restaurantId!: string;
  foods: Food[] = [];
  textsearch: any = '';
  page: any = 1;
  limit: number = 5;
  totalPages: number = 1;
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private http: HttpClient
  ) {
    this.restaurantId = this.cookieService.get('restaurantId');
  }
  imagesApiUrl = GlobalVariable.IMAGES_API_URL;
  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this.http
      .get(
        'http://localhost:7090/api/food/getAllFoods/' +
          this.restaurantId +
          '?page=' +
          this.page +
          '&limit=' +
          this.limit +
          '&textsearch=' +
          this.textsearch
      )
      .subscribe((response: any) => {
        if (response.status) {
          this.foods = response.data;
          this.totalPages = response.total_Page;
          console.log(this.foods);
        }
      });
  }
  search() {
    this.getAll();
  }
  getFoodsAll(textsearch: any, page: number) {
    this.http
      .get(
        'http://localhost:7090/api/food/getAllFoods/' +
          this.restaurantId +
          '?page=' +
          page +
          '&limit=' +
          this.limit +
          '&textsearch=' +
          textsearch
      )
      .subscribe((response: any) => {
        if (response.status) {
          this.foods = response.data;
          console.log(this.foods);
        }
      });
  }
  detail(id: any) {}

  delete(id: any) {
    this.http
      .delete('http://localhost:7090/api/food/deleteFood/' +id)
      .subscribe((response: any) => {
        if (response.status) {
          alert(response.message);
          this.getAll();
        }
      });
  }
}
