import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { GlobalVariable } from 'src/apiGlobal';
import { Orders } from 'src/app/Models/Orders';
const api = GlobalVariable.BASE_API_URL+GlobalVariable.GET_ORDER_ALL;
const api_order_dettail = GlobalVariable.BASE_API_URL+GlobalVariable.GET_ORDER_DETAIL;
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http : HttpClient, private cookieService: CookieService) { }

  getOrdersAll(searchString:string,
                page:number,
                sort_orderBy:string,
                sort_order:string,
                fromDate:string,
                toDate:string,
                order_status:number): Observable<Array<any>>{
                  
     let customApi = api+this.cookieService.get('restaurantId')+'?';
     if(sort_orderBy !=null && (sort_order == "ASC" || sort_order=="DESC")){
     
      customApi+="sort_orderBy="+sort_orderBy+"&sort_order="+sort_order+"&";
     };
     if(searchString.length>0){
      customApi+="searchString="+searchString+"&";
     };
     
     if(fromDate.length >0  && fromDate.length >0 && fromDate != null  && fromDate  != null  ){
      console.log(searchString)
      console.log(toDate+"jj")
      customApi+="from_date="+fromDate+"&to_date="+toDate+"&";
     };
     if(order_status > 0 && order_status < 7){
      customApi+="order_status="+order_status+"&";
     };
     customApi +="page="+page;
     console.log(customApi)
   
    return this.http.get<Array<any>>(customApi);
  }

  getOrderDetail(orderId:string){
    return this.http.get<Array<any>>(api_order_dettail+this.cookieService.get('restaurantId')+"/"+orderId);
  }
}
