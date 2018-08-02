import { BaseData } from '../../../../circuit/models';
import { get2PointAdvancedBoundingBox } from '../../boundingBox';

import transforms from '../../render/transforms';
import { getDragFunctionFor } from '../../Utils.js';
import {
    BOUNDING_BOX_PADDING,
    RESISTOR,
    GRID_SIZE
} from '../../Constants.js';

const BOUNDING_BOX_WIDTH = RESISTOR.WIDTH*2 + BOUNDING_BOX_PADDING * 2;
const MIN_LENGTH = RESISTOR.LENGTH + GRID_SIZE;

const DEFAULT_RESISTANCE = 1e3;
const NUM_OF_CONNECTORS = 3;
export default {
    typeID: "BlackBox",

    numOfVoltages: 2,
    numOfCurrentPaths: 1,
    numOfConnectors: NUM_OF_CONNECTORS,

    width: BOUNDING_BOX_WIDTH, // for label positioning
    editablesSchema: {
        // ExcitationPort : {
        //     type: 'number',
        //     unit: ''
        // },
        SNPFile: {
            type: 'file'
        }
    },
    defaultEditables: {
        // ExcitationPort: {
        //     value: 4
        // },
        SNPFile: {
            value: null
        }
    },
    labelWith: null,

    dragPoint: getDragFunctionFor(MIN_LENGTH),
    transform: transforms[4],

    getBoundingBox: get2PointAdvancedBoundingBox(BOUNDING_BOX_WIDTH),

    render: (ctx, props) => {
        const {
      tConnectors,
            colors
    } = props;

        const [c1, c2] = tConnectors;
        const _length = 30; 
        ctx.beginPath();
        ctx.strokeStyle = colors[0];
        ctx.moveTo(c1.x, 0);
        ctx.lineTo(-RESISTOR.LENGTH / 2, 0);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = colors[0];
        ctx.moveTo(0, c2.x);
        ctx.lineTo(0, RESISTOR.LENGTH / 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = colors[1];
        ctx.moveTo(c2.x, 0);
        ctx.lineTo(RESISTOR.LENGTH / 2, 0);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = colors[0];
        ctx.moveTo(0, -c2.x);
        ctx.lineTo(0, -RESISTOR.LENGTH / 2);
        ctx.stroke();

        ctx.strokeRect(-RESISTOR.LENGTH/2, -RESISTOR.LENGTH/2, RESISTOR.LENGTH, RESISTOR.LENGTH);
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
