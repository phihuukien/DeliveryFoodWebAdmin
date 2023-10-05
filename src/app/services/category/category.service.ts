import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { GlobalVariable } from 'src/apiGlobal';
import { Category } from 'src/app/Models/Category';
const api_insert = GlobalVariable.BASE_API_URL+GlobalVariable.INSERT_CATEGORY;
const api_update = GlobalVariable.BASE_API_URL+GlobalVariable.UPDATE_CATEGORY;
const api_getall = GlobalVariable.BASE_API_URL+GlobalVariable.GET_CATEGORY;
const api_get_by_id = GlobalVariable.BASE_API_URL+GlobalVariable.GET_CATEGORY_BY_ID;
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  insertCategory(category: Category):Observable<Category>{
    return this.http.post<Category>(api_insert, category).pipe(map((res: any) => {
   return res
    }))
  }
  UpdateCategory(category: Category):Observable<Category>{
    return this.http.put<Category>(api_update, category).pipe(map((res: any) => {
   return res
    }))
  }
  GetAllCategory(restaurantId:string):Observable<Array<Category>>{
    return this.http.get<Array<Category>>(api_getall+restaurantId);
  }
  GetCategoryById(ID:string):Observable<Category>{
    return this.http.get<Category>(api_get_by_id+ID);
  }
}
