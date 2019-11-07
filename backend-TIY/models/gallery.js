'use strict';
const mongoose = require('mongoose');
const db = require('../connections/dbconnection');
const GallerySchema = mongoose.Schema({
    id : {type:String, require:true},
    img: {type:String, require:true},
    likes: {type:String, require:true}
});

module.exports = db.model('Gallery',GallerySchema, "gallery");
