const genDiff = (object1, object2) => Object.keys({ ...object1, ...object2 })
  .sort()
  .reduce((acc, key) => {
    if (typeof object1[key] === 'object' && typeof object2[key] === 'object') {
      return [...acc, [' ', key, object1[key], genDiff(object1[key], object2[key])]];
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
