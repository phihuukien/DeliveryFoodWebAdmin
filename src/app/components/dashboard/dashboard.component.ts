import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
   restaurantId : string  = 'Not Restaurant';
 
  constructor(private router : Router,private activeRoute: ActivatedRoute){
  
  }
  ngOnInit():void {
    let idParams = this.activeRoute.snapshot.params['id'];
    if(idParams?.length > 0){
      this.restaurantId = idParams;
    }
   
  }
}
