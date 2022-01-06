/*
; ==============================
; Title: security-question-create.component.ts
; Author: Professor Krasso
; Date: 18 April 2021
; Modified By: Brooklyn Hairston
; Description: Create Security Question
; ==============================
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityQuestionService } from  './../../shared/services/security-question.service';
import { SecurityQuestion } from '../../shared/interfaces/security-question.interface';

@Component({
  selector: 'app-security-question-create',
  templateUrl: './security-question-create.component.html',
  styleUrls: ['./security-question-create.component.css']
})
export class SecurityQuestionCreateComponent implements OnInit {

  form: FormGroup;

  /**
   *
   * @param fb
   * @param router
   * @param securityQuestionService
   */

  constructor(private fb: FormBuilder, private router: Router, private securityQuestionService: SecurityQuestionService) {

   }

   /**
    * @description form with one required field
    */

  ngOnInit() {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  /**
   * @description adds a new security question
   */
  create() {
    const newSecurityQuestion = {} as SecurityQuestion;
    newSecurityQuestion.text = this.form.controls.text.value;

    this.securityQuestionService.createSecurityQuestion(newSecurityQuestion).subscribe(res => {
      this.router.navigate(['/security-questions']);
    }, err => {
      console.log(err);
    })
  }


  /**
   * @description cancels adding a new security question
   */

  cancel() {
    this.router.navigate(['/security-questions']);
  }

}
