
const Joi = require('joi');
const logger = require('../services/logger');
const user_access = require('./auth');

exports.verifyJWT_MW = function (req, res, next) {

    console.log("req logout:",req);
    let email = (req.method === 'POST') ? req.body.email : req.query.email
    //console.log(req.cookies.access_token);
   // console.log(res.cookies.token);
    const access_token = req.cookies.access_token;
    logger.info(`authenticating the service for emailid=${email}`)
    const schema = Joi.object().keys({
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        access_token: Joi.string().required()
    });
    const reqValidation = Joi.validate({
        email: email,
        access_token: access_token
    }, schema);

    if (reqValidation.error !== null) {
        logger.error(`invalid request:::emailid=>${email}:::error=>${reqValidation.error}`);
        res.status(400).json({ message: 'Invalid request !' });
    } else {
        user_access.verifyJWTToken(access_token, email)
            .then((decodedToken) => {
                req.user = decodedToken;
              //  console.log(decodedToken);
                next();
            })
            .catch((err) => {
                res.status(err.status)
                    .json({ message: err.message });
            });
    }
}


exports.verifyJWT_Atlogin = function (req, res, next) {
    
        let email = (req.method === 'POST') ? req.body.email : req.query.email
       // console.log(req.cookies.access_token);
       // console.log(res.cookies.token);
        const access_token = req.cookies.access_token;
        logger.info(`authenticating the service for emailid=${email}`)
        const schema = Joi.object().keys({
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        });
        const reqValidation = Joi.validate({
            email: email,
        }, schema);
    
        if (reqValidation.error !== null) {
            logger.error(`invalid request:::emailid=>${email}:::error=>${reqValidation.error}`);
            res.status(400).json({ message: 'Invalid request !' });
        } else {
            user_access.verifyJWTToken(access_token, email)
                .then((decodedToken) => {
                    req.user = decodedToken;
                   /// console.log(decodedToken);
                    res.status(400)
                    .json({ message: 'User already logged in.' });
                })
                .catch((err) => {
                   next();
                });
        }
    }
