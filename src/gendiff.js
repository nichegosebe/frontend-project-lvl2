const isObject = (value) => typeof value === 'object' && !Array.isArray(value);
const arrayEquals = (array1, array2) => array1.length === array2.length
  && array1.every((val, index) => val === array2[index]);

const genDiff = (object1, object2) => Object.keys({ ...object1, ...object2 })
  .sort()
  .reduce((acc, key) => {
    if (isObject(object1[key]) && isObject(object2[key])) {
      return [...acc, [' ', key, object1[key], genDiff(object1[key], object2[key])]];
    }
    if (Array.isArray(object1[key]) && Array.isArray(object2[key])) {
      if (arrayEquals(object1[key], object2[key])) {
        return [...acc, [' ', key, object1[key], []]];
      }
      return [...acc, ['-', key, object1[key], []], ['+', key, object2[key], []]];
    }
    if (object2[key] === undefined) {
      return [...acc, ['-', key, object1[key], []]];
    }
    if (object1[key] === undefined) {
      return [...acc, ['+', key, object2[key], []]];
    }
    if (object1[key] !== object2[key]) {
      return [...acc, ['-', key, object1[key], []], ['+', key, object2[key], []]];
    }

    return [...acc, [' ', key, object1[key], []]];
  }, []);

export default genDiff;
