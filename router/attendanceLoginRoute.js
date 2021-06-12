const express = require('express');
const router = express.Router();
const attendanceRegisterModel = require('../model/attendanceRegisterModel');
router.post('/', (req, res) => {
  console.log(req.body);

  attendanceRegisterModel
    .find({
      email: `${req.body.data.email}`,
      password: `${req.body.data.password}`,
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      //?it sends error of 400 that is caught by axios .catch in client
      res.status(400).json({
        message: 'error happened while attendance login process',
      });
    });
});

module.exports = router;
