import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ChooseRestaurantComponent } from './components/choose-restaurant/choose-restaurant.component';
import { CreateRestaurantComponent } from './components/create-restaurant/create-restaurant.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {path:"dasboard",component:DashboardComponent,canActivate:[AuthGuard],data: { roles: ['ADMIN'] }},
  {path:"restaurants",component:RestaurantsComponent,canActivate:[AuthGuard],data: { roles: ['ADMIN']} },
  {path:"dasboard/restaurant/:id",component:DashboardComponent,canActivate:[AuthGuard],data: { roles: ['PARTNER']}},
  {path:"login",component:LoginComponent},
  {path:"not_found",component:NotFoundComponent},
  {path:"register",component:RegisterComponent},
  {path:"choose_restaurant",component:ChooseRestaurantComponent,canActivate:[AuthGuard],data: { roles: ['PARTNER']}},
  {path:"create_restaurant",component:CreateRestaurantComponent,canActivate:[AuthGuard],data: { roles: ['PARTNER']}},
  {path:"",redirectTo:"login",pathMatch:"prefix"},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
