/*
============================================
; Title: role-create.component.ts
; Author: Dan Ross
; Date: 4 April 2021
; Modified By: Dan Ross
; Description: This is the role create component file.
;===========================================
*/
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/shared/interfaces/role.interface';
import { RoleService } from 'src/app/shared/services/role.service';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private roleService: RoleService) {

  }
 /**
   * Build our form. All fields are required.
   */
  ngOnInit() {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    });
  }

  /**
   * Create new user
   */
  create() {
    const newRole = {
      text: this.form.controls['text'].value
    } as Role

    this.roleService.createRole(newRole).subscribe(res => {
      this.router.navigate(['/roles']);
    }, err => {
      console.log(err);
    })
  }

  /**
   * This will cancel the creation of the new role and go back to the role list page.
   */
  cancel() {
    this.router.navigate(['/roles']);
  }

}
