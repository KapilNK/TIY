'use strict';

const images = require('../models/image');
const tiyStatus = require('../models/tiy-status-code');

exports.find = id =>
    new Promise((resolve, reject) => {
        images.find({ id: id }, { img: 1, description: 1, heading: 1, subHeading: 1, _id: 0 })
            .then(image => {
                if (image.length == 0) {
                    reject({ status: tiyStatus.IMAGES_NOT_FOUND, message: tiyStatus.getStatusText(tiyStatus.IMAGES_NOT_FOUND) });
                }
                resolve({ status: tiyStatus.OK, message: image });
            })
            .catch(err => reject({ status: err.status, message: err.message }));
    });