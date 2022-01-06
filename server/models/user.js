/*
; ==============================
; Title: user.js
; Author: Professor Krasso
; Date: 15 April 2021
; Modified By: Brooklyn Hairston
; Description: user mongoose model
; ==============================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserRoleSchema = require('../schemas/user-role');
const SelectedSecurityQuestionSchema = require('../schemas/selected-security-question');
//creates a new user schema mapped to the users collection
let userSchema = new Schema({
  userName: { type: String, required: true, unique: true, dropDups: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  phoneNumber: { type: String },
  address: { type: String },
  email: { type: String },
  isDisabled: { type: Boolean, default: false },
  role: UserRoleSchema,       // !!----BRACKETS allow an array of objects---!!
  selectedSecurityQuestions: [SelectedSecurityQuestionSchema],
  dateCreated: { type: Date, default: new Date() },
  dateModified: { type: Date }
},
{ collection: 'users' }
);

//exports the User model
module.exports = mongoose.model('User', userSchema);
