/*
; ==============================
; Title: base-layout.component.ts
; Author: Professor Krasso
; Date: 17 April 2020
; Modified By: Brooklyn Hairston
; Description: Base Layout
; ==============================
*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();

  constructor() { }

  ngOnInit(): void {
  }



}
