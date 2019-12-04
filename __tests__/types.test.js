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
} = require('../lib/types.js');

describe('validator module', () => {
  describe('basic validation', () => {
    // isNumber
    it('properly determines if a value is a number', () => {
      expect(isNumber(3)).toBeTruthy();
      expect(isNumber('hi')).toBeFalsy();
      expect(isNumber([])).toBeFalsy();
      expect(isNumber({})).toBeFalsy();
      expect(isNumber(() => {})).toBeFalsy();
      expect(isNumber(true)).toBeFalsy();
    });

    // isString
    it('properly determines if a value is a string', () => {
      expect(isString('')).toBeTruthy();
      expect(isString('string')).toBeTruthy();
      expect(isString([])).toBeFalsy();
      expect(isString({})).toBeFalsy();
    });

    // isBoolean
    it('propertly determines if a value is a boolean', () => {
      expect(isBoolean(true)).toBeTruthy();
      expect(isBoolean(false)).toBeTruthy();
      expect(isBoolean('1')).toBeFalsy();
      expect(isBoolean(1)).toBeFalsy();
      expect(isBoolean([])).toBeFalsy();
      expect(isBoolean({})).toBeFalsy();
    });

    // isArray
    it('properly determines if a value is an array', () => {
      expect(isArray([])).toBeTruthy();
      expect(isArray([1])).toBeTruthy();
      expect(isArray(['1', '2'])).toBeTruthy();
      expect(isArray({})).toBeFalsy();
      expect(isArray(1)).toBeFalsy();
      expect(isArray('1')).toBeFalsy();
      expect(isArray(null)).toBeFalsy();
      expect(isArray(undefined)).toBeFalsy();
    });

    // isObject
    it('propertly determines if a value is an object', () => {
      expect(isObject({})).toBeTruthy();
      expect(isObject([])).toBeTruthy();
      expect(isObject([1])).toBeTruthy();
      expect(isObject({ key: 'value' })).toBeTruthy();
      expect(isObject(1)).toBeFalsy();
      expect(isObject('1')).toBeFalsy();
      expect(isObject(true)).toBeFalsy();
      expect(isObject(false)).toBeFalsy();
      expect(isObject(null)).toBeFalsy();
      expect(isObject(undefined)).toBeFalsy();
    }); 
  });

  describe('casters', () => {
    // castToNumber
    it('can cast values to a number', () => {
      expect(castToNumber(3)).toEqual(3);
      expect(castToNumber('3')).toEqual(3);
      expect(castToNumber(true)).toEqual(1);
      expect(castToNumber(false)).toEqual(0);
    });
    it('throws if value is not castable to number', () => {
      expect(() => castToNumber('hi')).toThrowErrorMatchingSnapshot();
      expect(() => castToNumber({})).toThrowErrorMatchingSnapshot();
    });

    // castToString
    it('can cast values to a string', () => {
      expect(castToString(3)).toEqual('3');
      expect(castToString('3')).toEqual('3');
      expect(castToString(true)).toEqual('true');
      expect(castToString(false)).toEqual('false');
      expect(castToString({})).toEqual('[object Object]');
    });
    it('throws if value is not castable to string', () => {
      expect(() => castToString(null)).toThrowErrorMatchingSnapshot();
      expect(() => castToString(undefined)).toThrowErrorMatchingSnapshot();
    });

    // isBoolean
    it('can cast values to a boolean', () => {
      expect(castToBoolean(1)).toEqual(true);
      expect(castToBoolean(0)).toEqual(false);
      expect(castToBoolean(true)).toEqual(true);
      expect(castToBoolean(false)).toEqual(false);
      expect(castToBoolean(null)).toEqual(false);
      expect(castToBoolean(undefined)).toEqual(false);
    });

    // castToArray
    it('can cast values to a array', () => {
      expect(castToArray(1)).toEqual([1]);
      expect(castToArray('1')).toEqual(['1']);
      expect(castToArray(true)).toEqual([true]);
      expect(castToArray(false)).toEqual([false]);
    });
    it('throws if value is not castable to array', () => {
      expect(() => castToString(null)).toThrowErrorMatchingSnapshot();
      expect(() => castToString(undefined)).toThrowErrorMatchingSnapshot();
    });
  });

  // determine caster
  it('can get the right caster', () => {
    expect(getCaster(Number)).toEqual(castToNumber);
    expect(getCaster(String)).toEqual(castToString);
    expect(getCaster(Boolean)).toEqual(castToBoolean);
    expect(getCaster(Array)).toEqual(castToArray);
    expect(getCaster(Object)).toBeNull();
    expect(getCaster(Promise)).toBeNull();
  });
});
