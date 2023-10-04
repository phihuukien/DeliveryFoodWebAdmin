import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GlobalVariable } from 'src/apiGlobal';
import { Food } from 'src/app/Models/Food';

@Component({
  selector: 'app-update-food',
  templateUrl: './update-food.component.html',
  styleUrls: ['./update-food.component.css'],
})
export class UpdateFoodComponent {
  lsttag: any;
  restaurantId: any;
  message: any;
  fileName: any;
  idParams:any;
  loai:any;
  data:any;
  title:string='';
  imagesApiUrl = GlobalVariable.IMAGES_API_URL;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cookieService: CookieService,
    private http: HttpClient
  ) {
    this.restaurantId = this.cookieService.get('restaurantId');
  }
  ngOnInit(): void {
    this.idParams = this.activeRoute.snapshot.params['id'];
    this.loai =  this.activeRoute.snapshot.params['loai'];
    if (this.loai==1){
      this.title = "Update Food"
    }else{
      this.title = "Detail Food"
    }
    this.getOne();
    const img: HTMLInputElement | null =
      document.querySelector<HTMLInputElement>('#image');
    const showimg: HTMLImageElement | null =
      document.querySelector<HTMLImageElement>('.imgNews img');

    if (img && showimg) {
      img.addEventListener('change', function () {
        const file = img.files?.[0];
        if (file) {
          showimg.src = URL.createObjectURL(file);
        }
      });
    }
    
    this.http
      .get(
        'http://localhost:7090/api/CategoriesRestaurants/getAllCatRes/' +
          this.restaurantId
      )
      .subscribe((x) => {
        this.lsttag = x;
        this.lsttag = this.lsttag.data;
      });
  }
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    ingredients: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    category: new FormControl('',[Validators.required]),
    image: new FormControl(''),
    restaurantId: new FormControl(''),
  });
  getOne(){
    this.http
    .get(
      'http://localhost:7090/api/food/' +
        this.idParams
    )
    .subscribe((x) => {
      this.data = x;
      this.data = this.data.data;
    });
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file;
    }else{
      this.fileName = this.data.image;
    }
  }
  submit() {
    console.log(this.form.value);
    const formData = new FormData();
    formData.append('Id', this.idParams);
    formData.append('Name', this.form.value.name);
    formData.append('Price', this.form.value.price);
    formData.append('Ingredients', this.form.value.ingredients);
    formData.append('Description', this.form.value.description);
    formData.append('Category', this.form.value.category);
    formData.append('Image', this.fileName);
    formData.append('RestaurantId', this.restaurantId);
    console.log(formData);
    this.http
      .post('http://localhost:7090/api/food/updateFood', formData)
      .subscribe((x) => {
        this.message = x;
        alert(this.message.message);
        this.router.navigate(['list-foods']);
      });
  }
}
