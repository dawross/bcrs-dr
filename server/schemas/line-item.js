/**
 * Title: line-item.js
 * Author: Professor Krasso
 * Date: 30 April 2021
 * Modified By: Juvenal Gonzalez
 * Description: schema for line-item object
 */

//Defines what data fields will forcefully be required upon initalization of any lineItem object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LineItemSchema = new Schema({
    title: {type: String},
    price: {type: Number }
});

module.exports= LineItemSchema;
