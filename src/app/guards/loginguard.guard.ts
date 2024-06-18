import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable(
  {
    providedIn:'root'
  }
)

export class loginguardGuard implements CanActivate{

  constructor(private route:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
    if(localStorage.getItem("logindata")!=null && localStorage.getItem("logindata")!=undefined && localStorage.getItem("logindata")!= ""){
       return true;
    }
    else{
      this.route.navigateByUrl('/')
      return false;
    }
  }
  
}

