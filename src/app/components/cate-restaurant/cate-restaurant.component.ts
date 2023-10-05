import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Category } from 'src/app/Models/Category';
import { CategoryService } from 'src/app/services/category/category.service';
@Component({
  selector: 'app-cate-restaurant',
  templateUrl: './cate-restaurant.component.html',
  styleUrls: ['./cate-restaurant.component.css'],
})
export class CateRestaurantComponent implements OnInit {
  restaurantId: string = '';
  isPost = true;
  public status:boolean = true;
  categories:Array<Category>= [];
  category:Category= new Category;
  CategoryF: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    status: new FormControl(1),
    restaurantId: new FormControl(''),
  });
  CategoryFUp: FormGroup = new FormGroup({
    id: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    status: new FormControl(this.category.status),
    restaurantId: new FormControl(''),
  });
  constructor(
    private cookieService: CookieService,
    private cateService: CategoryService
  ) {}

  ngOnInit() {
    this.restaurantId = this.cookieService.get('restaurantId');
    this.getAllCategory();
  }

  getAllCategory() {
    this.cateService.GetAllCategory(this.restaurantId).subscribe({
      next: (response: any) => {
        this.categories = response.data;
      },
      error: (err) => {
        // this.toast.error({detail:"ERROR",summary:'login failed',duration:5000});
        console.log(err);
        return;
      },
    });
  }
  onInsertCate() {
    this.CategoryF.value.restaurantId = this.restaurantId;
   
    this.cateService.insertCategory(this.CategoryF.value).subscribe({
      next: (response: any) => {
        this.getAllCategory();
        this.CategoryF.reset();
      },
      error: (err) => {
        // this.toast.error({detail:"ERROR",summary:'login failed',duration:5000});
        console.log(err);
        return;
      },
    });
  }
  onUpdate() {
    console.log(this.status)
    this.CategoryFUp.value.restaurantId = this.category.restaurantId;
    this.CategoryFUp.value.id = this.category.id;
    this.cateService.UpdateCategory(this.CategoryFUp.value).subscribe({
      next: (response: any) => {
        this.getAllCategory();
        this.CategoryF.reset();
        this.isPost = true
      },
      error: (err) => {
        // this.toast.error({detail:"ERROR",summary:'login failed',duration:5000});
        console.log(err);
        return;
      },
    });
  }
  GetCateById(id:string){
    this.isPost = false
    this.cateService.GetCategoryById(id).subscribe({
      next: (response: any) => {
        this.category= response.data;
        this.CategoryFUp.value.status =  response.data.status;
        this.CategoryFUp.value.name =  response.data.name;
      },
      error: (err) => {
        // this.toast.error({detail:"ERROR",summary:'login failed',duration:5000});
        console.log(err);
        return;
      },
    });
  }
}
