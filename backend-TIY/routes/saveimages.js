var express = require('express');
var router = express.Router();
var LOG = require('../services/logger');
const Joi = require('joi');
const upload = require('../functions/multerFileLimit');
const config = require('../config');
const fs = require('fs');
const saveimage = require('../functions/saveimage');
const tiyStatus = require('../models/tiy-status-code');
const path = require('path');

router.post('/', upload.array('photos', config.fileuploadLimit), (req, res) => {
    //  logger.info(`getting gallery contents for user:${req.user.email}`);
    //  console.log("----------------------------------------------");

    //const email = req.user.email;
    //sconsole.log("user",email);
    try {
        const title = req.body.title;
        const description = req.body.title;
        // const email = req.user.email;
        const email = 'kapilnakhasi@gmail.com';
        const schema = Joi.object().keys({
            title: Joi.string().min(3).max(30).required(),
            description: Joi.string().min(3).required(),
            email: Joi.string().email({ minDomainAtoms: 2 })
        })

        
        // Return result.
        const result = Joi.validate({
            title: title,
            description: description,
            email: email
        }, schema);
        // result.error === null -> valid
        //console.log('result:', result);
        if (result.error !== null) {
            console.log(result);
            LOG.error(`Error while validating the params for user=>${email} , with result as ${result}`, result.error);
            return res.status(400).json({ message: 'Invalid Request !' });
        }

        const imagePath = path.resolve(__dirname, '../public/images');
        
        if (!fs.existsSync(imagePath)) {
            fs.mkdirSync(imagePath, { recursive: true }, err => { if (err) throw err; });
        }


        if (!req.files) {
            return res.status(401).json({ error: 'Please provide an image' });
        }

        //console.log("files",req.files);
        saveimage.save(email, title, description, req.files, imagePath)
            .then(result => {
                res.status(result.status).json({ message: result.message })
            })
            .catch(err => {
                LOG.error(` error in saving image files for user=>${email}, with error `,err);
                //console.log("error regis rout", err);
                res.status(err.status).json({ message: err.message })
            });
    } catch (err) {
        LOG.error('Error while saving the images in routes/saveimages ', err);
        res.status(tiyStatus.INTERNAL_SERVER_ERROR).json({ message: tiyStatus.getStatusText(tiyStatus.INTERNAL_SERVER_ERROR) });
    }
});

module.exports = router;