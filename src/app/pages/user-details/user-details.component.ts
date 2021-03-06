/*
; ==============================
; Title: user-details.component.ts
; Author: Dan Ross
; Date: 18 April 2021
; Modified By: Dan Ross, Brooklyn Hairston
; Description: Update user details page.
; ==============================
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from './../../shared/services/user.service';
import { User } from '../../shared/interfaces/user.interface';
import { Role } from 'src/app/shared/interfaces/role.interface';
import { RoleService } from '../../shared/services/role.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User;
  userId: string;
  form: FormGroup;
  roles: Role[];

  /**
   *
   * @param route
   * @param http
   * @param fb
   * @param router
   * @param userService
   */
  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private router: Router, private userService: UserService, private roleService: RoleService) {
    this.userId = this.route.snapshot.paramMap.get('userId');

    this.userService.findUserById(this.userId).subscribe(res => {
      this.user = res['data'];
    }, err => {
      console.log(err);
    }, () => {
      this.form.controls.firstName.setValue(this.user.firstName);
      this.form.controls.lastName.setValue(this.user.lastName);
      this.form.controls.phoneNumber.setValue(this.user.phoneNumber);
      this.form.controls.address.setValue(this.user.address);
      this.form.controls.email.setValue(this.user.email);
      this.form.controls.role.setValue(this.user.role['role']);

      this.roleService.findAllRoles().subscribe(res => {
        this.roles = res['data'];
      }, err => {
        console.log(err);
      })
    })

  }

  /**
   * Set the fields to be required.
   */
  ngOnInit() {
    this.form = this.fb.group({
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      role: [null, Validators.compose([Validators.required])]
    });
  }

  /**
   * Call the service that updates the user and save.
   */
  saveUser() {
    const updatedUser = {} as User;
    updatedUser.firstName = this.form.controls.firstName.value;
    updatedUser.lastName = this.form.controls.lastName.value;
    updatedUser.phoneNumber = this.form.controls.phoneNumber.value;
    updatedUser.address = this.form.controls.address.value;
    updatedUser.email = this.form.controls.email.value;
    updatedUser.role = this.form.controls.role.value;

    this.userService.updateUser(this.userId, updatedUser).subscribe(res => {
      this.router.navigate(['/users'])
    }, err => {
      console.log(err);
    })
  }
  /**
   * This will cancel the updating of the user and go back to the user list page.
   */
  cancel() {
    this.router.navigate(['/users']);
  }

}
