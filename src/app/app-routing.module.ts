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
import { OrderComponent } from './components/order/order.component';
import { DashboardPartnerComponent } from './components/dashboardpartner/dashboard-partner/dashboard-partner.component';
import { DashboardAdminComponent } from './components/dashboardadmin/dashboard-admin/dashboard-admin.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { FoodsComponent } from './components/foods/foods.component';
import { CreateFoodComponent } from './components/create-food/create-food.component';

const routes: Routes = [
  {path:"dasboard",component:DashboardComponent,canActivate:[AuthGuard],data: { roles: ['DEFAULT'] }},
  {path:"dasboard_partner",component:DashboardPartnerComponent,canActivate:[AuthGuard],data: { roles: ['PARTNER'] }},
  {path:"dasboard_admin",component:DashboardAdminComponent,canActivate:[AuthGuard],data: { roles: ['ADMIN']}},
  {path:"restaurants",component:RestaurantsComponent,canActivate:[AuthGuard],data: { roles: ['ADMIN']} },
  
  {path:"list-foods",component:FoodsComponent,canActivate:[AuthGuard],data: { roles: ['PARTNER']}},
  {path:"create-food",component:CreateFoodComponent,canActivate:[AuthGuard],data: { roles: ['PARTNER']}},
  {path:"order",component:OrderComponent,canActivate:[AuthGuard],data: { roles: ['PARTNER']}},
  {path:"login",component:LoginComponent},
  {path:"invoice/:orderId",component:InvoiceComponent,canActivate:[AuthGuard],data: { roles: ['PARTNER']}},
  {path:"not_found",component:NotFoundComponent},
  {path:"register",component:RegisterComponent},
  {path:"choose_restaurant",component:ChooseRestaurantComponent,canActivate:[AuthGuard],data: { roles: ['PARTNER']}},
  {path:"create_restaurant",component:CreateRestaurantComponent,canActivate:[AuthGuard],data: { roles: ['PARTNER']}},
  {path:"",redirectTo:"dasboard",pathMatch:"prefix"},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
