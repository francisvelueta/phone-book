const R = require('ramda');

const sortItems = prop => items => R.sort(R.ascend(R.prop(prop)), items);

module.exports = {
  sortItems,
};
