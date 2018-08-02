import R from 'ramda';
import inside from 'point-in-polygon';
import Vector from 'immutable-vector2d';

import CircuitComponents from './components';
import { BOUNDING_BOX_PADDING, DRAG_POINT_RADIUS } from './Constants.js';
import { getRectPointsBetween, distance } from '../utils/DrawingUtils.js';

const MIN_WIDTH = DRAG_POINT_RADIUS * 2;
const sanitise = width => {
  width = width > MIN_WIDTH
    ? width
    : MIN_WIDTH;
  return width + 2 * BOUNDING_BOX_PADDING;
};

// Bounding box stuff

/*
 * A bounding box is represented e.g. [[1, 2], [3, 4], [5, 6], [7, 8]]
 */

export const get2PointBoundingBox = width => dragPoints => {
  const [p1, p2] = dragPoints;
  const fullWidth = sanitise(width);
  const rectanglePoints = getRectPointsBetween(p1, p2, fullWidth);
  return R.map(p => [p.x, p.y], rectanglePoints);
};

// Advanced Components
const getX = point => {
  return point.x
}
const getY = point => {
  return point.y
}

export const get2PointAdvancedBoundingBox = width => connectors => {
  var maxX = R.reduce(R.max, -Infinity, R.map(getX, connectors));
  var minX = R.reduce(R.min, Infinity, R.map(getX, connectors));
  var maxY = R.reduce(R.max, -Infinity, R.map(getY, connectors));
  var minY = R.reduce(R.min, Infinity, R.map(getY, connectors));

  return [[maxX, maxY], [maxX, minY], [minX, minY], [minX, maxY]]
};

/**
 * 
 * @param {*} p: Vector 
 * @param {*} polygon: Array<[number, number]>
 */
function isPointIn(p, polygon) {
  const point = [p.x, p.y];
  return inside(point, polygon);
}

const isPointInConnectors = point => connectorPos => {
  return distance(point, connectorPos).length() < DRAG_POINT_RADIUS;
};

/**
 * 
 * @param {*} mousePos : Vector
 */
export const hoverFor = (mousePos) => (typeID, connectors) => {
  const CircuitComp = CircuitComponents[typeID];

  const hoveredConnectorsIndex = R.findIndex(isPointInConnectors(mousePos), connectors);
  const isIndex = R.is(Number, hoveredConnectorsIndex) && hoveredConnectorsIndex >= 0;
  return {
    hovered: isPointIn(mousePos, CircuitComp.getBoundingBox(connectors)) || isIndex,
    connectorsIndex: isIndex ? hoveredConnectorsIndex : false
  };
};
