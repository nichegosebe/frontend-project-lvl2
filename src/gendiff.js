export default (object1, object2) => {
  const diffAsArray = Object.keys({ ...object1, ...object2 })
    .sort()
    .reduce((acc, key) => {
      if (object2[key] === undefined) {
        return [...acc, ` - ${key}:${object1[key]}`];
      }
      if (object1[key] === undefined) {
        return [...acc, ` + ${key}:${object2[key]}`];
      }
      if (object1[key] !== object2[key]) {
        return [...acc, ` - ${key}:${object1[key]}`, ` + ${key}:${object2[key]}`];
      }
      return [...acc, `   ${key}:${object1[key]}`];
    }, []);
  if (diffAsArray.length === 0) return '{}';
  return `{\n ${diffAsArray.join('\n ')}\n}`;
};