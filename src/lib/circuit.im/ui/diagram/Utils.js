import Vector from 'immutable-vector2d';
import { diff } from '../utils/DrawingUtils.js';
import { GRID_SIZE } from './Constants.js';

/**
 * 
 * @param {*} v : Vector
 */
export function snapToGrid(v) {
  return v.snap(GRID_SIZE);
}

const roundUpToNearestMultipleOf = mult => n => {
  return mult * Math.ceil(n / mult);
};
const roundUpToGrid = roundUpToNearestMultipleOf(GRID_SIZE);

function maxLengthF(vector, l) {
  return vector.length() > l
    ? vector.normalize(l)
    : vector;
}

/**
 * 
 * @param {*} minLength : number = 0
 * @param {*} maxLength : number = Infinity
 */
export function getDragFunctionFor(minLength, maxLength) {
  if (minLength > maxLength) {
    throw Error(`Max length (${maxLength}) shouldn't be smaller then min length (${minLength})`);
  }
  minLength = roundUpToGrid(minLength);
  maxLength = minLength > maxLength ? minLength : maxLength;
  /**
   * Ensure that the point being dragged is properly snapped,
   * and a minimum distance away from a fixed point.
   */
  return (dragPoint, { fixed }) => {
    const fixedPoint = snapToGrid(fixed);
    const dragOffset = maxLengthF(diff(dragPoint, fixedPoint).minLength(minLength), maxLength);
    return snapToGrid(fixedPoint.add(dragOffset));
  };
}

export function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}
