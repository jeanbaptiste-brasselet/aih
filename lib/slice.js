'use strict';

const curry = require('lodash.curry');

/**
 * Slice
 * @param {(AsyncIterable)} asyncIterable
 * @return {(AsyncIterable)}
 */
async function* asyncSlice(start, end, asyncIterable) {
  let index = 0;

  if (start >= end) {
    return;
  }

  for await (const item of asyncIterable) {
    if (index > end) {
      return;
    }

    if (index >= start) {
      yield item;
    }

    index += 1;
  }
}

/**
 * Slice
 * @param {(Iterable)} iterable
 * @return {(Iterable)}
 */
function* syncSlice(start, end, iterable) {
  let index = 0;

  if (start >= end) {
    return;
  }

  for (const item of iterable) {
    if (index > end) {
      return;
    }

    if (index >= start) {
      yield item;
    }

    index += 1;
  }
}

/**
 * Slice
 * @param {(Iterable|AsyncIterable)} iterable - Any iterable.
 * @return {(Iterable|AsyncIterable)}
 */
function slice(start, end, iterable) {
  if (start === 0 && end === Infinity) {
    return iterable;
  }
  return iterable[Symbol.asyncIterator]
    ? asyncSlice(start, end, iterable)
    : syncSlice(start, end, iterable);
}

module.exports = curry(slice);
