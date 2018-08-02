import React, { Component } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import ArgumentConfigurationList from '../../components/argument/argConfigList'
import DropArea from '../../lib/droparea'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ArgumentManager from '../../state/actions/argConfig'
import './index.css'

var topDefault = 0
var leftDefault = 0
var widthDefault = 800
var heightDefault = 500

class CSExample1 extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = e => {
      this.setState({ target: e.target, show: !this.state.show });
    };

    this.handleRun = this.handleRun.bind(this);
    this.handlePlot = this.handlePlot.bind(this);
    this.dialogClose = this.dialogClose.bind(this);
    this.handlePlotClose = this.handlePlotClose.bind(this);

    this.state = { show: false, showChart: false, chartData: [], plotList: [] };
    this.args = require("./arg.json");

    const { store } = this.context;
    this.store = store;
  }

  componentDidMount() {
  }

  handleRun() {
    var context = this
    this.store.dispatch({
      type: 'GET_CHART_DATA'
    })
    var callback = function (responseData) {
      context.store.dispatch({
        type: 'UPDATE_CHART_DATA',
        responseData: responseData
      })
    }
    this.store.dispatch({
      type: 'GET_CHART_DATA',
      callback: callback
    })
  }

  handlePlotClose(name) {
    this.setState({ plotList: this.state.plotList.filter(item => item.id !== name) })
  }

  handlePlot() {
    var numPlotWindows = this.state.plotList.length
    //var name = (numPlotWindows > 0) ? (parseInt(this.state.plotList[numPlotWindows - 1].id) + 1) : 0
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

  dialogClose() {
    this.setState({ showChart: false })
  }

  render() {
    const {
      chartData
    } = this.props;
    var context = this;

    return (
      <div>
        <h2 className="ExampleTitle">Lossless Tranmission Line</h2>
        <Col className="col-xs-2 Example">
          <Form horizontal onSubmit={this.handleFormSubmit}>
            <ArgumentConfigurationList label="Argument Configuration" args={this.args} />

            <Button className="CSConfirmButton" onClick={this.handleRun}>Run</Button>
            <Button className="CSConfirmButton" onClick={this.handlePlot}>Plot</Button>
          </Form>
        </Col>
        <Col className="col-xs-10">
          {chartData.arrayNames === 0 ?
            (<div> <Row className="CenterItem">
              <img src="./argumentDescription.png" />
            </Row>
              <Row className="CenterItem">
                <img src="./circuit simulator.png" />
              </Row> </div>) : null
          }
          {chartData.arrayNames !== 0 ?
            (
              <div className="PlotArea">
                <DropArea list={this.state.plotList} handlePlotClose={this.handlePlotClose} chartData={chartData} />
              </div>
            ) : null}
        </Col>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    chartData: state.circuitData.chartData
  };
}

CSExample1.propTypes = {
  chartData: React.PropTypes.object.isRequired
}

CSExample1.contextTypes = {
  store: React.PropTypes.object
}


export default connect(mapStateToProps)(CSExample1);
