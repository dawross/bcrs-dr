/**
 * Title: role.guard.ts
 * Author: Professor Krasso
 * Date: 30 April 2021
 * Modified By: Juvenal Gonzalez
 * Description: main component for role guard using typescript
 */


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {  Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { RoleService } from '../services/role.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService, private roleService: RoleService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //pipe and map return a promise which allows asynchronouse functions to operate in the proper order
  return this.roleService.findUserRole(this.cookieService.get('sessionuser')).pipe(map( res =>
 {
  console.log(res);
  if (res['data'].role === 'admin')
  {
    return true; //boolean guard object returns true and allows access to the page
  }
  else
  {
    this.router.navigate(['/']);
    return false;  //if user is not an admin they are rerouted home
  }
}));
}
}

