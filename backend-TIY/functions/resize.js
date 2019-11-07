const sharp = require('sharp');
const path = require('path');
const config = require('../config')
const fs = require('fs');
var logger = require('../services/logger');

class Resize {
    constructor(folder) {
        this.folder = folder;
    }
    async save(buffer, filename, responsiveType) {
        //const filename = Resize.filename();
        const newFile = filename + '_' + responsiveType + '.png';
        const filepath = this.filepath(newFile);
        let inStream = fs.createReadStream(buffer);
        let outStream = fs.createWriteStream(filepath, { flags: "w" });
        var transform;
        if (responsiveType == 'sm') {
          transform = await sharp()
                .resize(config.sm.width, config.sm.height, {
                    fit: sharp.fit.inside,
                    withoutEnlargement: true
                });
                
        }
        else if (responsiveType == 'md') {
            transform = await sharp()
                .resize(config.md.width, config.md.height, {
                    fit: sharp.fit.inside,
                    withoutEnlargement: true
                });
        } else {
          transform =  await sharp()
                .resize(config.lg.width, config.lg.height, {
                    fit: sharp.fit.inside,
                    withoutEnlargement: true
                });
        }
        inStream.on('error', function(err) {
            console.log('input err ' + err);
            logger.error(`inStream err `,err);
          });
          outStream.on('error', function(err) {
            console.log('output err ' + err);
            logger.error(`outStream err `,err);
          });
          transform.on('error', function(err) {
            console.log('transform err ' + err);
            logger.error(`transform err `,err);
          });
      
          outStream.on('finish', function() {
            console.log('file has been written');
            logger.info('file has been written');
          });

        inStream.pipe(transform).pipe(outStream);

        return newFile;
    }

    //   static filename() {
    //     return `${uuidv4()}.png`;
    //   }
    filepath(filename) {
        return path.resolve(`${this.folder}/${filename}`)
    }
}
module.exports = Resize;