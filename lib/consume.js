'use strict';

/**
 * Consume an iterable
 * @param {(iterable|AsyncIterable)} iterable - Any iterable.
 */
async function consume(iterable) {
  // eslint-disable-next-line no-unused-vars
  for await (const item of iterable) {
    //Do nothing
  }
}

module.exports = consume;
