/*
; ==============================
; Title: invoice.interface.ts
; Author: Professor Krasso
; Date: 01 May 2021
; Modified By: Brooklyn Hairston
; Description: Invoice interface
; ==============================
*/

//import statements
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Invoice } from '../interfaces/invoice.interface';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  /**
   *
   * @param http
   */
  constructor(private http: HttpClient) { }


  /**
   *
   * @param userName
   * @param invoice
   * @returns an observable of type any
   */
  createInvoice(userName: string, invoice: Invoice): Observable<any> {
    return this.http.post('/api/invoices/' + userName, {
      userName: userName,
      lineItems: invoice.lineItems,
      partsAmount: invoice.partsAmount,
      laborAmount: invoice.laborAmount,
      lineItemTotal: invoice.lineItemTotal,
      total: invoice.total
    })
  }

  /**
   *
   * @returns The purchase by service graph
   */
  findPurchasesByServiceGraph() {
    return this.http.get('/api/invoices/purchases-graph');
  }
}
