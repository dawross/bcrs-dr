/**
 * Title: register.component.ts
 * Author: Professor Krasso
 * Date: 26 April 2021
 * Modified By: Juvenal Gonzalez
 * Description: main component for register
 */
//imports
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SecurityQuestion } from '../../shared/interfaces/security-question.interface';
import { SecurityQuestionService } from '../../shared/services/security-question.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    securityQuestions: SecurityQuestion;  //declarations with data types set
    form: FormGroup;
    registrationForm: FormGroup;
    errorMessage: string;
   //constructor initializes with imported libraries as parameters
  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder, private cookieService: CookieService, private questionService: SecurityQuestionService) {
    this.questionService.findAllSecurityQuestions().subscribe( res => { this.securityQuestions = res['data']},
      error => {
          console.log(error);
      }
    );
   }

  ngOnInit() {          //registration form is the outer form that holds 3 nested forms
      this.registrationForm = new FormGroup ({
          contactInformation: new FormGroup ({
              firstName: new FormControl(null, Validators.required),
              lastName: new FormControl(null, Validators.required),
              phoneNumber: new FormControl(null, Validators.required),
              address: new FormControl(null, Validators.required),
              email: new FormControl(null, Validators.required)
          }),
          securityQuestions: new FormGroup ({
              securityQuestion1: new FormControl(null, Validators.required),
              securityQuestion2: new FormControl(null, Validators.required),
              securityQuestion3: new FormControl(null, Validators.required),
              answerToSecurityQuestion1: new FormControl(null, Validators.required),
              answerToSecurityQuestion2: new FormControl(null, Validators.required),
              answerToSecurityQuestion3: new FormControl(null, Validators.required)
          }),
          credentials: new FormGroup({
              userName: new FormControl(null, Validators.required),
              password: new FormControl(null, [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%*?&].{8,}')
              ])
          })
      });
  }

    register(form) {   //used to store the forms values so that the properties can be accesses with dot notation
        const contactInformation = form.contactInformation;
        const securityQuestions = form.securityQuestions;
        const credentials = form.credentials;
                 //object holds selected security questions and
        const selectedSecurityQuestions = [
          {
            questionText: securityQuestions.securityQuestion1,
            answerText: securityQuestions.answerToSecurityQuestion1
          },
          {
            questionText: securityQuestions.securityQuestion2,
            answerText: securityQuestions.answerToSecurityQuestion2
          },
          {
            questionText: securityQuestions.securityQuestion3,
            answerText: securityQuestions.answerToSecurityQuestion3
          }
        ];

        console.log(securityQuestions);
          //calls to register api and inserts the values to create a user
        this.http.post('/api/session/register', {
          userName: credentials.userName,
          password: credentials.password,
          firstName: contactInformation.firstName,
          lastName: contactInformation.lastName,
          phoneNumber: contactInformation.phoneNumber,
          address: contactInformation.address,
          email: contactInformation.email,
          selectedSecurityQuestions: selectedSecurityQuestions
        }).subscribe(res => {
          if (res['data']){            //validates user and navigates to homepage
            this.cookieService.set('sessionuser', credentials.userName, 1);
            this.router.navigate(['/']);
          } else {
              this.errorMessage= res['message'];
          }
        }, err => {
            console.log(err);
            this.errorMessage = err;
        });



    }

}

