import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurants } from 'src/app/Models/Restaurants';
import { RestaurantsService } from 'src/app/services/restaurants/restaurants.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  restaurants: Array<Restaurants> = new Array<Restaurants>();
 
  total_pages: Array<number> = new Array<number>();
  page: number = 1;

  constructor(private restaurant: RestaurantsService, private router: Router,private location: Location) {

  }
  ngOnInit(): void {
    this.getAllRestaurants(this.page);
  }


  getAllRestaurants(page: number) {
    this.restaurant.getAllRestaurants(page).subscribe( {
     next:((response: any)=>{
      if(this.total_pages.length != response.total_Page){
        for (let index = 1; index < response.total_Page + 1; index++) {
          this.total_pages.push(index);
        }
       }
       this.restaurants = response.data;
       this.page = response.page;
     }),
     error:( error =>{

      // this.location.back();
       if(error.status){
       this.router.navigate(['/not_found'])
       }
     })

    
   
     
    })
  }
 





}
