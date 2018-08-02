import React, { Component } from 'react';
import ArgumentConfiguration from '../argConfig'
import './index.css'

/**
 * Render a list of argument configuration
 * 
 * @prop {String} label
 * @prop {List Object} args
 */

class ArgumentConfigurationList extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    var context = this;

    return (
      <div>
        <h4>{this.props.label}</h4>
        <div>
          {this.props.args.map(function (elements, i) {
            var configInfo = { uuid: elements.name, label: elements.label, name: elements.name, defaultValue: elements.value, min: elements.min, max: elements.max };
            return (<ArgumentConfiguration {...configInfo} showSlider={true} />)
          })}
        </div>
      </div>
    );
  }
}

export default ArgumentConfigurationList;
