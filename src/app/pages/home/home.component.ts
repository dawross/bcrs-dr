/*
; ==============================
; Title: home.component.ts
; Author: Professor Krasso
; Date: 19 April 2021
; Modified By: Brooklyn Hairston, Dan Ross
; Description: Home component
; ==============================
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LineItem } from 'src/app/shared/interfaces/line-item.interface';
import { ServiceRepairItem } from './../../shared/interfaces/service-repair-item.interface';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InvoiceService } from 'src/app/shared/services/invoice.service';
import { CookieService } from 'ngx-cookie-service';
import { ServiceRepairService } from 'src/app/shared/services/service-repair.service';
import { Validators } from '@angular/forms';
import { Invoice } from 'src/app/shared/interfaces/invoice.interface';
import { InvoiceSummaryDialogComponent } from 'src/app/dialogs/invoice-summary-dialog/invoice-summary-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  userName: string;
  services: ServiceRepairItem[];
  lineItems: LineItem[];

  // Only Numbers with Decimals
  keyPressNumbersDecimal(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  //Import statements
  constructor(private cookieService: CookieService, private fb: FormBuilder, private dialog: MatDialog, private router: Router, private serviceRepairService: ServiceRepairService, private invoiceService: InvoiceService) {

    //Get the username
    this.userName = this.cookieService.get('sessionuser');

    //Get the services repair items and put in array
    this.services = this.serviceRepairService.getServiceRepairItems();

  }

  /**
   * Build the parts and labor form
   */
  ngOnInit() {
    this.form = this.fb.group({
      parts: [null, Validators.compose([Validators.required])],
      labor: [null, Validators.compose([Validators.required])],
      alternator: [null, null]
    });
  }

  /**
   *
   * @param form
   */
  submit(form) {
    console.log(form);
    //get list of ids of service repair items
    const SelectedServiceIds = [];
    for (const [key, value] of Object.entries(form.checkGroup)) {
      //If checkbox selected then push the id to the array (SelectedServiceIds)
      if (value) {
        SelectedServiceIds.push({
          id: key
        });
      }
    }
    this.lineItems = [];

    /**
     * Build the invoice object
     *
     * Loop over data and find matches. Then create object and add it array of data so we have the title and price base on the id.
     */
    for (const savedService of this.services) {
      for (const SelectedService of SelectedServiceIds) {
        if (savedService.id === SelectedService.id) {
          this.lineItems.push({
            title: savedService.title,
            price: savedService.price
          });
        }
      }
    }

    console.log(this.lineItems);



    const partsAmount = parseFloat(form.parts);
    const laborAmount = form.labor * 50;
    //get running total of line item price
    const lineItemTotal = this.lineItems.reduce((prev, curl) => prev + curl.price, 0);
    const total = partsAmount + laborAmount + lineItemTotal;


    const invoice = {
      userName: this.userName,
      lineItems: this.lineItems,
      partsAmount: partsAmount,
      laborAmount: laborAmount,
      lineItemTotal: lineItemTotal,
      total: total,
      orderDate: new Date()
    } as Invoice;

    console.log(invoice);



    //Create oru dialog
    const dialogRef = this.dialog.open(InvoiceSummaryDialogComponent, {

      data: {
        invoice: invoice
      },
      disableClose: true,
      width: '800px'
    });

    //Save invoice
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        console.log('Invoice saved');

        this.invoiceService.createInvoice(invoice.userName, invoice).subscribe(res => {
          this.router.navigate(['/']);
        }, err => {
          console.log(err);
        })
      }
    });



  }



}
