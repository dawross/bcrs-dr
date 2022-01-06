/*
; ==============================
; Title: user.interface.ts
; Author: Dan Ross
; Date: 18 April 2021
; Modified By: Dan Ross
; Description: This is our user interface file.
; ==============================
*/

/**
 * Export so that any file that wants to use this interface just needs to import it.
 */
export interface User {
  role: string;
  _id: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  email: string;
}
