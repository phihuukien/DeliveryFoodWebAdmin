import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-list-restaurants',
  templateUrl: './list-restaurants.component.html',
  styleUrls: ['./list-restaurants.component.css']
})
export class ListRestaurantsComponent implements OnInit {

  restaurants: any[] = [];
  textsearch: any = '';
  page: any = 1;
  limit: number = 3;
  totalPages: number=1;
  username:any
  constructor(private http:HttpClient,private cookieService :CookieService) {
    this.username = this.cookieService.get('username');
  }
  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this.http
    .get(
      'http://localhost:7090/api/admin/restaurants/PagingRestaurants/' +
      this.username +
      '?page=' +
      this.page +
      '&limit=' +
      this.limit +
      '&textsearch=' +
      this.textsearch
    )
    .subscribe((response: any) => {
      if (response.status) {
        this.restaurants = response.data;
        this.totalPages = response.total_Page;
        console.log(this.restaurants);
      }
    });
  }
  search() {
    this.getAll();
  }
  getRestaurantsAll(textsearch:any,page:number) {
    this.http
      .get(
        'http://localhost:7090/api/admin/restaurants/PagingRestaurants/' +
        this.username +
        '?page=' +
        page +
        '&limit=' +
        this.limit +
        '&textsearch=' +
        textsearch
      )
      .subscribe((response: any) => {
        if (response.status) {
          this.restaurants = response.data;
          console.log(this.restaurants);
        }
      });
  }
}
