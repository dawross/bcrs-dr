/*
; ==============================
; Title: invoice-interface.ts
; Author: Professor Krasso
; Date: 01 May 2021
; Modified By: Brooklyn Hairston
; Description: Invoice interface
; ==============================
*/

//import statements
import { LineItem } from './line-item.interface';

//exports the Invoice interface
export interface Invoice {
  userName: string;
  lineItems: LineItem[];
  partsAmount: number;
  laborAmount: number;
  lineItemTotal: number;
  total: number;
  orderDate: Date;
}

