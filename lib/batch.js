'use strict';

const curry = require('lodash.curry');

/**
 * Batch
 * @param {(AsyncIterable)} asyncIterable
 * @return {(AsyncIterable)}
 */
async function* asyncBatch(size, asyncIterable) {
  let batched = [];
  for await (const item of asyncIterable) {
    batched.push(item);
    if (batched.length === size) {
      yield batched;
      batched = [];
    }
  }
  if (batched.length > 0) {
    yield batched;
  }
}

/**
 * Batch
 * @param {(Iterable)} iterable
 * @return {(Iterable)}
 */
function* syncBatch(size, iterable) {
  let batched = [];
  for (const item of iterable) {
    batched.push(item);
    if (batched.length === size) {
      yield batched;
      batched = [];
    }
  }
  if (batched.length > 0) {
    yield batched;
  }
}

/**
 * Batch
 * @param {(Iterable|AsyncIterable)} iterable - Any iterable.
 * @return {(Iterable|AsyncIterable)}
 */
function batch(size, iterable) {
  return iterable[Symbol.asyncIterator]
    ? asyncBatch(size, iterable)
    : syncBatch(size, iterable);
}

module.exports = curry(batch);
