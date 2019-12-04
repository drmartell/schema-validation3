const Schema = require('../lib/Schema.js');

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  weight: {
    type: String
  },
});

const dog1 = {
  name: 'spot',
  age: 5,
  weight: '20 lbs',
};

const dog2 = {
  name: 'rover',
  age: 10,
};

const dog3 = {
  age: 10,
};

const dog4 = {
  name: 'rover',
  age: 'hi',
};

describe('schema class module', () => {
  describe('.validate method', () => {
    it('returns original object when it includes unrequired field', () => expect(schema.validate(dog1)).toEqual(dog1));
    it('returns original object when it excludes unrequired field', () => expect(schema.validate(dog2)).toEqual(dog2));
    it('throws an error when a required field is missing', () => expect(() => schema.validate(dog3)).toThrow());
    it('throws an error when a field is not of correct type', () => expect(() => schema.validate(dog4)).toThrow());
  });
});
