import _ from 'lodash';

export const TYPES = {
  UNCHANGED: 'unchanged',
  UPDATED: 'updated',
  REMOVED: 'removed',
  ADDED: 'added',
  NESTED: 'nested',
};

const buildTree = (object1, object2) => _.sortBy(_.union(Object.keys(object1),
  Object.keys(object2)))
  .map((key) => {
    const oldValue = object1[key];
    const newValue = object2[key];

    if (_.isPlainObject(oldValue) && _.isPlainObject(newValue)) {
      return { type: TYPES.NESTED, key, children: buildTree(oldValue, newValue) };
    }

    if (!_.has(object2, key)) {
      return { type: TYPES.REMOVED, key, oldValue };
    }

    if (!_.has(object1, key)) {
      return { type: TYPES.ADDED, key, newValue };
    }

    if (!_.isEqual(oldValue, newValue)) {
      return {
        type: TYPES.UPDATED,
        key,
        oldValue,
        newValue,
      };
    }

    return { type: TYPES.UNCHANGED, key, oldValue };
  });

export default buildTree;
