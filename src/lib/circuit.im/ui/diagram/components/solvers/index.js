import R from 'ramda';

import mortransition from './mortransition';

const VIEWS = [
  mortransition
];

function toKVPair(component) {
  return [component.typeID, component];
}

// Map from typeID to component
export default R.pipe(
  R.map(toKVPair),
  R.fromPairs
)(VIEWS);
