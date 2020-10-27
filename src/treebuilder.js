import _ from 'lodash';

const STATES = {
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
      return [...acc, { state: STATES.UNCHANGED, key, children: buildTree(oldValue, newValue) }];
    }

    if (!_.has(object2, key)) {
      return [...acc, { state: STATES.REMOVED, key, oldValue }];
    }

    if (!_.has(object1, key)) {
      return [...acc, { state: STATES.ADDED, key, newValue }];
    }

    if (!_.isEqual(oldValue, newValue)) {
      return [
        ...acc,
        {
          state: STATES.UPDATED,
          key,
          oldValue,
          newValue,
        },
      ];
    }

    return [...acc, { state: STATES.UNCHANGED, key, oldValue }];
  }, []);

export { buildTree, STATES };
