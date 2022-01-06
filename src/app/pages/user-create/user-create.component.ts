/*
; ==============================
; Title: user-create.component.ts
; Author: Dan Ross
; Date: 18 April 2021
; Modified By: Dan Ross
; Description: Create User component.ts file
; ==============================
*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../shared/interfaces/user.interface';
import { UserService } from './../../shared/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user: User;
  userId: string;
  form: FormGroup;
  roles: any;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

  /**
   * Build our form. All fields are required.
   */
  ngOnInit() {
    this.form = this.fb.group({
      userName: [null, Validators.compose([Validators.required])],
      password: [null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%*?&].{8,}')
      ]],
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])]
    });
  }

  /**
   * Create  new user
   */
  createUser() {
    const newUser = {} as User;
    newUser.userName = this.form.controls.userName.value,
      newUser.password = this.form.controls.password.value,
      newUser.firstName = this.form.controls.firstName.value,
      newUser.lastName = this.form.controls.lastName.value,
      newUser.phoneNumber = this.form.controls.phoneNumber.value,
      newUser.address = this.form.controls.address.value,
      newUser.email = this.form.controls.email.value,

      this.userService.createUser(newUser).subscribe(res => {
        this.router.navigate(['/users'])
      }, err => {
        console.log(err);
      })
  }

  /**
   * This will cancel the creation of the new user and go back to the user list page.
   */
  cancel() {
    this.router.navigate(['/users'])
  }

}
