const _ = require('lodash/fp');
const parse = require('csv-parse');
const fs = require('fs');
const { MongoClient } = require('mongodb');

const {
  safePipe,
  map,
  filter,
  consume,
} = require('../lib');

async function test() {
  const mongo = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  await mongo.connect();

  const FakeUsers = mongo.db('someDb').collection('fake_users');
  await FakeUsers.removeMany({});

  await _.flow(
    safePipe(parse({ columns: ['firstName', 'lastName', 'age'] })),
    filter(user => user.age < 25),
    map(user => FakeUsers.insertOne(user)),
    consume,
  )(fs.createReadStream('./with-stream.csv'));
}

test()
  .catch(console.log)
  .then(process.exit);
