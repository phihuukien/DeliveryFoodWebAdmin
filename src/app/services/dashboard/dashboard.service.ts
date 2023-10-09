import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalVariable } from 'src/apiGlobal';
import { Orders } from 'src/app/Models/Orders';
import { ResponseDashboard } from 'src/app/Models/ResponseDashboard';

const api = GlobalVariable.BASE_API_URL + GlobalVariable.GET_ORDER_TODAY;
const api_get_order_pending = GlobalVariable.BASE_API_URL + GlobalVariable.GET_ORDER_PENDING;
const api_get_order_waiting = GlobalVariable.BASE_API_URL + GlobalVariable.GET_ORDER_WAITING;
const api_update_order_status = GlobalVariable.BASE_API_URL + GlobalVariable.UPDATE_ORDER_STATUS;

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  public showSilde:boolean = false;
  constructor(private http: HttpClient) { }

  setShowSilde(IS:boolean){
    this.showSilde = IS;
  }

  getOrderToday(restaurantId: string): Observable<Array<ResponseDashboard>> {
    return this.http.get<Array<ResponseDashboard>>(api + restaurantId);
  }
  getOrderPending(restaurantId: string): Observable<any> {
    return this.http.get<any>(api_get_order_pending + restaurantId);
  }
  getOrderWaiting(restaurantId: string): Observable<any> {
    return this.http.get<any>(api_get_order_waiting + restaurantId);
  }
  gettingOrder(restaurantId: string,status: number,orderId: string): Observable<any> {
    return this.http.get<any>(api_update_order_status + restaurantId+"/"+status+"/"+orderId);
  }
}
