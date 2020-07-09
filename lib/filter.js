'use strict';

import curry from 'lodash.curry';

/**
 * Filter over any iterable
 * @param {(Function|AsyncFunction)} filter - Function used during the filter
 * @param {(iterable|AsyncIterable)} iterable - Any iterable.
 * @return {(AsyncIterable)}
 */
async function* filter(filterFn, iterable) {
  for await (const item of iterable) {
    if (await filterFn(item)) {
      yield item;
    }
  }
}

export default curry(filter);
