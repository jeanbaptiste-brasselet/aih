/* eslint-env node, mocha */
'use strict';

const consume = require('./consume');

describe('#consume', () => {
  it('with asyncIterable', async () => {
    async function* asyncIterator() {
      for (let i = 1; i < 5; i++) {
        yield i;
      }
    }

    const asyncIterable = asyncIterator();

    await consume(asyncIterable);

    const {
      done
    } = await asyncIterable.next();

    expect(done).to.equal(true);
  });
});
