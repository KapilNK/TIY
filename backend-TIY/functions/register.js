'use strict';

const user = require('../models/user');
const bcrypt = require('bcryptjs');
const tiyStatus = require('../models/tiy-status-code');
var LOG = require('../services/logger');

exports.registerUser = (firstName, lastName, email, password) => {
	LOG.debug("Called registered funct.");
	return new Promise((resolve, reject) => {

		const salt = bcrypt.genSaltSync(10);

		const hash = bcrypt.hashSync(password, salt);

		const newUser = new user({

			firstName: firstName,
			lastName: lastName,
			email: email,
			passwordHash: hash,
			created_at: new Date()
		});

		newUser.save()

			.then(() => {
				resolve({ status: tiyStatus.USER_REGISTERED, message: tiyStatus.getStatusText(tiyStatus.USER_REGISTERED) })
			})
			.catch(err => {
				LOG.error(`error in register func ${err} for email ${email}`);

				if (err.code == 11000) {
					//err.errmsg
					reject({ status: tiyStatus.USER_ALREADY_REGISTERED, message: tiyStatus.getStatusText(tiyStatus.USER_ALREADY_REGISTERED) });

				} else {

					reject({ status: tiyStatus.INTERNAL_SERVER_ERROR, message: tiyStatus.getStatusText(tiyStatus.INTERNAL_SERVER_ERROR) });
				}
			});
	}).catch(error => new Promise((resolve, reject) => {
		LOG.error(`email=>${email} and error is ${error}`);
		reject({ status: tiyStatus.INTERNAL_SERVER_ERROR, message: tiyStatus.getStatusText(tiyStatus.INTERNAL_SERVER_ERROR) });
	}));
}
