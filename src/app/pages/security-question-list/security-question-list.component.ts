
/*
; ==============================
; Title: security-question-list.component.ts
; Author: Dan Ross
; Date: 18 April 2021
; Modified By: Dan Ross
; Description: Security question list component
; ==============================
*/
import { DeleteRecordDialogComponent } from './../../shared/delete-record-dialog/delete-record-dialog.component';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SecurityQuestionService } from './../../shared/services/security-question.service';
import { MatDialog } from '@angular/material/dialog';
import { SecurityQuestion } from '../../shared/interfaces/security-question.interface';


@Component({
  selector: 'app-security-question-list',
  templateUrl: './security-question-list.component.html',
  styleUrls: ['./security-question-list.component.css']

})
export class SecurityQuestionListComponent implements OnInit {

  securityQuestions: SecurityQuestion[];
  displayedColumns = ['question', 'functions'];
  /**
   *
   * @param http
   * @param dialog
   * @param securityQuestionService
   *
   * @returns security question service data and subscribe to data
   */
  constructor(private http: HttpClient, private dialog: MatDialog, private securityQuestionService: SecurityQuestionService) {

    this.securityQuestionService.findAllSecurityQuestions().subscribe(res => {
      this.securityQuestions = res['data'];
    }, err => {
      console.log(err);
    })
  }

  ngOnInit() {
  }

  /**
   *
   * @param recordId
   *
   * Calls delete dialog box.
   */
  delete(recordId: string) {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        recordId,
        dialogHeader: 'Delete Record Dialog',
        dialogBody: `Are you sure you want to delete security questions ${recordId}`
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.securityQuestionService.deleteSecurityQuestion(recordId).subscribe(res => {
          console.log('Security question deleted');
          this.securityQuestions = this.securityQuestions.filter(q => q._id !== recordId);
        })
      }
    })
  }
}
