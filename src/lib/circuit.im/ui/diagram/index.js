import React from 'react';

import {
  canvasMouseDown,
  canvasMouseMove,
  canvasMouseUp,
  canvasMouseEnter,
  canvasMouseLeave,

  loopBegin,
  loopUpdate,

  updateCurrentOffsets,
  rationaliseCurrentOffsets
} from '../../state/actions';
import resize from '../Resize';
import {relMouseCoords} from '../utils/DrawingUtils';
import createLoop from './loop';
import createRender from './render';
import {Button} from 'react-bootstrap'
import { fabric } from 'fabric-webpack';
import './index.css'

const setupLoop = (store, ctx, theme) => {
  const begin = () => {
    store.dispatch(loopBegin());
  };
  const update = (delta) => {
    store.dispatch(loopUpdate(delta));
    store.dispatch(updateCurrentOffsets(delta));
  };
  const render = createRender(store, ctx, theme);
  const draw = () => {
    store.dispatch(rationaliseCurrentOffsets());
    render();
  };

  return createLoop(begin, update, draw);
};

class CircuitDiagram extends React.Component {
  constructor(props) {
    super(props);
    this.circuitCanvas = null;
    this.onMouse = this.onMouse.bind(this);
    this.handleZoomIn = this.handleZoomIn.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const {width, height} = this.props;
    return width !== nextProps.width
      || height !== nextProps.height;
  }

  componentDidMount() {
    this.loop = setupLoop(this.context.store, this.canvas.getContext('2d'), this.context.theme);
    this.loop.start();
    //this.circuitCanvas = new fabric.Canvas('circuit_canvas');
  }

  componentWillUnmount() {
    this.loop.stop();
  }

  onMouse(event) {
    event.preventDefault();
    const { store } = this.context;
    const coords = relMouseCoords(event, this.canvas);
    switch (event.type) {
    case 'mousedown':
    case 'touchstart':
      store.dispatch(canvasMouseDown(coords));
      break;
    case 'mousemove':
    case 'touchmove':
      store.dispatch(canvasMouseMove(coords));
      break;
    case 'mouseup':
    case 'touchend':
    case 'touchcancel': // TODO ??
      store.dispatch(canvasMouseUp(coords));
      break;
    }
  }

  handleZoomIn() {  
    //this.circuitCanvas.setZoom(this.circuitCanvas.getZoom() * 1.1);
  }

  render() {
    const { width, height } = this.props;
    const { store } = this.context;
    return (
      <div>
        <canvas
          ref={c => (this.canvas = c)}

          id = "circuit_canvas"
          width={width*0.9}
          height={height}
          style={{
            padding: 0,
            margin: 0,
            border: 0,
            display: 'block',
            backgroundColor: this.context.theme.COLORS.canvasBackground
          }}

          onMouseDown={this.onMouse}
          onMouseMove={this.onMouse}
          onMouseUp={this.onMouse}
          onMouseEnter={() => store.dispatch(canvasMouseEnter())}
          onMouseLeave={() => store.dispatch(canvasMouseLeave())}
          onTouchStart={this.onMouse}
          onTouchMove={this.onMouse}
          onTouchEnd={this.onMouse}
          onTouchCancel={this.onMouse}
        />
      </div>
    );
  }
}

CircuitDiagram.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired
};

CircuitDiagram.contextTypes = {
  store: React.PropTypes.shape({
    getState: React.PropTypes.func.isRequired,
    dispatch: React.PropTypes.func.isRequired
  }).isRequired,
  theme: React.PropTypes.object.isRequired
};

export default resize(CircuitDiagram);
