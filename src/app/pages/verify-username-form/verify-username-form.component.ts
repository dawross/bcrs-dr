/*
; ==============================
; Title: verify-username-form.component.ts
; Author: Professor Krasso
; Date: 25 April 2021
; Modified By: Brooklyn Hairston
; Description: Verify username
; ==============================
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-verify-username-form',
  templateUrl: './verify-username-form.component.html',
  styleUrls: ['./verify-username-form.component.css']
})
export class VerifyUsernameFormComponent implements OnInit {

  form: FormGroup;
  errorMessage: string;

  /**
   *
   * @param http
   * @param fb
   * @param router
   */

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) { }

  /**
   * @returns A form with one required input of username
   */
  ngOnInit() {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])]
    });
  }

  /**
   * @returns a valid user or an error
   * @description Verifies the username and navigates to the verify-security-questions component
   */
  validateUsername() {
    const username = this.form.controls['username'].value;

    this.http.get('/api/session/verify/users/' + username).subscribe(res => {
      if (res) {
        this.router.navigate(['/session/verify-security-questions'], {queryParams: {username: username}, skipLocationChange: true});
      }
    }, err => {
      console.log(err);
      this.errorMessage = "Please enter a valid username"
    })
  }

}
