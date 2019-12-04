// is* functions
const isNumber = value => typeof value === 'number';
const isString = value => typeof value === 'string';
const isBoolean = value => typeof value === 'boolean';
const isArray = value => value !== Array.prototype && Array.isArray(value);
const isObject = value => value !== null && typeof value === 'object';

// castTo* functions
const castToNumber = value => {
  let digitsOnly;
  if(typeof value === 'string') {
    digitsOnly = value.replace(/\D/g, '');
    if(digitsOnly !== '') return Number(digitsOnly);
  }
  if(isNaN(value)) throw new CastError(Number, value);
  else return Number(value);
};

const castToString = value => value.toString();

const castToBoolean = value => Boolean(value);

const castToArray = value => {
  if(isString(value)) return value.split(',');
  if(value === false) return [value];
  return value ? [value] : null;
};

class CastError extends Error {
  constructor(Type, value) {
    const type = Type.name;
    super(`Cannot cast >>${value}<< to ${type}`);
    this.type = type;
    this.value = value;
  }
}

const getCaster = Type => {
  try {
    return eval('castTo' + Type.name);
  }
  catch(e) {
    return null;
  }
};

module.exports = {
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
};
