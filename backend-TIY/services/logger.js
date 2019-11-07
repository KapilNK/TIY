//import { inflate } from 'zlib';

const winston = require('winston');
require('winston-daily-rotate-file');


var err_transport = new (winston.transports.DailyRotateFile)({
    level: 'error',
    filename: './logs/tiy-error-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    timestamp: true
  });

  var info_transport = new (winston.transports.DailyRotateFile)({
    filename: './logs/tiy-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    timestamp: true
  });


const level = process.env.LOG_LEVEL || 'debug';

const logger = winston.createLogger({
    level:level,
    format: winston.format.json(),
    transports:[
        err_transport,
        info_transport
    ],
});

if (process.env.TIY_ENV !== 'prod') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple()
    }));
  }


module.exports = logger
