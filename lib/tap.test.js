/* eslint-env node, mocha */
'use strict';

const { Readable } = require('stream');
const _ = require('lodash/fp');
const sinon = require('sinon');
const tap = require('./tap');
const collect = require('./collect');


describe('#tap', () => {
  it('with iterable and sync tapFn', async () => {
    const iterable = [1, 2, 3, 4];
    const tapFn = sinon.stub().returns();

    expect(
      await _.flow(
        tap(tapFn),
        collect,
      )(iterable),
    ).to.deep.equal([1, 2, 3, 4]);

    expect(tapFn.called).to.equal(true);
  });

  it('with iterable and async tapFn', async () => {
    const iterable = [1, 2, 3, 4];
    const tapFn = sinon.stub().resolves();

    expect(
      await _.flow(
        tap(tapFn),
        collect,
      )(iterable),
    ).to.deep.equal([1, 2, 3, 4]);

    expect(tapFn.called).to.equal(true);
  });

  it('with async iterable and sync tapFn', async () => {
    async function* asyncIterator() {
      for (let i = 1; i < 5; i++) {
        yield i;
      }
    }

    const asyncIterable = asyncIterator();
    const tapFn = sinon.stub().returns();

    expect(
      await _.flow(
        tap(tapFn),
        collect,
      )(asyncIterable),
    ).to.deep.equal([1, 2, 3, 4]);

    expect(tapFn.called).to.equal(true);
  });

  it('with async iterable and async tapFn', async () => {
    async function* asyncIterator() {
      for (let i = 1; i < 5; i++) {
        yield i;
      }
    }

    const asyncIterable = asyncIterator();
    const tapFn = sinon.stub().resolves();

    expect(
      await _.flow(
        tap(tapFn),
        collect,
      )(asyncIterable),
    ).to.deep.equal([1, 2, 3, 4]);

    expect(tapFn.called).to.equal(true);
  });

  it('with stream as async iterable', async () => {
    async function* asyncIterator() {
      for (let i = 1; i < 5; i++) {
        yield i;
      }
    }

    //Create stream (could be mongo cursor / fs file, ...)
    const stream = Readable.from(asyncIterator());
    const tapFn = sinon.stub().resolves();

    expect(
      await _.flow(
        tap(tapFn),
        collect,
      )(stream),
    ).to.deep.equal([1, 2, 3, 4]);

    expect(tapFn.called).to.equal(true);
  });
});
