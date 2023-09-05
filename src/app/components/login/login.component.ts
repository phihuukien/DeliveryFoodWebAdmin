import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Restaurants } from 'src/app/Models/Restaurants';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { RestaurantsService } from 'src/app/services/restaurants/restaurants.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorText: string = "";
  eyePassword: string = "fas fa-eye-slash";
  loginF: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })
  constructor(private auth: AuthService, private Restaurant: RestaurantsService, private router: Router) {

  }
  ngOnInit(): void {
    const element = document.getElementsByClassName('submit')[0];

    if (element?.ariaDisabled) {
      console.log(element?.getAttribute('disabled'));
    } else {
      console.log('Element not found.');
    }
  }
  passwordOpen() {
    const x = document.getElementById("password") as HTMLInputElement;
    if (x.type === "password") {
      x.type = "text";
      this.eyePassword = "fas fa-eye";
    } else {
      x.type = "password";
      this.eyePassword = "fas fa-eye-slash";
    }
  }
  onLogin() {
    if (this.loginF.valid) {
      this.auth.login(this.loginF.value).subscribe({
        next: ((response: any) => {
          if (response.status) {
            this.auth.storeToken(response.accessToken);
            if (this.auth.decodedToken().role == 'ADMIN') {
              this.router.navigate(['/dasboard']);
            } else if (this.auth.decodedToken().role == 'PARTNER') {
              this.Restaurant.getRestaurantsByUsername(this.auth.decodedToken().name).subscribe((response: any) => {
                if (response.status) {
                  this.router.navigate(['/choose_restaurant']);
                } else {
                  this.router.navigate(['/create_restaurant']);
                }
              })
            }
          } else {
            this.errorText = response.message;
            console.log(response.message)
            return;
          }
        })
        , error: (err => {
          // this.toast.error({detail:"ERROR",summary:'login failed',duration:5000});
          this.errorText = "login failed";
          console.log(err);
          return;
        })

      })
    }
  }
}
