const isObject = (value) => typeof value === 'object' && !Array.isArray(value);

const arrayEquals = (array1, array2) => array1.length === array2.length 
  && array1.every((val, index) => val === array2[index]);

const genDiff = (object1, object2) => Object.keys({ ...object1, ...object2 })
  .sort()
  .reduce((acc, key) => {
    const value1 = object1[key] === null ? 'null' : object1[key];
    const value2 = object2[key] === null ? 'null' : object2[key];

    if (isObject(value1) && isObject(value2)) {
      return [...acc, [' ', key, '', genDiff(value1, value2)]];
    }

    if (Array.isArray(value1) && Array.isArray(value2)) {
      if (arrayEquals(value1, value2)) {
        return [...acc, [' ', key, value1, []]];
      }
      return [...acc, ['-', key, value1, []], ['+', key, value2, []]];
    }

    if (value2 === undefined) {
      return [...acc, ['-', key, value1, []]];
    }

    if (value1 === undefined) {
      return [...acc, ['+', key, value2, []]];
    }

    if (value1 !== value2) {
      return [...acc, ['-', key, value1, []], ['+', key, value2, []]];
    }

    return [...acc, [' ', key, value1, []]];
  }, []);

export default genDiff;
