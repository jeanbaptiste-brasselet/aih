'use strict';

import { Readable } from 'stream';

/**
 * Convert stream like into Readable stream
 * Useful to convert third party stream into Readable stream
 * @param {StreamLike} stream - Old stream implementation
 * @return {Stream.Readable}
 */
function fromStream(stream) {
  return typeof stream[Symbol.asyncIterator] === 'function'
    ? stream
    : new Readable().wrap(stream);
}

export default fromStream;
