'use strict';

const curry = require('lodash.curry');
const slice = require('./slice');

/**
 * Drop
 * @param {(Iterable|AsyncIterable)} iterable - Any iterable.
 * @return {(Iterable|AsyncIterable)}
 */
function drop(size, iterable) {
  return slice(size, Infinity, iterable);
}

module.exports = curry(drop);
