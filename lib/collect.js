'use strict';

/**
 * Collect values from an iterable
 * @param {(iterable|AsyncIterable)} iterable - Any iterable.
 * @return {(Array)}
 */
async function collect(iterable) {
  const values = [];
  for await (const value of iterable) {
    values.push(value);
  }
  return values;
}

export default collect;

