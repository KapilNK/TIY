var express = require('express');
var router = express.Router();
var logger = require('../services/logger');
const image = require('../functions/image');
const Joi = require('joi');

router.get('/:id', (req, res) => {
    const id = req.params.id;
    logger.info(`getting image for id:${id}`);
  //  console.log("----------------------------------------------");
    
    console.log("id",id);
  
    image.find(id)
        .then(result=> {
            logger.info(`result of getting all gallery data ${result}`);
            res.status(result.status).json(result.message);
        })
        .catch(error => res.status(error.status).json({ message: error.message }));
    });
    
    module.exports = router;