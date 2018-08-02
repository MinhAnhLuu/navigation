import React from 'react';
import { Col, InputGroup, FormGroup, FormControl, Button, MenuItem, DropdownButton, ButtonToolbar, Popover, OverlayTrigger } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush, ResponsiveContainer } from 'recharts';
import { DEFAUT_LINE_COLORS } from '../../../appConstants'
import './index.css'


const LLTLChart = React.createClass({
  getInitialState: function () {
    var chartData = this.props.chartData
    var numArray = chartData.numArray
    var colorArray = []

    this.usedColorIndex = [];

    for (var i = 0; i < numArray; i++) {
      colorArray.push("#" + ((1 << 24) * Math.random() | 0).toString(16));
    }

    return {
      xAxisDataName: chartData.arrayNames[numArray - 1],
      lineDataNameList: [],
      colorArray: colorArray,
      titlePopOver: ""
    };
  },
  handleXLineCheck(XName) {
    this.xAxisSelect.value = XName;
    this.setState({ xAxisDataName: XName, lineDataNameList: [] });
  },
  handleYLineCheck(YName) {
    this.yAxisSelect.value = YName;
  },
  addYLines() {
    if (this.props.chartData.arrayNames.indexOf(this.yAxisSelect.value) >= 0) {
      //pick color for line
      var pickedColorLine = null;
      var i = 0
      for (i = 0; i < DEFAUT_LINE_COLORS.length; i++) {
        if (this.usedColorIndex.indexOf(i) < 0) {
          pickedColorLine = i;
          this.usedColorIndex.push(i);
          break;
        }
      }
      if (pickedColorLine == null) {
        pickedColorLine = i;
        this.usedColorIndex.push(i);
        DEFAUT_LINE_COLORS.push("#" + ((1 << 24) * Math.random() | 0).toString(16));
      }

      this.state.lineDataNameList.push({ lineName: this.yAxisSelect.value, lineColor: pickedColorLine });
      this.yAxisSelect.value = null;
      this.setState()
    }
    else {
      alert("Array '" + this.yAxisSelect.value + "' doesn't exist.")
    }
  },
  removeLine(ele) {
    var lineList = this.state.lineDataNameList;
    for (var i = 0; i < lineList.length; i++) {
      if (lineList[i].lineName == ele.lineName) {
        lineList.splice(i, 1);
        var usedColorIndex = this.usedColorIndex.indexOf(ele.lineColor)
        if (usedColorIndex > 0) {
          this.usedColorIndex.splice(usedColorIndex, 1)
        } else {
          //console.log("Removed color is not used")
        }
        break;
      }
    }
    this.setState()
  },
  handleChoosenLine(ele) {
    this.setState({ titlePopOver: ele })
  },
  handleSplitChart(e) {
    this.setState({ splitShow: !this.state.splitShow })
  },
  render() {
    var context = this;
    var lineRender = this.state.lineDataNameList.map(function (ele, i) {
      return (<Line
        dataKey={ele.lineName}
        stroke={DEFAUT_LINE_COLORS[ele.lineColor]}
        dot={false}
        isAnimationActive={false}
        strokeWidth={2} />)
    });

    var lineXOptionRender = this.props.chartData.arrayNames.map(function (ele) {
      return <MenuItem key={ele} onSelect={() => context.handleXLineCheck(ele)}>{ele}</MenuItem>
    });

    var lineYOptionRender = this.props.chartData.arrayNames.map(function (ele) {
      return <MenuItem key={ele} onSelect={() => context.handleYLineCheck(ele)}>{ele}</MenuItem>
    });

    const popoverBottom = (
      <Popover id="popover-positioned-bottom" title={"Line Render of " + this.state.titlePopOver}>
        <div>
          <p>Color Configuration</p>
          <input type="color"></input>
        </div>
        <br />
        <div>
          <Button onClick={() => context.removeLine(context.state.titlePopOver)}>Remove</Button>
        </div>
      </Popover>
    );

    var choosenLineRender = this.state.lineDataNameList.map(function (ele) {
      return (
        <ButtonToolbar>
          <OverlayTrigger trigger="click" placement="bottom" overlay={popoverBottom}>
            <Button style={{ "background": DEFAUT_LINE_COLORS[ele.lineColor], "margin": "5px" }} onClick={() => context.handleChoosenLine(ele)}><p style={{ "color": "white", "margin": "0px" }}>{ele.lineName}</p></Button>
          </OverlayTrigger>
        </ButtonToolbar>
      )
    });

    return (
      <object className="LLTLChart">
        <object className="LineChart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart className="lineChart" data={this.props.chartData.data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis type="number" dataKey={this.state.xAxisDataName} />
              <CartesianGrid strokeDasharray="3 3" />
              <YAxis type="number" domain={[-5, 10]} />
              <Tooltip />
              {lineRender}
            </LineChart>
          </ResponsiveContainer>
        </object>
        <object className="ChartConfiguration">

          <h3>Displayed lines</h3>
          <h4>XAxis selection</h4>
          <FormGroup>
            <InputGroup>
              <FormControl type="text" defaultValue={this.state.xAxisDataName} inputRef={el => this.xAxisSelect = el} />
              <DropdownButton
                componentClass={InputGroup.Button}
                id="input-dropdown-addon"
                title="List"
              >
                {lineXOptionRender}
              </DropdownButton>
              <FormControl.Feedback />
            </InputGroup>
          </FormGroup>
          <h4>YAxis selection</h4>
          <FormGroup>
            <InputGroup>
              <FormControl type="text" inputRef={el => this.yAxisSelect = el} />
              <DropdownButton
                componentClass={InputGroup.Button}
                id="input-dropdown-addon"
                title="List"
              >
                {lineYOptionRender}
              </DropdownButton>
            </InputGroup>
          </FormGroup>
          <Button onClick={this.addYLines}>Add</Button>
          <br />
          <p>List: </p>
          <div className="SelectedLineList">
            <div>
              {choosenLineRender}
            </div>
          </div>

        </object>
      </object>
    );
  }
})

export default LLTLChart
