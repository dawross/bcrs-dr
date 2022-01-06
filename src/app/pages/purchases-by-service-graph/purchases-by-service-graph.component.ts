/**
 * Title: purchases-by-service-graph.component.ts
 * Author: Professor Krasso
 * Date: 30 April 2021
 * Modified By: Juvenal Gonzalez
 * Description: main component for purchases-by-service-graph using typescript
 */

 import { Component, OnInit } from '@angular/core';
 import { InvoiceService } from '../../shared/services/invoice.service';

 @Component({
   selector: 'app-purchases-by-service-graph',
   templateUrl: './purchases-by-service-graph.component.html',
   styleUrls: ['./purchases-by-service-graph.component.css']
 })
 export class PurchasesByServiceGraphComponent implements OnInit {

   purchases: any;
   data: any;
   itemCount = [];
   labels = [];

   constructor(private invoiceService: InvoiceService) {
            //service calls purchases-by-service-graph API
     this.invoiceService.findPurchasesByServiceGraph().subscribe(res => {
         this.purchases = res ['data'];

         for(const item of this.purchases) {   //uses property values from purchases to
             this.labels.push(item._id.title); // push values into labes and itemCount Array
             this.itemCount.push(item.count);
         }

         this.data = {
             labels: this.labels,  //uses labels array to label each pie of the pie chart
             datasets: [
                 {
                   backgroundColor: [  //colors associated with each label
                     '#ED0A3F',
                     '#FF8833',
                     '#5FA777',
                     '#0066CC',
                     '#6B3FA0',
                     '#AF593E',
                     '#6CDAE7',
                   ],
                   hoverBackgroundColor: [
                     '#ED0A3F',
                     '#FF8833',
                     '#5FA777',
                     '#0066CC',
                     '#6B3FA0',
                     '#AF593E',
                     '#6CDAE7',
                   ],
                   data: this.itemCount  //uses itemCount as the data for the pie-chart
                 },
             ]
         };

         console.log('Data object');
         console.log(this.data);  //outputs data object to console
     })

    }

   ngOnInit(): void {
   }

 }

