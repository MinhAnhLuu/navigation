import R from 'ramda';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

import {
  LOOP_BEGIN,
  LOOP_BEGIN_ADVANCED,
  LOOP_UPDATE,
  UPDATE_CURRENT_OFFSETS,
  RATIONALISE_CURRENT_OFFSETS,
  ADDING_MOVED,
  MOVING_MOVED,
  MOUSE_MOVED,
  SET_HOVERED_COMPONENT,
  SET_HOVERED_ADVANCED_COMPONENT
} from '../../lib/circuit.im/state/actions';
import createLogger from 'redux-logger';

const logger = createLogger({
  predicate: (getState, action) => {
    return R.all(t => t !== action.type)([
      LOOP_BEGIN,
      LOOP_BEGIN_ADVANCED,
      LOOP_UPDATE,
      UPDATE_CURRENT_OFFSETS,
      RATIONALISE_CURRENT_OFFSETS,
      ADDING_MOVED,
      MOVING_MOVED,
      MOUSE_MOVED,
      SET_HOVERED_COMPONENT,
      SET_HOVERED_ADVANCED_COMPONENT
    ]);
  },
  collapsed: true
});

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  logger
)(createStore);

export default function configureStore() {
  return createStoreWithMiddleware(rootReducer);
}
