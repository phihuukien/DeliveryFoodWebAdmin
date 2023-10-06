import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GlobalVariable } from 'src/apiGlobal';

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['./update-restaurant.component.css'],
})
export class UpdateRestaurantComponent {
  authService: any;

  message: any;
  username: any;
  res: any;
  restaurantId: any;
  lstTag: any[] = [];
  imagesApiUrl = GlobalVariable.IMAGES_API_URL;
  logo: any;
  poster: any;
  cover: any;
  lstCheck: any[] = [];
  lstCheckedCategory: any[] = [];
  lstCategory: any[] = [];
  categories: Array<any> = [];
  tagsOld: Array<any> = [];
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cookieService: CookieService,
    private http: HttpClient
  ) {
    this.restaurantId = this.cookieService.get('restaurantId');
    this.username = this.cookieService.get('username');
  }
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    time: new FormControl(''),
    distance: new FormControl(''),
    type: new FormControl(''),
  });

  async ngOnInit() {
    await this.getOneRes();
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
    const img1: HTMLInputElement | null =
      document.querySelector<HTMLInputElement>('#image1');
    const showimg1: HTMLImageElement | null =
      document.querySelector<HTMLImageElement>('.imgNews1 img');

    if (img1 && showimg1) {
      img1.addEventListener('change', function () {
        const file1 = img1.files?.[0];
        if (file1) {
          showimg1.src = URL.createObjectURL(file1);
        }
      });
    }
    const img2: HTMLInputElement | null =
      document.querySelector<HTMLInputElement>('#image2');
    const showimg2: HTMLImageElement | null =
      document.querySelector<HTMLImageElement>('.imgNews2 img');

    if (img2 && showimg2) {
      img2.addEventListener('change', function () {
        const file1 = img2.files?.[0];
        if (file1) {
          showimg2.src = URL.createObjectURL(file1);
        }
      });
    }
  }
  getOneRes() {
    this.http
      .get(
        'http://localhost:7090/api/restaurants/getResById/' + this.restaurantId
      )
      .subscribe((x: any) => {
        this.categories = x.data.categories;
        this.tagsOld = x.data.tags;
        this.res = x.data;
        this.http
          .get('http://localhost:7090/api/Tags/tags')
          .subscribe((y: any) => {
            this.lstTag = y.data;
            for (var i = 0; i < y.data.length; i++) {
              let count: number = 0;
              for (var f = 0; f < x.data.tags.length; f++) {
                if (y.data[i].name == x.data.tags[f]) {
                  this.lstCheck.push(true);
                  count++;
                  break;
                }
              }
              if (count == 0) {
                this.lstCheck.push(false);
              }
            }
            console.log(this.lstCheck[0]);
          });

        // category

        this.http
          .get(
            'http://localhost:7090/api/CategoriesRestaurants/getAllCat/' +
              this.restaurantId
          )
          .subscribe((res: any) => {
            this.lstCategory = res.data;
            for (var i = 0; i < res.data.length; i++) {
              let count: number = 0;
              for (var f = 0; f < this.res.categories.length; f++) {
                if (res.data[i].name == this.res.categories[f]) {
                  this.lstCheckedCategory.push(true);
                  count++;
                  break;
                }
              }
              if (count == 0) {
                this.lstCheckedCategory.push(false);
              }
            }
          });
      });
  }
  check() {}
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.logo = file;
      console.log(this.logo.name.split('.').slice(0, -1).join('.'));
    }
  }
  onFileSelected1(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.poster = file;
    }
  }
  onFileSelected2(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.cover = file;
    }
  }
  checkTag(e: any, tag: any) {
    if (e.target.checked) {
      this.tagsOld.push(tag.name);
    } else if (!e.target.checked) {
      const index = this.tagsOld.indexOf(tag.name);
      this.tagsOld.splice(index, 1);
    }
    console.log(this.tagsOld);
  }

  checkCate(e: any, category: any) {
    if (e.target.checked) {
      this.categories.push(category.name);
    } else if (!e.target.checked) {
      const index = this.categories.indexOf(category.name);
      this.categories.splice(index, 1);
    }
    console.log(this.categories);
  }
  submit() {
    const formData = new FormData();
    formData.append('Id', this.restaurantId);
    formData.append('Name', this.form.value.name);
    formData.append('Type', this.form.value.type);
    formData.append('Location', this.form.value.location);
    formData.append('Distance', this.form.value.distance);
    formData.append('Times', this.form.value.time);
    formData.append('Logo', this.logo);
    formData.append('Poster', this.poster);
    formData.append('Cover', this.cover);
    formData.append('Tags', this.tagsOld.toString());
    formData.append('Categories', this.categories.toString());
    formData.append('Username', this.username);
    console.log(formData);
    
    this.http
      .post('http://localhost:7090/api/restaurants/update-restaurant', formData)
      .subscribe((x) => {
        this.message = x;
        this.cookieService.set('img', this.logo.name.split('.').slice(0, -1).join('.'));
        alert(this.message.message);
        this.router.navigate(['/detail-restaurant']);
      });
  }
}
