var express = require('express');
var router = express.Router();
const Joi = require('joi');
const login = require('../functions/login');
var LOG = require('../services/logger');
const jwt = require('jsonwebtoken');
const config = require('../config');
const logger = require('../services/logger');

router.post('/authenticate', (req, res) => {

    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    const email = req.body.email;
    const password = req.body.password;
    logger.info(`authenticating email=> ${email}`);
    //console.log("ema", email);

    //console.log("pass", password);
    const schema = Joi.object().keys({
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        email: Joi.string().email({ minDomainAtoms: 2 }).required()
    });

    const result = Joi.validate({
        email: email,
        password: password
    }, schema);
    //console.log("result=>", result);
    if (result.error !== null) {
        logger.error(`invalid request for email=> ${email} with result=> ${result}`);
        res.status(400).json({ message: 'Invalid Request !' });
    } else {
        login.loginUser(email, password)
            .then(result => {
                logger.debug(`login user result for email=> ${email} , result=>${result}`);
                //TODO generte private-public key for prod
                //https://medium.com/@siddharthac6/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e
                var payload = {
                    email: result.message.email,
                    firstName: result.message.firstName
                };
                var signOptions = {
                    issuer: config.issuer,
                    subject: result.message.email,
                    audience: config.audience,
                    expiresIn: config.expiresIn,
                };
                const token = jwt.sign(payload, config.secret, signOptions);
                //console.log("token=>", token);
                logger.debug(`token for email=> ${email} is token=> ${token}`);
                //TODO  httpOnly: true,
                //  secure: true      // for your production environment
                // { maxAge: 900000, httpOnly: true }
                //console.log("",process.env.NODE);
                logger.info(`environment=> ${process.env.TIY_ENV}`);
                if (process.env.TIY_ENV === 'prod') {
                    res.cookie("access_token", token, { maxAge: 43200000, httpOnly: true, secure: true, domain: config.domain, path: '/', overwrite: true });//12 hours valid.     
                } else {
                    res.cookie("access_token", token, { maxAge: 43200000, domain: config.domain, path: '/', overwrite: true });//12 hours valid.
                   // res.cookie("access_token", token, { maxAge: 43200000, path: '/', overwrite: true });//12 hours valid.
                }
            
                res.status(result.status).json({
                    firstName:result.message.firstName,
                    email : result.message.email,
                    lastName: result.message.lastName,
                    token: token
                });

            })
            .catch(err => res.status(err.status).json({ message: err.message }));
    }
});

module.exports = router;