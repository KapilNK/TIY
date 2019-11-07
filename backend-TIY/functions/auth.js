'use strict';

var logger = require('../services/logger');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.verifyJWTToken = (token, email) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.secret, (err, decodedToken) => {
            if (err || !decodedToken) {
                logger.error(`email= ${email}:::err= ${err}`);
                reject({ status: tiyStatus.AUTH_FAILURE, message: tiyStatus.getStatusText(tiyStatus.AUTH_FAILURE) });
            } else if (decodedToken.email !== email) {
                logger.error(`email:${email} }:::err= ${err}`);
                reject({ status: tiyStatus.AUTH_FAILURE, message: tiyStatus.getStatusText(tiyStatus.AUTH_FAILURE) });
            }
            logger.info(`email:${email} has valid token`);
            resolve(decodedToken);
        })
    })
}