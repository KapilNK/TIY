'use strict';

const user = require('../models/user');
const tiyStatus = require('../models/tiy-status-code');

exports.logout = email =>
	new Promise((resolve, reject) => {
		user.find({ email: email })
			.then(users => {
				return users[0];
			})
			.then(user => {
				user.loggedin = false;
				return user.save();
			})
			.then(user => resolve({ status: 200, message: 'User logout Sucessfully !' }))
			.catch(err => reject({ status: 500, message: 'Internal Server Error !' }));
	});