'use strict';
const mongoose = require('mongoose');
const db = require('../connections/dbconnection');

const UserSchema = mongoose.Schema({
    email : {type:String, require:true},
    firstName: {type:String, require:true},
    lastName: {type:String, require:true},
    passwordHash:{type:String, required:true},
    created_at:{type: Date, default: Date.now()},
    active:{type: Boolean, default:true} ,
    loggedin:{type: Boolean, default:false} ,
    resetPassword:{type: Boolean, default:false},
    resetPasswordToken:{type:String},
    resetPasswordTime:{type:Date}
});

/* schema.statics.hashPassword = function hashPassword(password){
    try{
        const salting = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password,salt);    
    }catch(error){
        throw new Error('hashing failed.',error);
    }
    
}

schema.methods.isValid = function(hashedpassword){
    return  bcrypt.compareSync(hashedpassword, this.password);
}
 */

module.exports = db.model('User',UserSchema);
