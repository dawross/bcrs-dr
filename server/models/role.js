/*
============================================
; Title: role.js
; Author: Dan Ross
; Date: 29 April 2021
; Modified By: Dan Ross
; Description: This is the role model file
;===========================================
*/
//Import over the Mongoose library.
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create role schema
let roleSchema = new Schema({
  text: { type: String, unique: true },
  isDisabled: { type: Boolean, default: false }
});

//Export this so we can access this file from our server file where we create our APIs.
module.exports = mongoose.model('Role', roleSchema);
