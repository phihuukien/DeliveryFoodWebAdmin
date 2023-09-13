import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalVariable } from 'src/apiGlobal';
import { Orders } from 'src/app/Models/Orders';
import { ResponseDashboard } from 'src/app/Models/ResponseDashboard';

const api = GlobalVariable.BASE_API_URL+GlobalVariable.GET_ORDER_TODAY;

@Injectable({
  providedIn: 'root'
})
export class DashboardService{

  constructor(private http : HttpClient) { }
  getOrderToday(restaurantId:string): Observable<Array<ResponseDashboard>>{
    
     
    return this.http.get<Array<ResponseDashboard>>(api+restaurantId);
}
}
