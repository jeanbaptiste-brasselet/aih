'use strict';

/**
 * Flatten over any iterable
 * @param {(iterable|AsyncIterable)} iterable - Any iterable.
 * @return {(AsyncIterable)}
 */
async function* flatten(iterable) {
  for await (const items of iterable) {
    for (const item of items) {
        yield item;
    }
  }
}

module.exports = flatten;
