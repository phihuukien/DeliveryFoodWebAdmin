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
  food:any ;
  message:any;
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
  
  isChecked(status: number) {
    if (status == 1) {
      return true;
    }else if (status ==2){
      return false;
    } else{
      return false;
    }
  }
  updateStatus(e:any,f:any){
   console.log(f);
    const formData = new FormData();
    formData.append('Id', f.id);
    formData.append('Name', f.name);
    formData.append('Price', f.price);
    formData.append('Ingredients', f.ingredients);
    formData.append('Description', f.description);
    formData.append('Category', f.category);
    formData.append('Image',f.image);
    formData.append('RestaurantId', this.restaurantId);
    if (e.target.checked){
      var status:any = 1
      formData.append('Status', status);
    }else{
      var status:any = 2
      formData.append('Status', status);
    }
    console.log(e.target.checked);
    this.http
    .post('http://localhost:7090/api/food/updateFood', formData)
    .subscribe((x) => {
      this.message = x;
      alert(this.message.message);
    });
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
