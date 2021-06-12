const express = require('express');
const router = express.Router();
// ----- attendanceRegisterModel --------
const attendanceRegisterModel = require('../model/attendanceRegisterModel');
const authenticationMW = require('../middleware/authentication');

router.post('/', authenticationMW, (req, res) => {
  console.log(req.body);
  //TODO: checking user data to save with model
  const userDataToSave = new attendanceRegisterModel({
    firstName: req.body.data.firstName,
    lastName: req.body.data.lastName,
    email: req.body.data.email,
    password: req.body.data.password,
  });
  userDataToSave
    .save()
    .then((data) => {
      console.log('user registered  for attendance');
      res.status(200).json({
        message: 'successfully registered user for attendance',
      });
    })
    .catch((error) => {
      console.log('user cannot register for attendance');
      res.status(400).json({
        message: 'error while registrating',
      });
    });
});
module.exports = router;
