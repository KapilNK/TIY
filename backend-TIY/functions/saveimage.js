'use strict';

const blogimage = require('../models/blogimage');
const tiyStatus = require('../models/tiy-status-code');
const Resize = require('../functions/resize');
const uuidv4 = require('uuid/v4');
var LOG = require('../services/logger');
var _ = require('lodash');



exports.save = (email, title, description, files, imagePath) => {
    let data = [];
    const fileUpload = new Resize(imagePath);
    //loop all files
    console.log("loop started");
    _.forEach(_.keysIn(files), (key) => {
        let file = files[key];
        console.log("file:", file);
        const uniqueFileName = uuidv4();
        const filesreshaping = (async () => {
            try {
              await Promise.all([fileUpload.save(file.path, uniqueFileName, 'sm'), fileUpload.save(file.path, uniqueFileName, 'md'), fileUpload.save(file.path, uniqueFileName, 'lg')]);
            } catch (err) {
                LOG.error(`Exception while resizing the file ${file.originalFileName} `, err);
            }
        })();
        data.push({
            originalFileName: file.originalname,
            originalFilePath: file.path,
            sm: uniqueFileName + '_' + 'sm' + '.png',
            md: uniqueFileName + '_' + 'md' + '.png',
            lg: uniqueFileName + '_' + 'lg' + '.png'
        });
    });
    console.log("loop finish", data);
    return new Promise((resolve, reject) => {
        const imageDetails = new blogimage({
            email: email,
            title: title,
            description: description,
            blogimages: data
        });

        imageDetails.save()
            .then(() => {
                resolve({ status: tiyStatus.BLOG_ADDED, message: tiyStatus.getStatusText(tiyStatus.BLOG_ADDED) })
            })
            .catch(err => {
                LOG.error(`error in saveimage func ${err} for email ${email} `, err);
                reject({ status: tiyStatus.INTERNAL_SERVER_ERROR, message: tiyStatus.getStatusText(tiyStatus.INTERNAL_SERVER_ERROR) });
            });
    }).catch(error => new Promise((resolve, reject) => {
        LOG.error(`email=>${email} and error is `, error);
        reject({ status: tiyStatus.INTERNAL_SERVER_ERROR, message: tiyStatus.getStatusText(tiyStatus.INTERNAL_SERVER_ERROR) });
    }));
}
