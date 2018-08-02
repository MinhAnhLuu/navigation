import React from 'react';
import { FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';

/**
 * Configuration on an argument of a component. ex: Voltage of a source, value of a Resistor
 * @prop {String} uuid This ID is used in both View and Argument storage
 * @prop {String} label An argument require an label for each to render meaningfully
 * @prop {Float} defaultValue Default value is a hint number
 * @prop {Float} max Used to render slider
 * @prop {Float} min Used to render slider
 * @prop {Boolean} showSlider Slider is shown if this value is True
 */

const ArgumentConfiguration = React.createClass({
  getInitialState: function () {
    this.sliderStep = (this.props.max - this.props.min) / 10; 
    var { store } = this.context;
    this.store = store;
    return {

    };
  },
  sliderOnChange() {
    var context = this
    var changedValue = this.sliderValue.value;
    //Assign the change value from slider bar to textbox
    this.textboxValue.value = changedValue;
    //Update the value in Redux store
    this.store.dispatch({
      type: 'UPDATE_ARGUMENT_VALUE',
      id: this.props.uuid,
      value: changedValue
    })
    var callback = function (responseData) {
      context.store.dispatch({
        type:'UPDATE_CHART_DATA',
        responseData:responseData
      })
    }
    this.store.dispatch({
      type: 'GET_CHART_DATA',
      callback: callback
    })
  },
  textboxOnChange() {
    var changedValue = this.textboxValue.value;;
    //Assign the change value from textbox to slider bar
    this.sliderValue.value = changedValue;
    //Update the value in Redux store
    this.store.dispatch({
      type: 'UPDATE_ARGUMENT_VALUE',
      id: this.props.uuid,
      value: changedValue
    })
    this.store.dispatch({
      type: 'GET_CHART_DATA'
    })
  },
  render() {
    return (
      <FormGroup id={this.props.uuid}>
        <Col componentClass={ControlLabel} sm={8}>
          {this.props.label}
        </Col>
        <Col sm={4}>
          <FormControl
            defaultValue={this.props.defaultValue}
            inputRef={el => this.textboxValue = el}
            onChange={this.textboxOnChange} />
        </Col>
        {this.props.showSlider &&
          <Col className="col-sm-offset-4 col-sm-8">
            <input
              type="range"
              defaultValue={this.props.defaultValue}
              onChange={this.sliderOnChange}
              ref={el => this.sliderValue = el}
              min={this.props.min}
              max={this.props.max}
              step={this.sliderStep} />
          </Col>
        }
      </FormGroup>
    );
  }
});

ArgumentConfiguration.contextTypes = {
  store: React.PropTypes.object
}

export default ArgumentConfiguration
