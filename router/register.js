const express = require('express');
const router = express.Router();
const userRegisterModel = require('../model/userRegisterModel');

//?MIDDLEWARE
const authenticationMW = require('../middleware/authentication');

router.post('/', authenticationMW, (req, res) => {
  //TODO: checking user data to save with model
  const userDataToSave = new userRegisterModel({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });
  userDataToSave
    .save()
    .then((data) => {
      res.status(200).json({
        message: 'success',
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: 'error',
      });
    });
});
module.exports = router;
