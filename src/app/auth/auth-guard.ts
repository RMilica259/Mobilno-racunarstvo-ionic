import { Injectable } from '@angular/core'; 
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})

export class authGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) {
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean{
      if(!this.authService.isUserAuthenticated){
        this.router.navigateByUrl('/log-in');
      }
      return this.authService.isUserAuthenticated;
    }
};
