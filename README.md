# Async iterable helpers aka aih

Since node 10, stream (fs, mongo cursor, http get, ect) are considered as async iterable. So I have decided to create some helpers with comparable speed, friendlier error handling, and are easier to understand than most usual stream code.

## Helpers

- [`map(mapFn, iterable)`](#map)
- [`filter(filterFn, iterable)`](#filter)
- [`flatten(iterable)`](#flatten)
- [`take(size, iterable)`](#take)
- [`drop(size, iterable)`](#drop)
- [`slice(start, end, iterable)`](#slice)
- [`tap(tapFn, iterable)`](#tap)
- [`batch(size, iterable)`](#batch)
- [`filter(filterFn, iterable)`](#filter)
- [`collect(iterable)`](#collect)
- [`consume(iterable)`](#consume)

All helpers are curried if needed to help with composition.

### Map

Map a function or async function over an iterable.

```
const { map } = require('aih')

async function * generate() {
  for (let i = 0; i < 9; i++) {
    yield i;
  }
}

// Fake node stream (could be mongo cursor / fs file, ...) 
const stream = Readable.from(generate());

const getItem = map(x => x + 1)(stream);

async function test() {
  for await (item of getItem) {
    console.log(item); //2, 3, 4, ...
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

### Flatten

Flatten an iterable.

```
const { flatten } = require('aih')

async function * generate() {
  for (let i = 0; i < 9; i++) {
    yield [i, i + 1];
  }
}

// Fake node stream (could be mongo cursor / fs file, ...) 
const stream = Readable.from(generate());

const flattenedStream = flatten(stream);

async function test() {
  for await (item of flattenedStream) {
    console.log(item); //1, 2, 2, 3, 3, ...
  }
}

test();
```

### Take

Take a number of item from an iterable

```
const {
  take,
  collect,
} = require('aih')

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

const randomUser = generate();

async function test() {
  const result = await collect(take(1, randomUser));

  console.log(result);
  // [ { name: 'guest1', type: 'guest' } ]
}

test()
```

### Drop

```
const {
  drop,
  collect,
} = require('aih')

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

const randomUser = generate();

async function test() {
  const result = await collect(drop(2, randomUser));

  console.log(result);
  // [ { name: 'admin2', type: 'admin' } ]
}

test()
```

### Slice

```
const {
  slice,
  collect,
} = require('aih')

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

const randomUser = generate();

async function test() {
  const result = await collect(slice(1, 2, randomUser));

  console.log(result);
  // [ { name: 'admin1', type: 'admin' } ]
}

test()
```

### Tap

```
const {
  tap,
  map,
  collect
} = require('aih');

const _ = require('lodash/fp);

async function * generate() {
  for (let i = 0; i < 9; i++) {
    yield i;
  }
}

const asyncIterable = generate();

async function test() {
  const result = await _.flow(
    tap(console.log),
    map(x => x * 2),
    collect,
  )(asyncIterable);

  console.log(result);
  // 2, 4, 6, 8 ...
}

test()
```


### Batch

```
const {
  batch,
  collect,
} = require('aih');

async function * generate() {
  for (let i = 0; i < 9; i++) {
    yield i;
  }
}

const asyncIterable = generate();

async function test() {
  const result = await collect(batch(2, asyncIterable));

  console.log(result);
  // [[1, 2], [3, 4], ...]
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

test();
```

### Consume

Consume an iterable, useful to treat a pipeline with no values in the end.

```
const {
  tap,
  consume,
} = require('aih')

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

const randomUser = generate();

async function test() {
  await consume(tap(console.log, randomUser));
}

test();
```