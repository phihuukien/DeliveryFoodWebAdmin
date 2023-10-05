import { Injectable } from '@angular/core';
import { HttpClient } from '@microsoft/signalr';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
import { GlobalVariable } from 'src/apiGlobal';
import { RequestRegister } from '../Models/RequestRegister';
import { RequestUser } from '../Models/RequestUser';
import { Category } from '../Models/Category';
const api_inssert = GlobalVariable.BASE_API_URL + GlobalVariable.INSERT_CATEGORY;

@Injectable({
  providedIn: 'root'
})
export class CategoryService  {

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  InsertCategory(category: Category): Observable<Category>{
    return this.http.post<Category>(api_inssert, category).pipe();
  }
 
}
