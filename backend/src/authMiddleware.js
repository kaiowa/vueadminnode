var express = require('express');
const bcrypt = require("bcrypt");
var config=require('./config');
var jwt = require('jsonwebtoken');

const rulesAuth = (req, res, next) => {
  let token = (req.headers && req.headers.authorization) ? req.headers.authorization : null;
  // decode del tocken
  if (token) {
    token=token.substring(7, token.length);
    // verifica secret 
    jwt.verify(token, config.secret, (err, decoded) => {
      console.log('decoded:'+JSON.stringify(decoded));
      if (err) {
        return res.status(403).send({
          success: false,
          message: "Failed to authenticate token."
        });
      } else {
        
        next()
      }
    });
  } else {
    // no hay token devuelve error
    return res.status(403).send({
      success: false,
      message: "No token provided."
    });
  }
}
module.exports=rulesAuth