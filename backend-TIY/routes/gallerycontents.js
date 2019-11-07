var express = require('express');
var router = express.Router();
var logger = require('../services/logger');
const gallery = require('../functions/gallery');
const Joi = require('joi');

router.get('/', (req, res) => {
  //  logger.info(`getting gallery contents for user:${req.user.email}`);
  //  console.log("----------------------------------------------");

  //const email = req.user.email;
  //sconsole.log("user",email);

  gallery.find()
    .then(result => {
      logger.info(`result of getting all gallery data ${result}`, result);
      var msg = result.message;
      res.status(result.status).json(msg);
    })
    .catch(error => { res.status(error.status).json({ message: error.message }); });
});

module.exports = router;