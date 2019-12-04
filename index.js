const { 
  isNumber,
  isString,
  isBoolean,
  isArray,
  isObject,
  getCaster,
  castToNumber,
  castToString,
  castToBoolean,
  castToArray,
} = require('./lib/types.js');

const Validator = require('./lib/Validator.js');

console.log(isNumber('3'));
console.log(isString('3'));
console.log(isBoolean('3'));
console.log(isArray('3'));
console.log(isObject('3'));
console.log(getCaster(Number));
console.log(getCaster(String));
console.log(getCaster(Boolean));
console.log(getCaster(Array));
console.log(castToNumber('3'));
console.log(castToString('3'));
console.log(castToBoolean('3'));
console.log(castToArray('3'));

const nameValidator = new Validator('name', {
  type: String,
  required: true
});

const ageValidator = new Validator('age', {
  type: String,
  required: true
});

const colorValidator = new Validator('color', {
  type: String,
  required: true
});

const dog = {
  name: 'spot',
  age: '5',
  weight: '20 lbs'
};

nameValidator.validate(dog); // returns 'spot'
ageValidator.validate(dog); // returns 5
colorValidator.validate(dog); // throws error
