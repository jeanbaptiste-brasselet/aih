'use strict';

import curry from 'lodash.curry';

/**
 * Take
 * @param {(AsyncIterable)} asyncIterable
 * @return {(AsyncIterable)}
 */
async function* asyncTake(size, asyncIterable) {
  let taken = 0;
  for await (const item of asyncIterable) {
    if (taken === size) {
      return;
    }
    yield item;
    taken += 1;
  }
}

/**
 * Take
 * @param {(Iterable)} iterable
 * @return {(Iterable)}
 */
function* syncTake(size, iterable) {
  let taken = 0;
  for (const item of iterable) {
    if (taken === size) {
      return;
    }
    yield item;
    taken += 1;
  }
}

/**
 * Take
 * @param {(Iterable|AsyncIterable)} iterable - Any iterable.
 * @return {(Iterable|AsyncIterable)}
 */
function take(size, iterable) {
  return iterable[Symbol.asyncIterator]
    ? asyncTake(size, iterable)
    : syncTake(size, iterable);
}

export default curry(take);
