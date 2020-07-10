'use strict';

const curry = require('lodash.curry');

/**
 * Map over any iterable
 * @param {(Function|AsyncFunction)} mapFn - Function used during the map
 * @param {(iterable|AsyncIterable)} iterable - Any iterable.
 * @return {(AsyncIterable)}
 */
async function* map(mapFn, iterable) {
  for await (const item of iterable) {
    yield mapFn(item);
  }
}

module.exports = curry(map);
