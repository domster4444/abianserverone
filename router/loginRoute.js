const express = require('express');
const router = express.Router();
const userRegisterModel = require('../model/userRegisterModel');
//?MIDDLEWARE
const authenticationMW = require('../middleware/authentication');
const jwt = require('jsonwebtoken');
router.post('/', authenticationMW, (req, res) => {
  userRegisterModel
    .find({
      email: `${req.body.data.email}`,
      password: `${req.body.data.password}`,
    })
    .then((result) => {
      //?if mongoAtlas finds it will be send res else it will throw error
      if (
        result[0].email === req.body.data.email &&
        result[0].password === req.body.data.password
      ) {
        // json web token creation on success
        let userId = result[0]._id;
        // const createTokenNdSend = async () => {
        //   const token = await jwt.sign(
        //     { userId },
        //     'thefuckingsecretkeymustbemorethanthirtytwo',
        //     {
        //       expiresIn: '15s',
        //     },
        //     function (err, token) {
        //       if (err) {
        //         console.log(err);
        //       } else {
        //         console.log(token);

        //       }
        //     }
        //   );
        // };
        // createTokenNdSend();

        //sending response on success
        res.status(200).json({
          message: 'available',
          accountHolder: result[0].userName,
          // token: token,
        });
      }
    })
    .catch((error) => {
      //?it sends error of 400 that is caught by axios .catch in client
      res.status(400).json({
        message: 'na na bete',
      });
    });
});
module.exports = router;
