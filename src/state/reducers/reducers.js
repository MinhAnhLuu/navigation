import { combineReducers } from 'redux'
import circuitData from './circuitData'

// from circuit.im
import addingComponent from '../../lib/circuit.im/state/reducers/addingComponent';
import movingComponent from '../../lib/circuit.im/state/reducers/moveComponent';
import mode from '../../lib/circuit.im/state/reducers/modes';
import mousePos from '../../lib/circuit.im/state/reducers/mousePosition';
import selected from '../../lib/circuit.im/state/reducers/selectComponent';
import circuit from '../../lib/circuit.im/state/reducers/mainLoop';
import showAddToaster from '../../lib/circuit.im/state/reducers/toaster';
import views from '../../lib/circuit.im/state/reducers/views';
import currentSpeed from '../../lib/circuit.im/state/reducers/currentSpeed';
import netList from '../../lib/circuit.im/state/reducers/netList'

const rootReducer = combineReducers({
    //argument manager
    circuitData,
    netList,

    // canvas controller
    mode,
    mousePos,
    showAddToaster,
    addingComponent,
    movingComponent,
    selected,

    // used to render canvas
    views,
    circuit,
    currentSpeed
})

export default rootReducer