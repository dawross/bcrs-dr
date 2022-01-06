/**
 * Title: invoice.js
 * Author: Professor Krasso
 * Date: 30 April 2021
 * Modified By: Juvenal Gonzalez
 * Description: model for invoice object
 */

const mongoose = require('mongoose');
const LineItemSchema = require('../schemas/line-item');

const Schema = mongoose.Schema;
//invoice contains the data fields needed to give the user an order pricing
let invoiceSchema = new Schema ({
    userName: { type: String },
    lineItems: [LineItemSchema], //ARRAY OF LINEITEMS
    partsAmounts: { type: Number},
    laborAmount: {type: Number},
    lineItemTotal: { type: Number},
    total: { type: Number},
    orderDate: {type: Date, default: new Date()}
})

module.exports = mongoose.model('Invoice', invoiceSchema);
