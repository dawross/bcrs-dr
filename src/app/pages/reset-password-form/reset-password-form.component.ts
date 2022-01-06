/*
; ==============================
; Title: reset-password-form.components.ts
; Author: Professor Krasso
; Date: 25 April 2021
; Modified By: Brooklyn Hairston
; Description: Reset Password
; ==============================
*/

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
export class ResetPasswordFormComponent implements OnInit {

  isAuthenticated: string;
  username: string;
  form: FormGroup;

  /**
   *
   * @param http
   * @param route
   * @param router
   * @param fb
   * @param cookieService
   */

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private cookieService: CookieService) {
    this.isAuthenticated = this.route.snapshot.queryParamMap.get('isAuthenticated');
    this.username = this.route.snapshot.queryParamMap.get('username');
   }

   /**
    * @returns A new form with one required field of password
    */
  ngOnInit() {
    this.form = this.fb.group({
      password: [null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%*?&].{8,}')
      ]],
    });
  }

  /**
   * @returns An updated user with the new password
   * @description Resets the user's password, authenticates the user and grants them access
   */
  resetPassword() {
    this.http.post('/api/session/users/' + this.username + '/reset-password', {
      password: this.form.controls['password'].value
    }).subscribe(res => {
      this.cookieService.set('sessionuser', this.username, 1);
      this.router.navigate(['/']);
    }, err => {
      console.log(err);
    });
  }
}
