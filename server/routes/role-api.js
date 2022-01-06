/*
; ==============================
; Title: role-api.js
; Author: Professor Krasso
; Date: 29 April 2021
; Modified By: Brooklyn Hairston, Dan Ross, Juvenal Gonzalez
; Description: Role router
; ==============================
*/

//require statements
const express = require("express");
const Role = require("../models/role");
const User = require("../models/user");
const ErrorResponse = require("../services/error-response");
const BaseResponse = require("../services/base-response");
const router = express.Router();

/**
 * FindAll
 * @returns A list of roles
 * @description Queries the roles collection to for all roles where isDisabled is set to false
 */

router.get("/", async (req, res) => {
  try {
    Role.find({})
      .where("isDisabled")
      .equals(false)
      .exec(function (err, roles) {
        if (err) {
          console.log(err);
          const findAllRolesMongodbErrorResponse = new ErrorResponse(
            "500",
            "Internal server error",
            err
          );
          res.status(500).send(findAllRolesMongodbErrorResponse.toObject());
        } else {
          console.log(roles);
          const findAllRoleResponse = new BaseResponse(
            "200",
            "Query successful",
            roles
          );
          res.json(findAllRoleResponse.toObject());
        }
      });
  } catch (e) {
    console.log(e);
    const findAllRolesCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );
    res.status(500).send(findAllRolesCatchErrorResponse.toObject());
  }
});

/**
 * UpdateRole
 * @returns An updated role document
 * @description Queries the roles collection by the roleId and updates the record
 */

router.put("/:roleId", async (req, res) => {
  try {
    Role.findOne({ '_id': req.params.roleId }, function (err, role) {
      if (err) {
        console.log(err);
        const updateRoleMongodbErrorResponse = new ErrorResponse(
          "500",
          "Internal server error",
          err
        );
        res.status(500).send(updateRoleMongodbErrorResponse.toObject());
      } else {
        console.log(role);
        role.set({
          text: req.body.text,
        });

        role.save(function (err, updatedRole) {
          if (err) {
            console.log(err);
            const updatedRoleMongodbErrorResponse = new ErrorResponse(
              "500",
              "internal server error",
              err
            );
            res.status(500).send(updatedRoleMongodbErrorResponse.toObject());
          } else {
            console.log(updatedRole);
            const updatedRoleResponse = new BaseResponse(
              "200",
              "Query successful",
              updatedRole
            );
            res.json(updatedRoleResponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    const updatedRoleCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );
    res.status(500).send(updatedRoleCatchErrorResponse.toObject());
  }
});

/**
 * findById
 * @params roleId
 * @returns matching role
 */

router.get('/:roleId', async(req,res) => {
    try {
      Role.findOne({'_id': req.params.roleId} , function(err,role)
       {
        if(err)
        {               //outputs internal error
          console.log(err);
          const findRoleByIdMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
          res.status(500).send(findRoleByIdMongoDbErrorResponse.toObject());
        }
        else
        {          //successful query outputs matching role object
          console.log(role);
          const findRoleByIdResponse = new BaseResponse('200', "Query Successful", role);
          res.json(findRoleByIdResponse.toObject());
        }
       })
    }
    catch(e){
          console.log(e);  //interal server error catch
          const findRoleByIdCatchErrorResponse = new ErrorResponse('500', "Internal Server Error", e.message);
          res.status(500).send(findRoleByIdCatchErrorResponse.toObject());
    }
});

/**
 * CreateRole
 * @returns A new role record or null
 * @description Creates and adds a new role
 */
 router.post("/", async (req, res) => {
  try {
    const newRole = {
      text: req.body.text,
    };

    Role.create(newRole, function (err, role) {
      if (err) {
        console.log(err);
        const createRoleMongodbErrorResponse = new ErrorResponse(
          "500",
          "Internal server error",
          err
        );
        res.status(500).send(createRoleMongodbErrorResponse.toObject());
      } else {
        console.log(role);
        const createRoleResponse = new BaseResponse(
          "200",
          "Query Successful",
          role
        );
        res.json(createRoleResponse.toObject());
      }
    });
  } catch (e) {
    console.log(e);
    const createRoleCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );
    res.status(500).send(createRoleCatchErrorResponse.toObject());
  }
});

/**
 * DeleteRole API
 * @param roleId
 */

router.delete('/:roleId', async(req,res) => {
    try{
      Role.findOne({'_id': req.params.roleId}, function (err, role)
      {
          if(err)
          {
            console.log(err);
            const deleteRoleMongodbErrorResponse = new ErrorResponse('500', "Internal Server Error", err);
            res.status(500).send(deleteRoleMongodbErrorResponse.toObject());
          }
          else
          {
            console.log(role);
                     //checks if any users are assigned this role
            User.aggregate(
              [
                {
                    $lookup:
                    {
                      from: 'roles',
                      localField: 'role.role',
                      foreignField: 'text',
                      as: 'userRoles'
                    }
                },
                {
                   $match:
                   {
                      'userRoles.text': role.text
                   }
                }
              ], function(err, users)
              {
                if (err)
                {
                    console.log(err);
                    const usersMongodbErrorResponse = new ErrorResponse('500', "Internal server error", err);
                    res.status(500).send(usersMongodbErrorResponse.toObject());
                }
                else{    //if above query finds the role in use it will halt deletion
                    if (users.length > 0)
                    {
                      console.log(`Role , <${role.text}> is currently being used by a user and cannot be deleted`);
                      const userAlreadyInUseRespoonse = new BaseResponse('200', `<${role.text}> is currently being used by a user and cannot be deleted`, role);
                      res.json(userAlreadyInUseRespoonse.toObject());
                    }//no user using role and successfull deletion
                    else
                    {
                      console.log(`Role <${role.text}> is not in use and can be removed`);

                      role.set({isDisabled: true});

                      role.save(function(err,updatedRole) {
                          if(err)
                          {
                            console.log(err);
                            const updatedRoleMongodbErrorResponse = new ErrorResponse('500', "Internal server error", err);
                            res.status(500).send(updatedRoleMongodbErrorResponse.toObject());
                          }
                          else{
                              console.log(updatedRole);
                              const roleDeletedResponse = new BaseResponse('200', `Role <${role.text}> has been removed successfully`, updatedRole);
                              res.json(roleDeletedResponse.toObject());
                          }
                      })
                    }

                }
              }
            )
          }
      })
    }
    catch(e){
        console.log(e);
        const deleteRoleMongodbErrorResponse = new ErrorResponse('500', "Internal Server error", e.message);
        res.status(500).send(deleteRoleMongodbErrorResponse.toObject());
    }
})

module.exports = router;
