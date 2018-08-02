import transforms from '../../render/transforms';
import { LINE_WIDTH } from '../../Constants';

import { get2PointBoundingBox } from '../../boundingBox.js';

import { getDragFunctionFor } from '../../Utils.js';
import {
  BOUNDING_BOX_PADDING,
  VOLTAGE_SOURCE,
  GRID_SIZE
} from '../../Constants.js';

const PLUS_LENGTH = LINE_WIDTH * 2;
const { RADIUS } = VOLTAGE_SOURCE;
const BOUNDING_BOX_WIDTH = VOLTAGE_SOURCE.RADIUS * 2 + BOUNDING_BOX_PADDING * 2;
const MIN_LENGTH = RADIUS * 2 + GRID_SIZE;

const DEFAULT_VOLTAGE = 5;
const NUM_OF_CONNECTORS = 2;
export default {
  typeID: "Vpulse",

  numOfVoltages: 2,
  numOfCurrentPaths: 1,
  numOfConnectors: NUM_OF_CONNECTORS,

  width: BOUNDING_BOX_WIDTH,
  editablesSchema: {
    timeDelay: {
      type: 'number',
      unit: 'ns'
    },
    riseTime: {
      type: 'number',
      unit: 'ns'
    },
    fallTime: {
      type: 'number',
      unit: 'ns'
    },
    pulseWidth: {
      type: 'number',
      unit: 'ns'
    }, 
    pulseAmplitude: {
      type: 'number',
      unit: 'V'
    },
  },
  defaultEditables: {
    timeDelay: {
      value: 1
    },
    riseTime: {
      value: 1
    },
    fallTime: {
      value: 1
    },
    pulseWidth: {
      value: 20
    },
    pulseAmplitude: {
      value: 4
    }
  },
  labelWith: 'pulseAmplitude',

  dragPoint: getDragFunctionFor(MIN_LENGTH),
  transform: transforms[NUM_OF_CONNECTORS],

  getBoundingBox: get2PointBoundingBox(BOUNDING_BOX_WIDTH),

  render: (ctx, {
    tConnectors,
    colors
  }) => {
    const [c1, c2] = tConnectors;

    ctx.beginPath();
    ctx.strokeStyle = colors[0];
    ctx.moveTo(c1.x, 0);
    ctx.lineTo(-RADIUS, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = colors[1];

    ctx.arc(0, 0, RADIUS, Math.PI, -Math.PI);

    ctx.moveTo(c2.x, 0);
    ctx.lineTo(RADIUS, 0);

    // plus
    ctx.translate(RADIUS / 2, 0);
    ctx.moveTo(PLUS_LENGTH, 0);
    ctx.lineTo(-PLUS_LENGTH, 0);
    ctx.moveTo(0, PLUS_LENGTH);
    ctx.lineTo(0, -PLUS_LENGTH);

    ctx.stroke();
  },

  getCurrents: (props, state) => {
    return [0];
  },

  renderCurrent: (props, state, renderBetween) => {
    const {
      tConnectors: [c1, c2],
      currentOffsets: [offset]
    } = props;

    renderBetween(c1, c2, offset);
  }
};
