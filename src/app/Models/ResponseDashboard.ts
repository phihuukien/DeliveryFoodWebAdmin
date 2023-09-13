import { Orders } from "./Orders";

export class ResponseDashboard {
    totalOrderToday : number= 0;
    message:string = "";
    status:boolean = true;
    earnings:number = 0;
    orderFinish:number=0;
    orderCancel:number = 0;
    foodSoldOut:number=0;
   orderPending:Array<Orders> = [];
}