/* eslint-env node, mocha */
'use strict';

const _ = require('lodash/fp');
const drop = require('./drop');
const collect = require('./collect');

describe('#drop', () => {
  it('with iterable', async () => {
    const iterable = [1, 2, 3, 4];

    expect(
      await _.flow(
        drop(2),
        collect,
      )(iterable)
    ).to.deep.equal([3, 4]);
  });

  it('with asyncIterable', async () => {
    async function* asyncIterator() {
      for (let i = 1; i < 5; i++) {
        yield i;
      }
    }

    const asyncIterable = asyncIterator();

    expect(
      await _.flow(
        drop(2),
        collect,
      )(asyncIterable)
    ).to.deep.equal([3, 4]);
  });
});
