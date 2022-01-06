/*
; ==============================
; Title: invoice-api.js
; Author: Professor Krasso
; Date: 30 April 2021
; Modified By: Brooklyn Hairston, Dan Ross
; Description: Invoice router
; ==============================
*/

//require statements
const express = require("express");
const Invoice = require("../models/invoice");
const ErrorResponse = require("../services/error-response");
const BaseResponse = require("../services/base-response");
const router = express.Router();

/**
 * FindPurchaseByService
 * @returns
 * @description
 */
 router.get("/purchases-graph", async (req, res) => {
  try {
    Invoice.aggregate(
      [
        {
          $unwind: "$lineItems",
        },
        {
          $group: {
            "_id": {
              title: "$lineItems.title",
              price: "$lineItems.price"
            },
            "count": {
              $sum: 1
            }
          }
        },
        {
          $sort: {
            "_id.title": 1,
          }
        }
      ],
      function (err, purchaseGraph) {
        if (err) {
          console.log(err);
          const findPurchaseByServiceGraphMongodbErrorResponse = new ErrorResponse(
            "500",
            "Internal server error",
            err
          );
          res
            .status(500)
            .send(findPurchaseByServiceGraphMongodbErrorResponse.toObject());
        } else {
          console.log(purchaseGraph);
          const findPurchasesByServiceGraphResponse = new BaseResponse(
            "200",
            "Query successful",
            purchaseGraph
          );
          res.json(findPurchasesByServiceGraphResponse.toObject());
        }
      }
    );
  } catch (e) {
    console.log(e);
    const findPurchasesByServiceCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );
    res.status(500).send(findPurchasesByServiceCatchErrorResponse.toObject());
  }
});


/**
 * @param  {userName"} "/
 * @param  {} async(req
 * @param  {} res
 *
 */
router.post("/:userName", async (req, res) => {
  try {
    const userName = req.params.userName;

    const newInvoice = {
      username: userName,
      lineItems: req.body.lineItems,
      partsAmount: req.body.partsAmount,
      laborAmount: req.body.laborAmount,
      lineItemTotal: req.body.lineItemTotal,
      total: req.body.total,
    };

    console.log(newInvoice);

    /**
     * @param  {} newInvoice
     * @param  {} function(err
     * @param  {} invoice
     * @returns new invoice
     */
    Invoice.create(newInvoice, function (err, invoice) {
      if (err) {
        console.log(err);
        const createInvoiceMongodbErrorResponse = new ErrorResponse(
          "500",
          "Internal server error",
          err
        );
        res.status(500).send(createInvoiceMongodbErrorResponse.toObject());
      } else {
        console.log(invoice);
        const createInvoiceResponse = new BaseResponse(
          "200",
          "Query Successful",
          invoice
        );
        res.json(createInvoiceResponse.toObject());
      }
    });
  } catch (e) {
    console.log(e);
    const createInvoiceCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );
    res.status(500).send(createInvoiceCatchErrorResponse.toObject());
  }
});

module.exports = router;
