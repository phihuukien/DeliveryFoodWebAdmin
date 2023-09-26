import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {GlobalVariable} from 'src/apiGlobal'
const api = GlobalVariable.BASE_API_URL+GlobalVariable.FOOD;

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http : HttpClient) { }
  getAllFoods(restaurantId:String){
    return this.http.get(api+"/"+restaurantId);
}
}