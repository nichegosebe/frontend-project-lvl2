import * as STATE from './constants.js';

const isObject = (value) => typeof value === 'object'
  && !Array.isArray(value)
  && value !== null;

const arraysIsEquals = (array1, array2) => array1.length === array2.length
  && array1.every((val, index) => val === array2[index]);

const buidTree = (object1, object2) => Object.keys({ ...object1, ...object2 })
  .sort()
  .reduce((acc, key) => {
    const value1 = object1[key];
    const value2 = object2[key];

    if (isObject(value1) && isObject(value2)) {
      return [...acc, [STATE.UNCHANGED, key, null, null, buidTree(value1, value2)]];
    }

    if (Array.isArray(value1) && Array.isArray(value2)) {
      if (arraysIsEquals(value1, value2)) {
        return [...acc, [STATE.UNCHANGED, key, value1, null, []]];
      }
      return [...acc, [STATE.UPDATED, key, value2, value1, []]];
    }

    if (value2 === undefined) {
      return [...acc, [STATE.REMOVED, key, value1, null, []]];
    }

    if (value1 === undefined) {
      return [...acc, [STATE.ADDED, key, value2, null, []]];
    }

    if (value1 !== value2) {
      return [...acc, [STATE.UPDATED, key, value2, value1, []]];
    }

    return [...acc, [STATE.UNCHANGED, key, value1, null, []]];
  }, []);

export default buidTree;
