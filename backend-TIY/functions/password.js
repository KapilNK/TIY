//import { error } from 'util';
//import { Promise } from 'mongoose';

'use strict';

const user = require('../models/user');
const bcrypt = require('bcryptjs');
//const nodemailer = require('nodemailer');
const randomstring = require("randomstring");
const config = require('../config');
const tiyStatus = require('../models/tiy-status-code');
const rest = require('restler');
var logger = require('../services/logger');


exports.updatePassword = (email, password, newPassword) =>

	new Promise((resolve, reject) => {

		user.find({ email: email })

			.then(users => {
				//check for existence of user.
				let user = users[0];
				const hashed_password = user.passwordHash;

				if (bcrypt.compareSync(password, hashed_password)) {

					const salt = bcrypt.genSaltSync(10);
					const hash = bcrypt.hashSync(newPassword, salt);

					user.passwordHash = hash;

					return user.save();

				} else {

					resolve({ status: tiyStatus.INVALID_OLD_PASSWORD, message: tiyStatus.getStatusText(tiyStatus.INVALID_OLD_PASSWORD) });
				}
			})

			.then(user => resolve({ status: tiyStatus.OK, message: 'Password Updated Sucessfully !' }))

			.catch(err => resolve({ status: tiyStatus.INTERNAL_SERVER_ERROR, message: tiyStatus.getStatusText(tiyStatus.INTERNAL_SERVER_ERROR) }));

	});

exports.forgetPassword = email =>

	new Promise((resolve, reject) => {

		const random = randomstring.generate(8);

		user.find({ email: email })

			.then(users => {

				if (users.length == 0) {

					resolve({ status: 404, message: 'User Not Found !' });

				} else {

					let user = users[0];


					//user.temp_password = hash;
					//user.temp_password_time = new Date();
					let query = "email=" + email + "&num=" + random;
					let resetpDomain = config.resetpLocalDomain;
					if (process.env.TIY_ENV === 'prod') {
						resetpDomain = config.resetpDomain;
					}
					let link = resetpDomain + "?" + query;
					var data = {
						"emailid": email,
						"name": user.firstName,
						"sub": "PASSWORD RESET in TIY",
						"msg": "here is the link to reset password :" + link
					};
					let contactusDomain = config.contactusDomain;
					if(process.env.TIY_ENV==='prod'){
						contactusDomain = config.contactusProdDomain;
					}
					rest.postJson(contactusDomain, data, { timeout: 10000 })

						.on('timeout', function (ms) {
							//console.log('did not return within ' + ms + ' ms');
							logger.err(`user=>${email} did not return within ${ms} ms`)
							resolve({ status: 500, message: 'Issue with the server,Please Try after sometime !' });
						})

						.on('complete', function (data, response) {
							// handle response
							//console.log(data);
							//console.log(response);
							logger.info(`got respone from email server=>${response} with data=>${data}`);
							user.resetPassword = true;
							user.resetPasswordTime = new Date();
							user.resetPasswordToken = random;
							user.save()
								.catch(error => {
									//console.log(error);
									logger.error(`not able to save user=>${email} forgetpass info with err:=>${error}`)
								});
						});
					resolve({ status: 200, message: 'Check mail for instructions' })
				}
			})

			.catch(err => {
				logger.error(`internal server error for user=>${email} with err:=>${err}`)
				resolve({ status: 500, message: 'Internal Server Error !' });

			});
	}).catch(error => new Promise((resolve, reject) => {
		logger.error(`exception for user=>${email} with err:=>${err}`)
		resolve({ status: 500, message: 'Internal Server Error !' });
	}));

exports.resetPasswordFinish = (email, token, password) =>

	new Promise((resolve, reject) => {

		user.find({ email: email })

			.then(users => {
				if (users.length == 0) {

					resolve({ status: 404, message: 'User Not Found !' });
				}

				let user = users[0];

				if (!user.resetPassword) {
					reject({ status: 402, message: 'Sorry, Please start again the reset password process !' });
				}

				if (!(user.resetPasswordToken === token)) {
					reject({ status: 403, message: 'Sorry, Invalid User !' });
				}

				const diff = new Date() - new Date(user.resetPasswordTime);
				const seconds = Math.floor(diff / 1000);
				logger.debug(`seconds for user=>${email} is ${seconds}`);
				if (seconds < 120) {
					return user;
				} else {
					reject({ status: 401, message: 'Time Out ! Try again' });
				}
			})
			.then(user => {
				user.resetPassword = false;
				user.resetPasswordTime = undefined;
				user.resetPasswordToken = undefined;
				const salt = bcrypt.genSaltSync(10);
				const hash = bcrypt.hashSync(password, salt);
				user.passwordHash = hash;
				return user.save();
			})
			.then(user => resolve({ status: 200, message: 'Password Changed Sucessfully !' }))
			.catch(err => reject({ status: 500, message: 'Internal Server Error !' }));
	});