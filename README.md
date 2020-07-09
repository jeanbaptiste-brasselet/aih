# Async iterable helpers aka aih

Since node 10, stream (fs, mongo cursor, http get, ect) are considered as async iterable. So I have decided to create some helpers with comparable speed, friendlier error handling, and are easier to understand than most usual stream code.

## Helpers

- [`map(mapFn, iterable)`](#map)
- [`filter(filterFn, iterable)`](#filter)
- [`collect(iterable)`](#collect)
- [`consume(iterable)`](#consume)

### Map

Map a function or async function over an iterable.

```
const got = require('got');
const { Readable } = require('stream');
const { map } = require('aih')

async function * generate() {
  for (let i = 0; i < 9; i++) {
    yield 'https://randomuser.me/api/';
  }
}

// Fake node stream (could be mongo cursor / fs file, ...) 
const randomUser = Readable.from(generate());

const getUser = map(url => got(url).json())(randomUser);

async function test() {
  for await (user of getUser) {
    console.log(user);
  }
}

test();
```

### Filter

Filter over an iterable

```
const { Readable } = require('stream');
const { filter } = require('aih')

async function * generate() {
  yield {
    name: 'guest1',
    type: 'guest',
  };
  yield {
    name: 'admin1',
    type: 'admin',
  };
  yield {
    name: 'admin2',
    type: 'admin'
  };
}

// Fake node stream (could be mongo cursor / fs file, ...) 
const randomUser = Readable.from(generate());

const filterUser = filter(({ type }) => type === 'admin')(randomUser);

async function test() {
  for await (user of filterUser) {
    console.log(user);
  }
}

test();
```

### Collect

Collect values from an iterable

```
const { Readable } = require('stream');
const { collect } = require('aih')

async function * generate() {
  yield {
    name: 'guest1',
    type: 'guest',
  };
  yield {
    name: 'admin1',
    type: 'admin',
  };
  yield {
    name: 'admin2',
    type: 'admin'
  };
}

// Fake node stream (could be mongo cursor / fs file, ...) 
const randomUser = Readable.from(generate());

async function test() {
  const users = await collect(randomUser); //array of users
}
```

### Consume

Consume an iterable, useful to treat a pipeline with no values in the end.