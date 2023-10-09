import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GlobalVariable } from 'src/apiGlobal';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-create-restaurant2',
  templateUrl: './create-restaurant2.component.html',
  styleUrls: ['./create-restaurant2.component.css']
})
export class CreateRestaurant2Component implements OnInit {
  authService: any;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cookieService: CookieService,
    private http: HttpClient,
    private auth: AuthService,
  ) {
    this.restaurantId = this.cookieService.get('restaurantId');
 
  }
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    location : new FormControl('', [Validators.required]),
    time : new FormControl('',),
    distance: new FormControl(''),
    type: new FormControl(''),
  })
  message:any;
  username =this.auth.decodedToken().name;
  restaurantId :any;
  lstTag : any=[];
  imagesApiUrl = GlobalVariable.IMAGES_API_URL;
  logo:any;
  poster:any;
  cover:any;
  tags:Array<any>=[];
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
    const img1: HTMLInputElement | null = document.querySelector<HTMLInputElement>('#image1');
    const showimg1: HTMLImageElement | null = document.querySelector<HTMLImageElement>('.imgNews1 img');

    if (img1 && showimg1) {
      img1.addEventListener('change', function () {
        const file1 = img1.files?.[0];
        if (file1) {
          showimg1.src = URL.createObjectURL(file1);
        }
      });
    }
    const img2: HTMLInputElement | null = document.querySelector<HTMLInputElement>('#image2');
    const showimg2: HTMLImageElement | null = document.querySelector<HTMLImageElement>('.imgNews2 img');

    if (img2 && showimg2) {
      img2.addEventListener('change', function () {
        const file1 = img2.files?.[0];
        if (file1) {
          showimg2.src = URL.createObjectURL(file1);
        }
      });
    }
    this.GetTags();
  }
  GetTags(){
    this.http
      .get(
        'http://localhost:7090/api/tags/tags'
      )
      .subscribe((x) => {
        this.lstTag = x;
        this.lstTag = this.lstTag.data;
      });
  }
  onFileSelected(event:any) {
    const file:File = event.target.files[0];
    if (file) {
        this.logo = file;
    }
  }
  onFileSelected1(event:any) {
    const file:File = event.target.files[0];
    if (file) {
        this.poster = file;
    }
  }
  onFileSelected2(event:any) {
    const file:File = event.target.files[0];
    if (file) {
        this.cover = file;
    }
  }
  checkTag(e:any,tag:any){

    if (e.target.checked){
      this.tags.push(tag.name);
    }else if (!e.target.checked){
      const index = this.tags.indexOf(tag.name);
      this.tags.splice(index, 1);
    }
    console.log(this.tags);
  }
  submit(){
    const formData = new FormData();
    formData.append('Name', this.form.value.name);
    formData.append('Type', this.form.value.type);
    formData.append('Location', this.form.value.location);
    formData.append('Distance', this.form.value.distance);
    formData.append('Times', this.form.value.time);
    formData.append('Logo', this.logo);
    formData.append('Poster', this.poster);
    formData.append('Cover', this.cover);
    formData.append('Tags', this.tags.toString());
    formData.append('Username', this.username);
    console.log(this.tags)
    this.http.post("http://localhost:7090/api/restaurants/add-restaurant",formData).subscribe((x) => {
      this.message = x
      this.router.navigate(['/choose_restaurant'])
    });
  }

}
