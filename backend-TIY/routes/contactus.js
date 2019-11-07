var express = require('express');
var router = express.Router();
var Joi = require('joi');
var logger = require('../services/logger');
var config = require('../config');
var contactus = require('../functions/contactus');
const rest = require('restler');

router.post('/', (req, res) => {
    const email = req.body.email;
    const message = req.body.message;
    const subject = req.body.subject;
    const name = req.body.yourname;

    const reqValidation = Joi.object().keys({
        subject: Joi.string().required(),
        message: Joi.string().max(4000).required(),
        name: Joi.string().required(),
        email: Joi.string().email({ minDomainAtoms: 2 }).required()
    });

    const result = Joi.validate({
        email: email,
        message: message,
        name: name,
        subject: subject
    }, reqValidation);

    if (result.error !== null) {
        logger.error(`Validation error for user:${email}`, result.error);
        res.status(400).json({ message: 'Invalid Request !' });
    } else {

        let msg = 'Hi ' + name + '\n \t Thank you for sharing your details. We will reply to you as soon as possible.';
        var data = {
            "emailid": email,
            "name": name,
            "sub": 'Contact Details Received Confirmation.',
            "msg": msg
        };

        let contactusDomain = config.contactusDomain;
        if (process.env.TIY_ENV === 'prod') {
            contactusDomain = config.contactusProdDomain;
        }

        rest.postJson(contactusDomain, data, { timeout: 10000 })
            .on('timeout', function (ms) {
                //console.log('did not return within ' + ms + ' ms');
                logger.err(`user=>${email} did not return within ${ms} ms`);
                // resolve({ status: 500, message: 'Issue with the server,Please Try after sometime !' });
            })
            .on('complete', function (data, response) {
                // handle response
                //console.log(data);
                //console.log(response);
                logger.info(`Sent the response confirmation from email server with data=>${data} to user:${email}`);
                contactus.updateSentEmailStatus(name, email, subject, message, true);
                // resolve({ status: 200, message: 'Got Your contact details. We will reply you within 2-3 working days.' });
            });
        contactus.saveContact(name, email, subject, message)
            .then(result => {
                res.status(result.status).json({ message: result.message })
            })
            .catch(err => {
                LOG.error(` error in saving user=>${email} contact details:`, err);
                res.status(err.status).json({ message: err.message })
            });
    }

});

module.exports = router;