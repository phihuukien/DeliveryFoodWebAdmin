import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorText: string = "";
  eyePassword: string = "fas fa-eye-slash";
  eyeConfirmPassword: string = "fas fa-eye-slash";
  passwordMatches: boolean = false;
  registerF: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required,Validators.minLength(8),Validators.maxLength(16)]),
    confirmPassword: new FormControl('', [Validators.required]),
  })
  constructor(private auth: AuthService, private router: Router) {

  }
  ngOnInit(): void {

  }
  passwordOpen(type: string) {
    const x = document.getElementById(type) as HTMLInputElement;
    if (type == "password") {
      if (x.type === "password") {
        x.type = "text";
        this.eyePassword = "fas fa-eye";
      } else {
        x.type = "password";
        this.eyePassword = "fas fa-eye-slash";
      }
    } else {
      if (x.type === "password") {
        x.type = "text";
        this.eyeConfirmPassword = "fas fa-eye";
      } else {
        x.type = "password";
        this.eyeConfirmPassword = "fas fa-eye-slash";
      }
    }
  }
  confirmPassword() {
    if (this.registerF.value.confirmPassword) {
      if (this.registerF.value.password != this.registerF.value.confirmPassword) {
        this.passwordMatches = true;
      } else {
        this.passwordMatches = false;
      }
    } else {
      this.passwordMatches = false;
    }

  }
  onRegister() {
    if (this.registerF.valid && !this.passwordMatches) {
      this.auth.register(this.registerF.value).subscribe({

        next: ((response: any) => {
          console.log(response);
          if (response.value.status) {
            this.router.navigate(['/login']);
          } else {
            this.errorText = response.value.message;
            console.log(response.value.message)
            return;
          }
        })
        , error: (err => {
          // this.toast.error({detail:"ERROR",summary:'login failed',duration:5000});
          this.errorText = "register failed";
          console.log(err);
          return;
        })

      })
    }
  }
}
