/* eslint-env node, mocha */
'use strict';

const _ = require('lodash/fp');
const slice = require('./slice');
const collect = require('./collect');

describe('#slice', () => {
  it('with iterable', async () => {
    const iterable = [1, 2, 3, 4];

    expect(
      await _.flow(
        slice(1, 2),
        collect,
      )(iterable)
    ).to.deep.equal([2, 3]);
  });

  it('with iterable and end >= start', async () => {
    const iterable = [1, 2, 3, 4];

    expect(
      await _.flow(
        slice(2, 2),
        collect,
      )(iterable)
    ).to.deep.equal([]);
  });

  it('with iterable, start == 0 and end == Infinity', async () => {
    const iterable = [1, 2, 3, 4];

    expect(
      await _.flow(
        slice(0, Infinity),
        collect,
      )(iterable)
    ).to.deep.equal([1, 2, 3, 4]);
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
        slice(1, 2),
        collect,
      )(asyncIterable)
    ).to.deep.equal([2, 3]);
  });

  it('with iterable and end >= start', async () => {
    async function* asyncIterator() {
      for (let i = 1; i < 5; i++) {
        yield i;
      }
    }

    const asyncIterable = asyncIterator();

    expect(
      await _.flow(
        slice(2, 2),
        collect,
      )(asyncIterable)
    ).to.deep.equal([]);
  });

  it('with iterable, start == 0 and end == Infinity', async () => {
    async function* asyncIterator() {
      for (let i = 1; i < 5; i++) {
        yield i;
      }
    }

    const asyncIterable = asyncIterator();

    expect(
      await _.flow(
        slice(0, Infinity),
        collect,
      )(asyncIterable)
    ).to.deep.equal([1, 2, 3, 4]);
  });
});
