import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Food } from 'src/app/Models/Food';
import { FoodService } from 'src/app/services/foods/food.service';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {
  restaurantId!: string;
  foods:any=Food;
  constructor(private cookieService: CookieService, private foodService: FoodService) {
  }
  ngOnInit(): void {
    this.restaurantId = this.cookieService.get('restaurantId');
    this.getAll();
  }
  getAll() {
    this.foodService.getAllFoods(this.restaurantId).subscribe((response: any) => {
      if (response.status) {
        this.foods = response.data;
        console.log(this.foods);
      }
    })
  }
}