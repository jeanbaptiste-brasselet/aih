'use strict';

module.exports = {
  // Transformations
  map: require('./map'),
  filter: require('./filter'),
  batch: require('./batch'),
  tap: require('./tap'),
  take: require('./take'),

  // Consumers
  consume: require('./consume'),
  collect: require('./collect'),

  // Glue
  safePipe: require('./safe-pipe'),

  // Compatibilities
  fromStream: require('./from-stream'),
};
