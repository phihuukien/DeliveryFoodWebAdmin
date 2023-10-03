import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderComponent } from './components/order/order.component';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ChooseRestaurantComponent } from './components/choose-restaurant/choose-restaurant.component';
import { CreateRestaurantComponent } from './components/create-restaurant/create-restaurant.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardPartnerComponent } from './components/dashboardpartner/dashboard-partner/dashboard-partner.component';
import { DashboardAdminComponent } from './components/dashboardadmin/dashboard-admin/dashboard-admin.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { FoodsComponent } from './components/foods/foods.component';
import { CreateFoodComponent } from './components/create-food/create-food.component';
import { ListRestaurantsComponent } from './components/list-restaurants/list-restaurants.component';
import { UpdateFoodComponent } from './components/update-food/update-food.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    HeaderComponent,
    SideBarComponent,
    FooterComponent,
    DashboardComponent,
    UserComponent,
    RestaurantsComponent,
    LoginComponent,
    ChooseRestaurantComponent,
    CreateRestaurantComponent,
    RegisterComponent,
    NotFoundComponent,
    DashboardPartnerComponent,
    DashboardAdminComponent,
    InvoiceComponent,
    FoodsComponent,
    CreateFoodComponent,
    ListRestaurantsComponent,
    UpdateFoodComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
