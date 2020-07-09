'use strict';

import { Readable } from 'stream';
import isStream from 'is-stream';
import curry from 'lodash.curry';
import lazySafePipe from '../internal/lazy-safe-pipe';

const safePipe = (transformStream, iterable) => {
  const stream = isStream.readable(iterable) ? iterable : Readable.from(iterable);

  return lazySafePipe([stream, transformStream]);
};

export default curry(safePipe);
