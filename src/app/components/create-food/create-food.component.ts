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
  fileName:any;
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
    description: new FormControl(''),
    category: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    restaurantId:new FormControl(""),
  })
  onFileSelected(event:any) {
    const file:File = event.target.files[0];
    if (file) {
        this.fileName = file;
    }
}
  submit(){
    const formData = new FormData();
    formData.append('Name', this.form.value.name);
    formData.append('Price', this.form.value.price);
    formData.append('Ingredients', this.form.value.ingredients);
    formData.append('Description', this.form.value.description);
    formData.append('Category', this.form.value.category);
    formData.append('Image', this.fileName);
    formData.append('RestaurantId', this.restaurantId);
    this.http.post("http://localhost:7090/api/food/addFood",formData).subscribe((x) => {
      this.message = x
        alert(this.message.message)
      this.router.navigate(['list-foods']);
    });
  }
}
