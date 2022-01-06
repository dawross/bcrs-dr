/*
============================================
; Title: selected-security-question.js
; Author: Dan Ross
; Date: 17 April 2021
; Modified By: Dan Ross
; Description: This is the selected security question schema file
;===========================================
*/
//Import over the Mongoose library.
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

//We're saving the text values of the security questions and answers for a user.
let selectedSecurityQuestionSchema =  new Schema ({
  questionText: { type: String },
  answerText: { type: String }
  },
)

//Export so it can be accessed by other files.
module.exports = selectedSecurityQuestionSchema;

