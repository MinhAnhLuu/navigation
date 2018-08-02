import R from 'ramda';

import CurrentSource from './CurrentSource';
import VoltageSource from './VoltageSource';
import VoltageSourceG from './VoltageSourceG';
import Ground from './Ground';

import Wire from './Wire';

import Resistor from './Resistor';
import ResistorT from './ResistorT';
import Capacitor from './Capacitor';
import Inductor from './Inductor';

const VIEWS = [
  CurrentSource,
  VoltageSource,
  VoltageSourceG,
  Ground,
  Capacitor,
  Inductor,
  Resistor,
  ResistorT,
  Wire
];

function toKVPair(component) {
  return [component.typeID, component];
}

// Map from typeID to component
export default R.pipe(
  R.map(toKVPair),
  R.fromPairs
)(VIEWS);
