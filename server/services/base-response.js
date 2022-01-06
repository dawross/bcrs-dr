/*
; ==============================
; Title: base-response.js
; Author: Professor Krasso
; Date: 16 April 2021
; Modified By: Brooklyn Hairston
; Description: Creates a base response class
; ==============================
*/

//creates a new class
class BaseResponse {

  /**
   *
   * @param {*} httpCode
   * @param {*} message
   * @param {*} data
   */
  constructor(httpCode, message, data) {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }

  /**
   *
   * @returns a new object literal with the BaseResponse fields (httpCode, message, data, timestamp)
   * @description toObject function, part of the BaseResponse class
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


//exports class
module.exports = BaseResponse
