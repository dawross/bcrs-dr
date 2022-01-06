/*
; ==============================
; Title: invoice-summary-dialog.component.ts
; Author: Professor Krasso
; Date: 01 May 2021
; Modified By: Brooklyn Hairston
; Description: Dialog for the invoice summary
; ==============================
*/

//import statements
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Invoice } from '../../shared/interfaces/invoice.interface';

@Component({
  selector: 'app-invoice-summary-dialog',
  templateUrl: './invoice-summary-dialog.component.html',
  styleUrls: ['./invoice-summary-dialog.component.css']
})
export class InvoiceSummaryDialogComponent implements OnInit {
  invoice: Invoice

  /**
   *
   * @param dialogRef
   * @param data
   * @description maps the invoice data to the invoice dialog
   */
  constructor(private dialogRef: MatDialogRef<InvoiceSummaryDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.invoice = data.invoice;
   }

  ngOnInit() {
  }

}
