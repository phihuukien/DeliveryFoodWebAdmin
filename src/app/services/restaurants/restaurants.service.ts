import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurants } from 'src/app/Models/Restaurants';
import {GlobalVariable} from 'src/apiGlobal'
const api = GlobalVariable.BASE_API_URL+GlobalVariable.GET_RESTAURANTS;
@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(private http : HttpClient) { }

  getAllRestaurants(page:number): Observable<Array<Restaurants>>{

      return this.http.get<Array<Restaurants>>(api+'?page='+page);
  }
  getRestaurantsByUsername (username:string): Observable<Array<Restaurants>>{
   
    return  this.http.get<Array<Restaurants>>(api+"/"+username);
  
  
}

}
