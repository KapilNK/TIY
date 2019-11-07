'use strict';

const user_contact_details = require('../models/contactus');
const tiyStatus = require('../models/tiy-status-code');
var LOG = require('../services/logger');

exports.saveContact = (name, email, subject, message) => {
    LOG.info(`Saving contact details of user: ${email}`);
    return new Promise((resolve, reject) => {

        const contactDetails = new user_contact_details({
            name: name,
            subject: subject,
            email: email,
            message: message,
            sent_at: new Date()
        });

        contactDetails.save()

            .then(() => {
                resolve({ status: tiyStatus.CONTACT_DETAILS_SAVED, message: tiyStatus.getStatusText(tiyStatus.CONTACT_DETAILS_SAVED) })
            })
            .catch(err => {
                LOG.error(`error in saving contact info of user:${email}`, err);
                if (err.code == 11000) {
                    //err.errmsg
                    resolve({ status: tiyStatus.CONTACT_ALREADY_EXISTED, message: tiyStatus.getStatusText(tiyStatus.CONTACT_ALREADY_EXISTED) });
                } else {
                    resolve({ status: tiyStatus.INTERNAL_SERVER_ERROR, message: tiyStatus.getStatusText(tiyStatus.INTERNAL_SERVER_ERROR) });
                }
            });
    }).catch(error => new Promise((resolve, reject) => {
        LOG.error(`email=>${email} and error is `, error);
        resolve({ status: tiyStatus.INTERNAL_SERVER_ERROR, message: tiyStatus.getStatusText(tiyStatus.INTERNAL_SERVER_ERROR) });
    }));
}

exports.updateSentEmailStatus = (name, email, subject, message, emailSentStaus) => {
    LOG.info(`Updating email sent status of user: ${email}`);
    return new Promise((resolve, reject) => {
        user_contact_details.find({ email: email, name: name, subject: subject, message: message })
            .then(contactdetails => {
                //check for existence of user.
                //console.log("contact update",contactdetails);
                let contactinfo = contactdetails[0];
               // console.log("contactinfo update",contactinfo);
                if (contactinfo) {
                    contactinfo.mail_sent = true;
                    return contactinfo.save();
                } else {
                    resolve({ status: 404, message: 'No contact details found for user:' + email })
                }
            })
            .then(contactinfo => resolve({ status: tiyStatus.OK, message: 'Confirmation Email Sent To User:' + email }))
            .catch(err => resolve({ status: tiyStatus.INTERNAL_SERVER_ERROR, message: tiyStatus.getStatusText(tiyStatus.INTERNAL_SERVER_ERROR) }));
    }).catch(error => new Promise((resolve, reject) => {
        LOG.error(` contactus: funcClass, method:updateSentEmailStatus email=>${email} and error is `, error);
        resolve({ status: tiyStatus.INTERNAL_SERVER_ERROR, message: tiyStatus.getStatusText(tiyStatus.INTERNAL_SERVER_ERROR) });
    }));
}
