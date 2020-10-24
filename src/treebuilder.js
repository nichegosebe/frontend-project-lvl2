import _ from 'lodash';

const STATE = {
  UNCHANGED: 'unchanged',
  UPDATED: 'updated',
  REMOVED: 'removed',
  ADDED: 'added',
};

const buildTree = (object1, object2) => Object.keys({ ...object1, ...object2 })
  .sort()
  .reduce((acc, key) => {
    const oldValue = object1[key];
    const newValue = object2[key];

    if (_.isPlainObject(oldValue) && _.isPlainObject(newValue)) {
      return [...acc, { state: STATE.UNCHANGED, key, children: buildTree(oldValue, newValue) }];
    }

    if (_.isUndefined(newValue)) {
      return [...acc, { state: STATE.REMOVED, key, oldValue }];
    }

    if (_.isUndefined(oldValue)) {
      return [...acc, { state: STATE.ADDED, key, newValue }];
    }

    if (oldValue !== newValue) {
      if (_.isArray(oldValue) && _.isArray(newValue) && _.isEqual(oldValue, newValue)) {
        return [...acc, { state: STATE.UNCHANGED, key, oldValue }];
      }
      return [
        ...acc,
        {
          state: STATE.UPDATED,
          key,
          oldValue,
          newValue,
        },
      ];
    }

    return [...acc, { state: STATE.UNCHANGED, key, oldValue }];
  }, []);

export { buildTree, STATE };
