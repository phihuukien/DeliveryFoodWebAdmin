import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  public order : any;
  public orderDetail : any;
  constructor(private router : Router,private activeRoute: ActivatedRoute,private orderService:OrderService){
  
  }
  ngOnInit():void {
    let idParams = this.activeRoute.snapshot.params['orderId'];
    this.orderService.getOrderDetail(idParams).subscribe({
      next:((response:any)=>{
        console.log(response)
        console.log(response.data.note)
        console.log(response.dataOrderDetail)
        if(response.status){
          this.order = response.data;
          this.orderDetail = response.dataOrderDetail
         }
      }),
      error:( error =>{
        console.log(error)
        // this.location.back();
        //  if(error.status){
        //  this.router.navigate(['/not_found'])
        //  }
       })
     })

  }
  print(areaID:string){
    const printContent: string = document.getElementById(areaID)?.innerHTML ?? '';
    const originalContent: string = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;

  }
}
