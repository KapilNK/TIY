//import { error } from 'winston';

var express = require('express');
var router = express.Router();
var Joi = require('joi');
var logger = require('../services/logger');
var passwordFn = require('../functions/password');

router.post('/forgetpassword', (req, res) => {

    const email = req.body.email;
    logger.info(`initiating password reset for emailid:${email}`);
    const schema = Joi.object().keys({
        email: Joi.string().email({ minDomainAtoms: 2 }).required()
    });

    const reqValidation = Joi.validate({
        email: email
    }, schema);

    if (reqValidation.error !== null) {
        logger.error(`invalid request:::emailid=>${email}:::error=>${reqValidation.error}`);
        res.status(400).json({ message: 'Invalid request !' });
    } else {
        logger.info(`sending req emailid:${email}`);
        passwordFn.forgetPassword(email)
            .then(result => {
                res.status(result.status).json({ message: result.message });
            })
            .catch(error => { res.status(error.status).json({ message: error.message }) });
    }

});

router.post('/resetp', (req, res) => {
    const random_token = req.body.num;
    const email = req.body.email;
    const password = req.body.password;
    const reqValidation = Joi.object().keys({
        random_token: Joi.string().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        email: Joi.string().email({ minDomainAtoms: 2 }).required()

    });

    const result = Joi.validate({
        email: email,
        password: password,
        random_token: random_token
    }, reqValidation);

    if (result.error !== null) {
        res.status(400).json({ message: 'Invalid Request !' });
    } else {
        passwordFn.resetPasswordFinish(email, random_token, password)
            .then(result => { 
                res.status(result.status).json({ message: result.message }); })
            .catch(error => { res.status(error.status).json({ message: error.message }); })
    }

});


module.exports = router;