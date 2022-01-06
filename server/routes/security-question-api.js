/*
; ==============================
; Title: security-question-api.js
; Author: Professor Krasso
; Date: 16 April 2021
; Modified By: Brooklyn Hairston, Dan Ross, Juvenal Gonzalez
; Description: Security question router
; ==============================
*/

//require statements
const express = require("express");
const SecurityQuestion = require("../models/security-question");
const BaseResponse = require("../services/base-response");
const ErrorResponse = require("../services/error-response");

//create router
const router = express.Router();

/**
 * API FindAllSecurityQuestions
 * @param
 * @returns securityQuestions document
 */

router.get("/", async (req, res) => {
  try {
    SecurityQuestion.find({})
      .where("isDisabled")
      .equals(false)
      .exec(function (err, securityQuestions) {
        if (err) {
          console.log(err);
          const findAllMongodbErrorResponse = new ErrorResponse(
            500,
            "internal server error",
            err
          );
          res.status(500).send(findAllMongodbErrorResponse.toObject());
        } else {
          console.log(securityQuestions);
          const findAllResponse = new BaseResponse(
            200,
            "Query successful",
            securityQuestions
          );
          res.json(findAllResponse.toObject());
        }
      });
  } catch (e) {
    console.log(e);
    const findAllCatchErrorResponse = new ErrorResponse(
      500,
      "Internal server error",
      e.message
    );
    res.status(500).send(findAllCatchErrorResponse.toObject());
  }
});

/**
 * FindById API
 * @param id
 * @returns matching Id question
 */
 router.get('/:id', async(req,res) => {
  try{
      SecurityQuestion.findOne({'_id': req.params.id}, function(err,securityQuestion){
         if(securityQuestion){
            if(err){
                console.log(err);
                const findByIdMongodbErrorResponse = new ErrorResponse(500,'Internal server error', err);
                res.status(500).send(findByIdMongodbErrorResponse.toObject());
            } else {
                console.log(securityQuestion);
                const findByIdResponse = new BaseResponse(200,'Query Successful', securityQuestion);
                res.json(findByIdResponse.toObject());
            }}
         else{
          console.log(err);
          const findByIdMongodbNoMatch = new ErrorResponse(500,'ID does not match', err);
          res.status(500).send(findByIdMongodbNoMatch.toObject());
         }
      })
  }  catch(e){
      console.log(e);
      const findByIdCatchErrorResponse = new ErrorResponse(500,'internal server error', e);
      res.status(500).send(findByIdCatchErrorResponse.toObject());
  }

});


/**
 * CreateSecurityQuestion API
 * @returns A new security question record or null
 * @description Creates and adds a new security question to the security question model with a post request or returns an error message
 */

router.post('/', async (req, res) => {
  try {
    let newSecurityQuestion = {
      text: req.body.text,
    };

    SecurityQuestion.create(newSecurityQuestion, function (err, securityQuestion) {
        if (err) {
          console.log(err);
          const createSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err );
          res.status(500).send(createSecurityQuestionMongodbErrorResponse.toObject());
        }
         else
         {
          console.log(securityQuestion);
          const createSecurityQuestionResponse = new BaseResponse(200, 'Query successful', securityQuestion);
          res.json(createSecurityQuestionResponse.toObject());
        }
      })
  }
  catch (e) {
    console.log(e);
    const createSecurityQuestionCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(createSecurityQuestionCatchErrorResponse.toObject());
  }
});

/**
 * UpdateSecurityQuestion API
 * @param id
 * @returns Updated Security Question
 */

  router.put("/:id", async(req, res) => {
      try{
         SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion) {
          if(err)
          {
            console.log(err);
            const updateSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal sever error', err);
            res.status(500).send(updateSecurityQuestionMongodbErrorResponse.toObject());
          }
          else
          {
            console.log(securityQuestion);

            securityQuestion.set({
                text: req.body.text
            });

            securityQuestion.save(function(err, savedSecurityQuestion) {
                if(err)
                {
                  console.log(err);
                  const savedSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal sever error', err);
                  res.status(500).send(savedSecurityQuestionMongodbErrorResponse.toObject());
                }
                else
                {
                  console.log(savedSecurityQuestion);
                  const UpdateSecurityQuestionResponse = new BaseResponse(200, "Query Successful", savedSecurityQuestion);
                  res.json(UpdateSecurityQuestionResponse.toObject());
                }
            })

          }
      })
    }
      catch(e)
      {
        console.log(e);
        const UpdateSecurityQuestionCatchErrorResponse = new ErrorResponse(500, 'Internal Server Error', e.message);
        res.json(UpdateSecurityQuestionCatchErrorResponse.toObject());
      }
  });

/**
 * DeleteSecurityQuestion API
 * @param id
 * @returns an updated security question document with the queried id disabled or a an error message
 * @description queries the security question collection for the document id and sets the isDisabled flag to true
 */

router.delete("/:id", async (req, res) => {
  try {
    SecurityQuestion.findOne(
      { _id: req.params.id },
      function (err, securityQuestion) {
        if (err) {
          console.log(err);
          const deleteSecurityQuestionMongodbErrorResponse = new ErrorResponse(
            500,
            "Internal server error",
            err
          );
          res
            .status(500)
            .send(deleteSecurityQuestionMongodbErrorResponse.toObject());
        } else {
          console.log(securityQuestion);

          securityQuestion.set({
            isDisabled: true,
          });

          securityQuestion.save(function (err, savedSecurityQuestion) {
            if (err) {
              console.log(err);
              const savedSecurityQuestionMongodbErrorResponse = new ErrorResponse(
                500,
                "Internal server error",
                err
              );
              res
                .status(500)
                .send(savedSecurityQuestionMongodbErrorResponse.toObject());
            } else {
              console.log(savedSecurityQuestion);
              const deleteSecurityQuestionResponse = new BaseResponse(
                200,
                "Query successful",
                savedSecurityQuestion
              );
              res.json(deleteSecurityQuestionResponse.toObject());
            }
          });
        }
      }
    );
  } catch (e) {
    console.log(e);
    const deleteSecurityQuestionCatchErrorResponse = new ErrorResponse(
      500,
      "Internal server error",
      e.message
    );
    res.status(500).send(deleteSecurityQuestionCatchErrorResponse.toObject());
  }
});

module.exports = router;
