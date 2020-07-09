'use strict';
/* eslint-env node, mocha */
'use strict';

import collect from './collect';

describe('#collect', () => {
  it('with asyncIterable', async () => {
    async function* asyncIterator() {
      for (let i = 1; i < 5; i++) {
        yield i;
      }
    }

    const asyncIterable = asyncIterator();

    expect(
      await collect(asyncIterable)
    ).to.deep.equal([1, 2, 3, 4]);
  });
});
