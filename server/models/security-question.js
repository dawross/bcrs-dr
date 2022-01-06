/*
============================================
; Title: security-question.js
; Author: Dan Ross
; Date: 17 April 2021
; Modified By: Dan Ross
; Description: This is the security question model file
;===========================================
*/
//Import over the Mongoose library.
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create security questions schema and map to securityQuestions collection.
let securityQuestionSchema = new Schema(
  {
    text: { type: String },
    isDisabled: { type: Boolean, default: false },
  },
  { collection: "securityQuestions" }
);

//Export this so we can access this file from our server file where we create our APIs.
module.exports = mongoose.model('SecurityQuestion', securityQuestionSchema);
