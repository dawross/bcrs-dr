/*
; ==============================
; Title: error-response.js
; Author: Professor Krasso
; Date: 16 April 2021
; Modified By: Brooklyn Hairston
; Description: Creates a new error response class
; ==============================
*/

//creates a new class

class ErrorResponse {

  /**
   *
   * @param {*} httpCode
   * @param {*} message
   * @param {*} data
   */
  constructor (httpCode, message, data) {

    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }

  /**
   *
   * @returns new object literal with the ErrorResponse fields (httpCode, message, data, timestamp)
   * @description toObject function, part of the ErrorResponse class
   */

  toObject() {
    return {
      'httpCode': this.httpCode,
      'message': this.message,
      'data': this.data,
      'timestamp': new Date().toLocaleDateString()
    }
  }
}


//export class
module.exports = ErrorResponse
