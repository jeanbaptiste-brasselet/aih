'use strict';

const curry = require('lodash.curry');
const { Readable } = require('stream');

/**
 * Convert stream like into Readable stream
 * Useful to convert third party stream into Readable stream
 * @param {StreamLike} stream - Old stream implementation
 * @return {Stream.Readable}
 */
function fromStream(stream, options = {}) {
  return typeof stream[Symbol.asyncIterator] === 'function'
    ? stream
    : new Readable(options).wrap(stream);
}

module.exports = curry(fromStream);
