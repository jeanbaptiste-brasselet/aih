/* eslint-env node, mocha */
'use strict';

const { Readable } = require('stream');
const _ = require('lodash/fp');
const filter = require('./filter');
const collect = require('./collect');

function isOdd(n) {
  return n % 2 !== 0;
}

describe('#filter', () => {
  it('with iterable and sync filterFn', async () => {
    const iterable = [1, 2, 3, 4];
    const filterFn = (x) => isOdd(x);

    expect(
      await _.flow(
        filter(filterFn),
        collect,
      )(iterable),
    ).to.deep.equal([1, 3]);
  });

  it('with iterable and async filterFn', async () => {
    const iterable = [1, 2, 3, 4];
    const filterFn = async (x) => isOdd(x);

    expect(
      await _.flow(
        filter(filterFn),
        collect,
      )(iterable),
    ).to.deep.equal([1, 3]);
  });

  it('with async iterable and sync filterFn', async () => {
    async function* asyncIterator() {
      for (let i = 1; i < 5; i++) {
        yield i;
      }
    }

    const asyncIterable = asyncIterator();
    const filterFn = async (x) => isOdd(x);

    expect(
      await _.flow(
        filter(filterFn),
        collect,
      )(asyncIterable),
    ).to.deep.equal([1, 3]);
  });

  it('with async iterable and async filterFn', async () => {
    async function* asyncIterator() {
      for (let i = 1; i < 5; i++) {
        yield i;
      }
    }

    const asyncIterable = asyncIterator();
    const filterFn = async (x) => isOdd(x);

    expect(
      await _.flow(
        filter(filterFn),
        collect,
      )(asyncIterable),
    ).to.deep.equal([1, 3]);
  });

  it('with stream as async iterable', async () => {
    async function* asyncIterator() {
      for (let i = 1; i < 5; i++) {
        yield i;
      }
    }

    //Create stream (could be mongo cursor / fs file, ...)
    const stream = Readable.from(asyncIterator());
    const filterFn = async (x) => isOdd(x);

    expect(
      await _.flow(
        filter(filterFn),
        collect,
      )(stream),
    ).to.deep.equal([1, 3]);
  });
});
