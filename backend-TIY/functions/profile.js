'use strict';

const user = require('../models/user');
const tiystatus = require('../models/tiy-status-code');

exports.getProfile = email => 
	
	new Promise((resolve,reject) => {

		user.find({ email: email }, { name: 1, email: 1, created_at: 1, _id: 0 })

        .then(users => {return users[0];})
        .then(user=>{
            resolve({status: tiystatus.OK,
                 message:{
                     "email": user.email,
                     "firstName":user.firstName,
                     "lastName": user.lastName
                    }})

        })

		.catch(err => reject({ status: tiystatus.INTERNAL_SERVER_ERROR, message: tiystatus.getStatusText(tiystatus.INTERNAL_SERVER_ERROR) }))

	});