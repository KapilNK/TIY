'use strict';
const mongoose = require('mongoose');
const config = require('../config');

var mongoDB = getmongoDBURL();
mongoose.set('useCreateIndex', true);
function getmongoDBURL() {
  if (process.env.TIY_ENV === 'prod') {
    return config.prod;
  }
  return config.local;
}
//mongoose.connection.useDb("tiyDB", { useCache: true });
//mongoose.connect(mongoDB, { useNewUrlParser: true });

mongoose.Promise = global.Promise;
var db = mongoose.createConnection(mongoDB, {
  useNewUrlParser: true,
  reconnectInterval: 5000,
  reconnectTries: 60,
  poolSize: 50
})
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});
mongoose.connection.close(function () {
  console.log('Mongoose default connection closed');
});

module.exports = db