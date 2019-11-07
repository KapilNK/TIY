var express = require('express');
var LOG = require('../services/logger');
var router = express.Router();
const Joi = require('joi');
const register = require('../functions/register');


router.post('/submit', (req, res) => {
    const firstname = req.body.firstName;
    const lastname = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    LOG.info(`Registering for user id=>${email}`);

    const schema = Joi.object().keys({
        fistname: Joi.string().alphanum().min(3).max(30).required(),
        lastname: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        email: Joi.string().email({ minDomainAtoms: 2 })
    })

    // Return result.
    const result = Joi.validate({
        fistname: firstname,
        lastname: lastname,
        email: email,
        password: password
    }, schema);
    // result.error === null -> valid
    //console.log('result:', result);
    if (result.error !== null) {
        LOG.error(`Error while validating the params for user=>${email} , with result as ${result}`);
        res.status(400).json({ message: 'Invalid Request !' });
    } else {

        register.registerUser(firstname, lastname, email, password)

            .then(result => {
                res.setHeader('Location', '/users/' + email);
                res.status(result.status).json({ message: result.message })
            })
            .catch(err => {
                LOG.error(` error in registering user=>${email}, with error ${err}`);
                //console.log("error regis rout", err);
                res.status(err.status).json({ message: err.message })
            });
    }
})

module.exports = router;
