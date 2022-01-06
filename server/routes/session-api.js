/*
; ==============================
; Title: session-api.js
; Author: Professor Krasso
; Date: 16 April 2021
; Modified By: Juvenal Gonzalez, Dan  Ross, Brooklyn Hairston
; Description: API to handle SignIn requests
; ==============================
*/

const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const ErrorResponse = require("../services/error-response");
const BaseResponse = require("../services/base-response");


const saltRounds = 10;

const router = express.Router();

/// route: api/session

/**
 * API SignIn
 * @param username
 * @param password
 * Used for Sign In Process
 */
router.post("/signin", async (req, res) => {
  try {
    User.findOne({ userName: req.body.userName }, function (err, user) {
      if (err) {
        console.log(err);
        const signInMongodbErrorResponse = new ErrorResponse(
          500,
          "internal server error",
          err
        );
        res.status(500).send(signInMongodbErrorResponse.toObject());
      } else {
        console.log(user);

        //valid userName
        if (user) {
          let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
          ); //compares the encrypted value to what user.passwords encrypted value would be without ever actually using the base string value of password

          //if password is valid and username is valid
          if (passwordIsValid) {
            console.log("login successful");
            const signinResponse = new BaseResponse(
              200,
              "Login Successful",
              user
            );
            res.json(signinResponse.toObject());
          } //invalid password
          else {
            console.log(`Invalid password for Username: ${user.userName}`);
            const invalidPasswordResponse = new BaseResponse(
              401,
              "Invalid password, please try again!",
              null
            );
            res.status(401).send(invalidPasswordResponse.toObject());
          }
        } //invalid username
        else {
          console.log(`Username: ${req.body.userName} is invalid`);
          const invalidUserNameResponse = new BaseResponse(
            200,
            "Invalid username, please try again!",
            null
          );
          res.status(200).send(invalidUserNameResponse.toObject());
        }
      }
    });
  } catch (e) {
    console.log(e);
    const signInCatchErrorResponse = new ErrorResponse(
      500,
      "Internal server error",
      e.message
    );
    res.status(500).send(signInCatchErrorResponse.toObject());
  }
});

/**
 * VerifySecurityQuestions
 * Compare the answers given to the security questions to the actual answers on their account.
 * This is part of the forgot password process
 */

router.post("/verify/users/:userName/security-questions", async (req, res) => {
  try {
    //First, search for the user by username
    User.findOne({ userName: req.params.userName }, function (err, user) {
      if (err) {
        console.log(err);
        const verifySecurityQuestionsMongodbErrorReponse = new ErrorResponse(
          "500",
          "Internal server error",
          err
        );
        res
          .status(500)
          .send(verifySecurityQuestionsMongodbErrorReponse.toObject());
      } else {
        console.log(user);


        const selectedSecurityQuestionOne = user.selectedSecurityQuestions.find(
          (q) => q.questionText === req.body.questionText1
        );
        const selectedSecurityQuestionTwo = user.selectedSecurityQuestions.find(
          (q2) => q2.questionText === req.body.questionText2
        );
        const selectedSecurityQuestionThree = user.selectedSecurityQuestions.find(
          (q3) => q3.questionText === req.body.questionText3
        );

        //Compare the answers on their account with the answers they gave in the form and make sure they match up.
        const isValidAnswerOne =
          selectedSecurityQuestionOne.answerText === req.body.answerText1;
        const isValidAnswerTwo =
          selectedSecurityQuestionTwo.answerText === req.body.answerText2;
        const isValidAnswerThree =
          selectedSecurityQuestionThree.answerText === req.body.answerText3;

        //If the answers are valid.
        if (isValidAnswerOne && isValidAnswerTwo && isValidAnswerThree) {
          console.log(
            `User ${user.userName} answered their security questions correctly.`
          );
          const validSecurityQuestionsResponse = new BaseResponse(
            "200",
            "success",
            user
          );
          res.json(validSecurityQuestionsResponse.toObject());
        } else {
          //if the answers are not valid.
          console.log(
            `User ${user.userName} did not answer their security questions correctly`
          );
          const invalidSecurityQuestionsResponse = new BaseResponse(
            "200",
            "error",
            user
          );
          res.json(invalidSecurityQuestionsResponse.toObject());
        }
      }
    });
  } catch (e) {
    console.log(e);
    const verifySecurityQuestionsCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );
    res.status(500).send(verifySecurityQuestionsMongodbErrorReponse.toObject());
  }
});

/**
 * VerifyUser API
 * @returns Verifies the userName or an error
 * @description Queries the database for the userName and verify the userName is valid
 */
router.get('/verify/users/:userName', async (req, res) => {
  try
  {
    User.findOne({'userName': req.params.userName}, function(err, user)
    {
      if (err)
      {
        console.log(err);
        const verifyUserMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(verifyUserMongodbErrorResponse.toObject());
      }
      else
        if (user) {
          console.log(user);
          const verifyUserResponse = new BaseResponse('200', 'Query successful', user);
          res.status(200).send(verifyUserResponse.toObject());
        } else
        {
          console.log('Invalid username');
          const invalidUserNameResponse = new ErrorResponse('401', 'Username is invalid', null)
          res.status(401).send(invalidUserNameResponse.toObject());
        }
    })
  }
  catch (e)
  {
    console.log(e);
    const verifyUserCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(verifyUserCatchErrorResponse.toObject());
  }
});

/**
 * Register API
 * @param userName
 * @returns new User object
 */

router.post('/register', async(req,res) => {
  try{
      User.findOne({'userName': req.body.userName}, function (err,user)
      {
        if(err)
        {          //Server Error
          console.log(err);
          const registerUserMongodbEroorResponse = new ErrorResponse('500', 'Internal Server Error', err);
          res.status(500).send(registerUserMongodbEroorResponse.toObject());
        }
        else
        {             //successful query
           if(!user)//No matching userName in Database
           {
             let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
             standardRole = {
                role:'standard'
             }

             questionsObject = req.body.selectedSecurityQuestions;



             console.log(questionsObject,"-------------------------------------------------------------------");

             let registeredUser = {    //uses the returned json object from a post call to create a User
                userName: req.body.userName,
                password: hashedPassword,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                email: req.body.email,
                role: standardRole,
                selectedSecurityQuestions: req.body.selectedSecurityQuestions
             };
                     // .create is a built in function from Mongo db that allows an object to be inserted into the document store
             User.create(registeredUser, function(err, newUser)
             {
                if(err)
                {
                  console.log(err);
                  const newUserMongodbErrorResponse = new ErrorResponse('500', "Internal Server Error", err);
                  res.status(500).send(newUserMongodbErrorResponse.toObject());
                }
                else
                {
                  console.log(newUser);
                  const registeredUserResponse = new ErrorResponse('200', 'Query Successful', newUser);
                  res.json(registeredUserResponse.toObject());
                }
             })
           }
        else
        {            //USERNAME is alreayd in USE
           console.log('This username has already been registered!');
           const userAlreadyExistsErrorResponse = new ErrorResponse('500', "User already exists in database", null);
           res.status(500).send(userAlreadyExistsErrorResponse.toObject());
        }
      }
    })
  }catch(e)
  {
      console.log(e); //Server error Catch
      const registeredUserCatchResponse = new ErrorResponse('500', 'Internal Server Error', e.message);
      res.status(500).send(registeredUserCatchResponse.toObject());
  }
      });


     /**
 * ResetPassword API
 * @params userName
 * @returns new password
 */

  router.post('/users/:userName/reset-password', async(req, res) => {
    console.log('HERE');
   try{
       console.log('here2');
       const password = req.body.password;

        User.findOne({'userName': req.params.userName}, function(err, user)
        {
          if (err)
          {
            console.log(err);//SERVER ERROR
            const ResetPasswordErrorRespons = new ErrorResponse('500', "Internal Server Error", err);
            res.status(500).send(ResetPasswordErrorRespons.toObject());
          }
          else if(User)     //checks for user
          {
            console.log(user);

            let hashedPassword = bcrypt.hashSync(password, saltRounds);

            user.set({  //sends encrypted value instead of actual password
               password: hashedPassword
            });

                // .save is a mongoDb funtion to store documents in a document store
            user.save(function(err, updatedUser)
            {
               if(err)
               {
                 console.log(err);
                 const updatedUserMongodbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);
                 res.status(500).send(updatedUserMongodbErrorResponse.toObject());
               }
               else
               {     //successful update of password
                console.log(updatedUser);
                const updatedPasswordResponse = new ErrorResponse('200', 'Successfull query', updatedUser);
                res.json(updatedPasswordResponse.toObject());
               }
            })
          }
          else
          {    //invalid USERNAME
            console.log('Username does not exist!');
            const noUserResponse = new BaseResponse('200', 'User does not exist!', req.params.userName);
            res.json(noUserResponse.toObject());
          }
        })
   }
   catch(e)
   {
     console.log(e);  //Internal server error catch
     const ResetPasswordCatchError = new ErrorResponse('500', 'Internal Server Error', e);
     res.status(500).send(ResetPasswordCatchError.toObject());
   }
});




module.exports = router;



