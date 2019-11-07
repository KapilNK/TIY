'use strict';
const mongoose = require('mongoose');
const db = require('../connections/dbconnection');

const ContactUs = mongoose.Schema({
    email: { type: String, unique: false, require: true },
    subject: { type: String, unique: false, require: true },
    message: { type: String, unique: false, require: true },
    name: { type: String, unique: false, require: true },
    mail_sent: { type: Boolean, default: false },
    sent_at: { type: Date, default: Date.now() },
});

ContactUs.index({ name: 1, email: 1, subject: 1, message: 1 }, { unique: true })
//last parameter creates collection object in mongo db.
module.exports = db.model('ContactUs', ContactUs, "contactus");
