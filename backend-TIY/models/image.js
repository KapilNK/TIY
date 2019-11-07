'use strict';
const mongoose = require('mongoose');
const db = require('../connections/dbconnection');

const ImageSchema = mongoose.Schema({
    img : {type:String, require:true},
    description: {type:String, require:true},
    heading: {type:String, require:true},
    subHeading:{type:String, required:true},
    id:{type:String, required:true}
});
module.exports = db.model('Image',ImageSchema, "image");
