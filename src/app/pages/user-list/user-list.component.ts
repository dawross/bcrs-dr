/*
; ==============================
; Title: user-list.component.ts
; Author: Professor Krasso
; Date: 18 April 2021
; Modified By: Brooklyn Hairston
; Description: User list component
; ==============================
*/

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DeleteRecordDialogComponent } from './../../shared/delete-record-dialog/delete-record-dialog.component';
import { UserService } from './../../shared/services/user.service';
import { User } from '../../shared/interfaces/user.interface';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  displayedColumns = ['userName', 'firstName', 'lastName', 'phoneNumber', 'address', 'email', 'functions'];


  /**
   *
   * @param http
   * @param dialog
   * @param userService
   * @returns a list of users
   * @description queries the database for all users
   */
  constructor(private http: HttpClient, private dialog: MatDialog, private userService: UserService) {

    this.userService.findAllUsers().subscribe(res => {
      this.users = res['data'];
      console.log(this.users);
    }, err => {
      console.log(err);
    });
   }

  ngOnInit(): void {
  }

  /**
   *
   * @param userId
   * @param recordId
   * @description opens the delete record dialog box
   */

  delete(userId, recordId){
      const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
          data: {
              recordId,
              dialogHeader: "Delete Record Dialog",
              dialogBody: `Are you sure you want to delete user ${recordId}`
          },
          disableClose: true,
          width: '800px'
      });

      dialogRef.afterClosed().subscribe(result => {
          if(result === 'confirm') {
              this.userService.deleteUser(userId).subscribe(res => {
                  console.log('user delete');
                  this.users= this.users.filter(u => u._id !== userId);
              })
          }
      });
  }


}
