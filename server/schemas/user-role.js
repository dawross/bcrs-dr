/*
; ==============================
; Title: user-role.js
; Author: Professor Krasso
; Date: 15 April 2021
; Modified By: Brooklyn Hairston
; Description: user-role schema
; ==============================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creates a new userRole schema
let userRoleSchema = new Schema({
  role: {type: String, default: 'standard'}
})

//exports the userRole schema
module.exports = userRoleSchema;
