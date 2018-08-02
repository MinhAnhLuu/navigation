import { BaseData } from '../../../../circuit/models';
import { get2PointBoundingBox } from '../../boundingBox.js';

import transforms from '../../render/transforms';
import { getDragFunctionFor } from '../../Utils.js';
import {
  BOUNDING_BOX_PADDING,
  CAPACITOR,
  CURRENT,
  GRID_SIZE
} from '../../Constants.js';

const BOUNDING_BOX_WIDTH = CAPACITOR.WIDTH + BOUNDING_BOX_PADDING * 2;
const MIN_LENGTH = CAPACITOR.GAP + GRID_SIZE;
const ORIGIN_TO_PLATE = CAPACITOR.GAP / 2;

const BaseCapacitorModel = BaseData.Capacitor;

const DEFAULT_CAPACITANCE = 10e-6;
const NUM_OF_CONNECTORS = 2;
export default {
  typeID: 'MORTransient',

  numOfVoltages: 2,
  numOfCurrentPaths: 1,
  numOfConnectors: NUM_OF_CONNECTORS,

  width: BOUNDING_BOX_WIDTH, // for label positioning
  editablesSchema: {
    ExcitationPort: {
      type: 'number',
      unit: ''
    },
    NumberOfPoints: {
      type: 'number',
      unit: ''
    },
    Duration: {
      type: 'number',
      unit: 'ns'
    },
    OrderOfApproximation: {
      type: 'radio',
      options: ['Automatic', 'Manual']
    },
    Order: {
      type: 'number',
      unit: ''
    },
    PassivityEnforcement: {
      type: 'radio',
      options: ['Yes', 'No']
    }
  },
  defaultEditables: {
    ExcitationPort: {
      value: 4
    },
    NumberOfPoints: {
      value: 2000
    },
    Duration: {
      value: 7.0
    },
    OrderOfApproximation: {
      value: 0
    },
    Order: {
      value: 65
    },
    PassivityEnforcement: {
      value: 0
    }
  },
  labelWith: '',

  dragPoint: getDragFunctionFor(MIN_LENGTH),
  transform: transforms[NUM_OF_CONNECTORS],

  getBoundingBox: get2PointBoundingBox(BOUNDING_BOX_WIDTH),

  render: (ctx, props) => {
    const {
      tConnectors,
      colors
    } = props;

    const [c1, c2] = tConnectors;

    ctx.beginPath();

    ctx.moveTo(-CAPACITOR.GAP / 2, -CAPACITOR.WIDTH / 2);
    ctx.lineTo(-CAPACITOR.GAP / 2, CAPACITOR.WIDTH / 2);
    ctx.stroke();

    ctx.moveTo(CAPACITOR.GAP / 2, -CAPACITOR.WIDTH / 2);
    ctx.lineTo(CAPACITOR.GAP / 2, CAPACITOR.WIDTH / 2);
    ctx.stroke();

    ctx.moveTo(-CAPACITOR.GAP / 2, CAPACITOR.WIDTH / 2);
    ctx.lineTo(CAPACITOR.GAP / 2, -CAPACITOR.WIDTH / 2);
    ctx.stroke();

    ctx.moveTo(-CAPACITOR.GAP / 2, CAPACITOR.WIDTH / 2);
    ctx.lineTo(-CAPACITOR.GAP / 2, -CAPACITOR.WIDTH / 2);
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
