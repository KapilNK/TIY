var express = require('express');
var router = express.Router();
var logger = require('../services/logger');
const logout = require('../functions/logout');
const Joi = require('joi');
const config = require('../config');

router.post('/:email', (req, res) => {
    logger.info(`logging out the user with emailid:${req.user.email}`);
  //  console.log("----------------------------------------------");
    const email = req.body.email;
    const schema = Joi.object().keys({
        email: Joi.string().email({ minDomainAtoms: 2 }).required()
    });

    const result = Joi.validate({
        email: email,
    }, schema);
    //console.log("result=>", result);
    if (result.error !== null) {
        logger.error(`error on logging out the user with emailid:${req.user.email}, with result ${result}`);
        res.status(400).json({ message: 'Invalid Request !' });
    } else {
    //res.cookie('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhamVzaHBkc2luZ2gxOTkxQGdtYWlsLmNvbSIsImlhdCI6MTU1OTU4ODgzNiwiZXhwIjoxNTU5NjMyMDM2LCJhdWQiOiJodHRwOi8vdHJhdmVsbGVyaW55b3UuaW4iLCJpc3MiOiJUSVkiLCJzdWIiOiJyYWplc2hwZHNpbmdoMTk5MUBnbWFpbC5jb20ifQ.sS1R5tK-8VhEUAjwHejdkbV1nDnzxPOtqOLNNMP3YCQ', '', { expires: new Date(1), path: '/', httpOnly: false });
    //res.cookie('access_token', '', { expires: new Date(1), path: '/' });
    logout.logout(email)
        .then(result=> {
            //console.log(res.clearCookie('access_token', { path: '/',domain: '.localhost.in' }));
            logger.info(res.clearCookie('access_token', { path: '/',domain: config.domain }));
            res.status(result.status).json({ message: result.message });
        })
        .catch(error => res.status(error.status).json({ message: error.message }));
       // console.log("----------------------------------------------");
    //res.clearCookie("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhamVzaHBkc2luZ2gxOTkxQGdtYWlsLmNvbSIsImlhdCI6MTU1OTU4ODgzNiwiZXhwIjoxNTU5NjMyMDM2LCJhdWQiOiJodHRwOi8vdHJhdmVsbGVyaW55b3UuaW4iLCJpc3MiOiJUSVkiLCJzdWIiOiJyYWplc2hwZHNpbmdoMTk5MUBnbWFpbC5jb20ifQ.sS1R5tK-8VhEUAjwHejdkbV1nDnzxPOtqOLNNMP3YCQ");
    }
});

module.exports = router;