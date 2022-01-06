/*
============================================
; Title: error.interceptor.ts
; Author: Dan Ross
; Date: 18 April 2021
; Modified By: Dan Ross
; Description: This is the error interceptor file
;===========================================
*/

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }

  /**
   *
   * @param req
   * @param next
   * @returns Error code
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {

      /**
       * Handle 400 errors
       */
      if ([404].indexOf(err.status) !== -1) {
        this.router.navigate(['/session/not-found']);
      }

      /**
       * Handle 500 errors
       */
      if ([500].indexOf(err.status) !== -1) {
        this.router.navigate(['/session/internal-error']);
      }

      //Otherwise, catch the error and throw
      const error = err.error.message || err.statusText;
      return throwError(error);

    }));
  }

}



