'use strict';
const mongoose = require('mongoose');
const db = require('../connections/dbconnection');

const BlogImage = mongoose.Schema({
    email: { type: String, require: true },
    title: { type: String, require: true },
    description: { type: String, require: true },
    blogimages: [{
        originalFileName: String,
        originalFilePath: String,
        sm: String,
        md: String,
        lg: String
       }],
    uploaded_at: { type: Date, default: Date.now() },
});
//last parameter creates collection object in mongo db.
module.exports = db.model('BlogImage', BlogImage, "blogimage");
