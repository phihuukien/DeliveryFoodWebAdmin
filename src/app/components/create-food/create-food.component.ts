import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-create-food',
  templateUrl: './create-food.component.html',
  styleUrls: ['./create-food.component.css']
})
export class CreateFoodComponent implements  OnInit{

  lsttag:any ;
  restaurantId:any;
  message:any;
 
  constructor(private router: Router,private cookieService: CookieService,private http : HttpClient) {
    this.restaurantId = this.cookieService.get('restaurantId');
  }
  ngOnInit(): void {
    const img: HTMLInputElement | null = document.querySelector<HTMLInputElement>('#image');
    const showimg: HTMLImageElement | null = document.querySelector<HTMLImageElement>('.imgNews img');
    
    if (img && showimg) {
      img.addEventListener('change', function () {
        const file = img.files?.[0];
        if (file) {
          showimg.src = URL.createObjectURL(file);
        }
      });
    }
    this.http.get("http://localhost:7090/api/CategoriesRestaurants/getAllCatRes/"+this.restaurantId).subscribe((x) => {
      
      this.lsttag = x
      this.lsttag = this.lsttag.data
    })
   
  }
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    ingredients: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    restaurantId:new FormControl(""),
  })

  submit(){
    this.form.value.restaurantId=this.restaurantId
    console.log(this.form.value);
    this.http.post("http://localhost:7090/api/food/addFood",this.form.value).subscribe((x) => {
      this.message = x
        console.log(this.message.message)
      this.router.navigate(['list-foods']);
    });
  }
}
