'use strict';

const curry = require('lodash.curry');

async function onceReadable(stream) {
  return new Promise(resolve => {
    stream.once('readable', () => {
      resolve();
    });
  });
}

async function* _fromStream(stream) {
  while (true) {
    const data = stream.read();
    if (data !== null) {
      yield data;
      continue;
    }
    if (stream._readableState.ended) {
      return;
    }
    await onceReadable(stream);
  }
}

/**
 * Convert stream like into Readable stream
 * Useful to convert third party stream into Readable stream
 * @param {StreamLike} stream - Old stream implementation
 * @return {Stream.Readable}
 */
function fromStream(stream) {
  if (typeof stream[Symbol.asyncIterator] === 'function') {
    return stream;
  }
  return _fromStream(stream);
}

module.exports = curry(fromStream);
