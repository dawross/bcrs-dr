/*
; ==============================
; Title: main.ts
; Author: Dan Ross
; Date: 18 April 2021
; Modified By: Dan Ross
; Description: This is the main.ts file
; ==============================
*/
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
