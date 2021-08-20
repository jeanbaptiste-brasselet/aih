/* eslint-env node, mocha */
'use strict';

const { Readable } = require('stream');
const _ = require('lodash/fp');
const flatten = require('./flatten');
const collect = require('./collect');


describe('#flatten', () => {
  it('with iterable', async () => {
    const iterable = [[1, 2], [3], [4, 5]];

    expect(
      await _.flow(
        flatten,
        collect,
      )(iterable),
    ).to.deep.equal([1, 2, 3, 4, 5]);
  });

  it('with async iterable', async () => {
    async function* asyncIterator() {
      for (let i = 1; i < 4; i++) {
        yield [i, i + 1];
      }
    }

    const asyncIterable = asyncIterator();

    expect(
      await _.flow(
        flatten,
        collect,
      )(asyncIterable),
    ).to.deep.equal([1, 2, 2, 3, 3, 4]);
  });

  it('with stream as async iterable', async () => {
    async function* asyncIterator() {
    for (let i = 1; i < 4; i++) {
        yield [i, i + 1];
      }
    }

    //Create stream (could be mongo cursor / fs file, ...)
    const stream = Readable.from(asyncIterator());

    expect(
      await _.flow(
        flatten,
        collect,
      )(stream),
    ).to.deep.equal([1, 2, 2, 3, 3, 4]);
  });
});
