import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';
import { RequestUser } from 'src/app/Models/RequestUser';
import {GlobalVariable} from 'src/apiGlobal'
import { RequestRegister } from 'src/app/Models/RequestRegister';
const api = GlobalVariable.BASE_API_URL+GlobalVariable.LOGIN;
const api_register = GlobalVariable.BASE_API_URL+GlobalVariable.REGISTER;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userPayLoad: any;

  constructor(private http: HttpClient) {
    this.userPayLoad = this.decodedToken();
   
  }

  register(requestRegister: RequestRegister): Observable<RequestRegister>{
    return this.http.post<RequestRegister>(api_register, requestRegister).pipe(map((res: any) => {
      return res;
    }))
  }

  login(requestUser: RequestUser): Observable<RequestUser> {
    return this.http.post<RequestUser>(api, requestUser).pipe(map((res: any) => {
      return res;
    }))
  };
  logout() {
    localStorage.removeItem('token')
  };
  isTokenExpired():boolean{
    const jwtHelper = new JwtHelperService();
    if(jwtHelper.isTokenExpired(this.getToken())){
        return true
    }
    return false;
  }
  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }
  getToken() {
    return localStorage.getItem('token')
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }
  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }
}
