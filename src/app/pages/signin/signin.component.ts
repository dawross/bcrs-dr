/*
; ==============================
; Title: signin.component
; Author: Professor Krasso
; Date: 18 April 2021
; Modified By: Brooklyn Hairston
; Description: Signin Component
; ==============================
*/

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  form: FormGroup;
  errorMessage: string;

  /**
   *
   * @param router
   * @param cookieService
   * @param fb
   * @param http
   */
  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder, private http: HttpClient) {

  }


  /**
   * @description signin form with two required fields
   */

  ngOnInit() {
    this.form = this.fb.group({
      userName: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
    });
  }

  /**
     * @description the sign-in form must accept a valid username and password to navigate to the home page
     */
  signin() {
    const userName = this.form.controls.userName.value;
    const password = this.form.controls.password.value;

    this.http.post('/api/session/signin', {
      userName,
      password
    }).subscribe(res => {
      console.log(res['data']);
      if (res['data'].userName) {

        this.cookieService.set('sessionuser', res['data'].userName, 1);
        this.router.navigate(['/']);
      }
    }, err => {
      console.log(err);
      this.errorMessage = err;

    });
  }
}
