'use strict';

const curry = require('lodash.curry');

/**
 * Tap over any iterable
 * @param {(Function|AsyncFunction)} tapFn - Function used during the tap
 * @param {(iterable|AsyncIterable)} iterable - Any iterable.
 * @return {(AsyncIterable)}
 */
async function* tap(tapFn, iterable) {
  for await (const item of iterable) {
    await tapFn(item);
    yield item;
  }
}

module.exports = curry(tap);
