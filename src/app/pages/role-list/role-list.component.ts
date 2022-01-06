/**
 * Title: role-list.component.ts
 * Author: Professor Krasso
 * Date: 30 April 2021
 * Modified By: Juvenal Gonzalez
 * Description: main component for role-list using typescript
 */


import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRecordDialogComponent } from './../../shared/delete-record-dialog/delete-record-dialog.component';
import { Role } from '../../shared/interfaces/role.interface';
import { RoleService } from 'src/app/shared/services/role.service';


@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  roles: Role[];//array to store roles
  displayedColumns = ['role', 'functions']; //array allows roles and functions to be displayed in separetly in a row

  constructor(private dialog: MatDialog, private roleService: RoleService) {
        this.roleService.findAllRoles().subscribe(res =>  { //service is called to generate array of roles
            this.roles = res['data'];
        }, err => {
            console.log(err);
        })
   }

  ngOnInit() {
  }

   delete(roleId, text) { //dialog is called to delete role object in table
      const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
          data: {
            roleId,
            dialogHeader: 'Delete Record Dialog',
            dialogbody: `Are you sure you want to delete role: ${text}?`
          },
          disableClose: true,
          width: '800px'
      });
                               //deletes the role if submit is selected
      dialogRef.afterClosed().subscribe(result => {
          if(result === 'confirm') {
              this.roleService.deleteRole(roleId).subscribe(res => {
                  console.log("Role Deleted")
                  this.roles = this.roles.filter(role => role._id !== roleId);
              })
          }
      });
   }

}
