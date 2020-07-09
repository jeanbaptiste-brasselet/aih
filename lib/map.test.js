/* eslint-env node, mocha */
'use strict';

import { Readable } from 'stream';
import * as _ from 'lodash';
import map from './map';
import collect from './collect';


describe('#map', () => {
  it('with iterable and sync mapFn', async () => {
    const iterable = [1, 2, 3, 4];
    const mapFn = (x) => x * 2;

    expect(
      await _.flow(
        map(mapFn),
        collect,
      )(iterable),
    ).to.deep.equal([2, 4, 6, 8]);
  });

  it('with iterable and async mapFn', async () => {
    const iterable = [1, 2, 3, 4];
    const mapFn = async (x) => x * 2;

    expect(
      await _.flow(
        map(mapFn),
        collect,
      )(iterable),
    ).to.deep.equal([2, 4, 6, 8]);
  });

  it('with async iterable and sync mapFn', async () => {
    async function* asyncIterator() {
      for (let i = 1; i < 5; i++) {
        yield i;
      }
    }

    const asyncIterable = asyncIterator();
    const mapFn = async (x) => x * 2;

    expect(
      await _.flow(
        map(mapFn),
        collect,
      )(asyncIterable),
    ).to.deep.equal([2, 4, 6, 8]);
  });

  it('with async iterable and async mapFn', async () => {
    async function* asyncIterator() {
      for (let i = 1; i < 5; i++) {
        yield i;
      }
    }

    const asyncIterable = asyncIterator();
    const mapFn = async (x) => x * 2;

    expect(
      await _.flow(
        map(mapFn),
        collect,
      )(asyncIterable),
    ).to.deep.equal([2, 4, 6, 8]);
  });

  it('with stream as async iterable', async () => {
    async function* asyncIterator() {
      for (let i = 1; i < 5; i++) {
        yield i;
      }
    }

    //Create stream (could be mongo cursor / fs file, ...)
    const stream = Readable.from(asyncIterator());
    const mapFn = async (x) => x * 2;

    expect(
      await _.flow(
        map(mapFn),
        collect,
      )(stream),
    ).to.deep.equal([2, 4, 6, 8]);
  });
});
