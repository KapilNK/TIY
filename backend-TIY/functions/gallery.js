'use strict';

const gallerys = require('../models/gallery');

const tiyStatus = require('../models/tiy-status-code');

exports.find = () =>
    new Promise((resolve, reject) => {
        gallerys.find({}, { id: 1, img: 1, likes: 1, _id: 0 })
            .then(gallery => {
                console.log("gallerys",gallery);
                if (gallery.length == 0) {
                    resolve({ status: tiyStatus.IMAGES_NOT_FOUND, message: tiyStatus.getStatusText(tiyStatus.IMAGES_NOT_FOUND) });
                }
                resolve({ status: tiyStatus.OK, message: gallery });
            })
            .catch(err => reject({ status: err.status, message: err.message }));
    }).catch(error => new Promise((resolve, reject) => reject(error)));

