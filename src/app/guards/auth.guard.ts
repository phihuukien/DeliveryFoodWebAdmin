 import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
  
    const role = route.data['roles'][0] as string[];
   
    
    if (this.auth.isLoggedIn()) {
      if (this.auth.isTokenExpired()) {
        this.router.navigate(['/login'])
        return false;
      }
      if(this.auth.decodedToken().role != role){
        this.router.navigate(['/not_found'])
        return false;
      }
      
      return true
    } else {
      this.router.navigate(['/login'])
      return false;
    }
  }

}
