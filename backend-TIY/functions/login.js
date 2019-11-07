'use strict';

const user = require('../models/user');
const bcrypt = require('bcryptjs');
const tiyStatus = require('../models/tiy-status-code');

exports.loginUser = (email, password) =>
	new Promise((resolve, reject) => {
		user.find({ email: email })
			.then(users => {
				if (users.length == 0) {
					reject({ status: tiyStatus.USER_NOT_FOUND, message: tiyStatus.getStatusText(tiyStatus.USER_NOT_FOUND) });
				} else {
					return users[0];
				}
			})
			.then(user => {
				const hashed_password = user.passwordHash;
				if (bcrypt.compareSync(password, hashed_password)) {
					user.loggedin=true;
					user.save();
					resolve({ status: tiyStatus.OK, message: user });
				} else {
					reject({ status: tiyStatus.INVALID_CREDENTIALS, message: tiyStatus.getStatusText(tiyStatus.INVALID_CREDENTIALS) });
				}
			})
			.catch(err => reject({ status: err.status, message: err.message }));
	}).catch(error => new Promise((resolve, reject) => reject(error)));

