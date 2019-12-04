const Validator = require('../lib/Validator.js');

const dog1 = {
  name: 'spot',
};

const dog2 = {
  name: 55,
};

const dog3 = {
};

const nameValidator1 = new Validator('name', { type: String, required: true });
const nameValidator2 = new Validator('name', { type: String, required: false });

describe('validator module', () => {
  describe('validate method', () => {
    it('returns a fields value when required', () => expect(nameValidator1.validate(dog1)).toEqual('spot'));
    it('returns a fields value when not required', () => expect(nameValidator2.validate(dog1)).toEqual('spot'));
    it('returns a fields value when required and needs casting', () => expect(nameValidator1.validate(dog2)).toEqual('55'));
    it('returns a fields value when not required and needs casting', () => expect(nameValidator2.validate(dog2)).toEqual('55'));
    it('throws an error when required and missing', () => expect(() => nameValidator1.validate(dog3)).toThrow());
    it('returns null when not required and missing', () => expect(nameValidator2.validate(dog3)).toBeNull());
  });
});
