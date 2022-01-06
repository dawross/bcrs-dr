/*
; ==============================
; Title: service-repair.service.ts
; Author: Professor Krasso
; Date: 1 May 2021
; Modified By: Dan Ross
; Description: service repair service
; ==============================
*/
import { ServiceRepairItem } from './../interfaces/service-repair-item.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceRepairService {
  ServiceRepairItems: ServiceRepairItem[];

/**
 * List of our service repair items. These will populate the user interface.
 */
  constructor() {
    this.ServiceRepairItems = [
      {
        id: '101',
        title: 'Password Reset',
        price: 39.99,
        img: './assets/reset-password-icon-29.png'

      },
      {
        id: '102',
        title: 'Spyware Removal',
        price: 99.9,
        img: './assets/spyware-free.png'

      },
      {
        id: '103',
        title: 'RAM Upgrade',
        price: 129.99,
        img: './assets/ram.png'

      },
      {
        id: '104',
        title: 'Software Installation',
        price: 49.99,
        img: './assets/software-installer.png'

      },
      {
        id: '105',
        title: 'PC Tune-Up',
        price: 89.99,
        img: './assets/pc-tuneup.png'

      },
      {
        id: '106',
        title: 'Keyboard Cleaning',
        price: 45.00,
        img: './assets/keyboard-cleaning-2554540-.png'

      },
      {
        id: '107',
        title: 'Disk Clean-up',
        price: 149.99,
        img: './assets/laptop-disk-cleanup-icon-free-vector.png'

      }
    ]
   }
   /**
    *
    * @returns Service Repair interface
    */
   getServiceRepairItems(): ServiceRepairItem[] {
     return this.ServiceRepairItems;
   }
}
