/*
; ==============================
; Title: role-details.component.ts
; Author: Professor Krasso
; Date: 01 May 2021
; Modified By: Brooklyn Hairston
; Description: Role details
; ==============================
*/

//import statements
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/shared/interfaces/role.interface';
import { RoleService } from 'src/app/shared/services/role.service';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css']
})
export class RoleDetailsComponent implements OnInit {
  form: FormGroup;
  role: Role;
  roleId: string;


/**
 *
 * @param route
 * @param fb
 * @param router
 * @param roleService
 * @description Finds the role by id maps the data to the form
 */
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private roleService: RoleService ) {
    this.roleId= this.route.snapshot.paramMap.get('roleId');

    this.roleService.findRoleById(this.roleId).subscribe(res => {
      this.role = res['data'];
    }, err => {
      console.log(err);
    }, () => {
      this.form.controls.text.setValue(this.role.text);
    })
   }


   /**
    * Creates a form with one required input
    */
  ngOnInit() {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    });
   }

   /**
    * Updates the role and saves by the roleId
    */
   save() {
     const updatedRole = {
       text: this.form.controls['text'].value
     } as Role;

     this.roleService.updateRole(this.roleId, updatedRole).subscribe(res => {
       this.router.navigate(['/roles']);
     }, err => {
       console.log(err);
     })
   }

   /**
    * Cancels the edit and navigates back to the roles page
    */
   cancel() {
     this.router.navigate(['/roles']);
   }
}
