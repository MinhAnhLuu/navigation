import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import UI from './ui';
import Theme from './ui/theme.js';
import getWindowDimensions from './ui/utils/getWindowDimensions.js';

import { loadCircuit, loadAdvancedCircuit } from './state/actions';

import defaultCircuit from './defaultCircuit';
import lossLessTL from './lossLessTL';
import draft from './draft2';
import morCircuit from './morCircuit';
import DropArea from '../../lib/droparea'

// global.__DEV__ = process.env.NODE_ENV === 'development';

// if (__DEV__) {
//   window.React = React;
// }

const COLORS = Theme.COLORS;
const { fontSize, fontFamily } = Theme.TYPOGRAPHY;

const sidebarWidth = 240;
const sidebarWidthPx = `${sidebarWidth}px`;
const defaultStyles = {
  fontSize,
  fontFamily,
  color: COLORS.base
};
const styles = {
  global: {
    html: defaultStyles,
    a: defaultStyles,
    button: defaultStyles
  },
  side: {
    backgroundColor: COLORS.background,
    boxSizing: 'border-box',
    borderRight: `${COLORS.theme} 2px solid`,
    padding: '10px 5px',
    width: sidebarWidthPx,
    display: 'block',
    flexDirection: 'column',
    minHeight: '100vh'
  }
};

const topDefault = 100
const leftDefault = 100
const widthDefault = 800
const heightDefault = 500

function getCanvasSize() {
  const windowSize = getWindowDimensions();
  return {
    width: windowSize.width - sidebarWidth,
    height: windowSize.height
  };
}


class CircuitSimulator extends Component {
  constructor(props, context) {
    super(props, context)
    const { store } = this.context
    this.store = store
    store.dispatch(loadCircuit(morCircuit));
    //store.dispatch(loadAdvancedCircuit(morCircuit[0]));
    
    this.state = {plotList: []};
    this.handlePlot = this.handlePlot.bind(this);
    this.handlePlotClose = this.handlePlotClose.bind(this);
  }

  handlePlotClose(name) {
    this.setState({ plotList: this.state.plotList.filter(item => item.id !== name) })
  }

  handlePlot() {
    var numPlotWindows = this.state.plotList.length
    var plotWindowArg =
      {
        id: numPlotWindows,
        isDragging: false,
        isResizing: false,
        top: topDefault + 10 * numPlotWindows,
        left: leftDefault + 10 * numPlotWindows,
        width: widthDefault,
        height: heightDefault,
        contentComp: null
      }
    this.state.plotList.push(plotWindowArg)
    this.setState({})
  }

  render() {
    return (
      <div id="circuitsim">
        <div className="PlotArea" style={{display:'inline'}}>
          <DropArea list={this.state.plotList} handlePlotClose={this.handlePlotClose} chartData={this.store.getState().circuitData.chartData} />
        </div>
        <UI
          styles={styles}
          theme={Theme}
          getCanvasSize={getCanvasSize}
          handlePlot={this.handlePlot}
        />
      </div>
    );
  }
}

CircuitSimulator.contextTypes = {
  store: React.PropTypes.object
}

export default CircuitSimulator