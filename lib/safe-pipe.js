'use strict';

const { Readable } = require('stream');
const isStream = require('is-stream');
const curry = require('lodash.curry');
const lazySafePipe = require('../internal/lazy-safe-pipe');

const safePipe = (transformStream, iterable) => {
  const stream = isStream.readable(iterable) ? iterable : Readable.from(iterable);

  return lazySafePipe([stream, transformStream]);
};

module.exports = curry(safePipe);
