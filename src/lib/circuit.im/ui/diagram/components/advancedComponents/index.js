import R from 'ramda';
import Blackbox from './Blackbox'

const VIEWS = [
  Blackbox
];

function toKVPair(component) {
  return [component.typeID, component];
}

// Map from typeID to component
export default R.pipe(
  R.map(toKVPair),
  R.fromPairs
)(VIEWS);
