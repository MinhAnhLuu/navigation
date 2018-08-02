import React from 'react';
import createFragment from 'react-addons-create-fragment';
import R from 'ramda';
import CommonComponents from '../../diagram/components/commonComponents';
import AdvancedComponents from '../../diagram/components/advancedComponents';
import SolverComponents from '../../diagram/components/solvers'

import ComponentButton from './ComponentButton.js';
import ButtonGroup from './ButtonGroup.js';
import Mouse from './art/Mouse.js';

import camelToSpace from '../../utils/camelToSpace.js';

const { PropTypes } = React;

const baseButtons = {
  selectOrMove: {
    name: 'Select & Move',
    art: Mouse
  }
};

const circuitComponentButton = R.reduce((buttons, component) => {
  return R.assoc(component.typeID, {
    name: camelToSpace(component.typeID),
    art: component
  }, buttons);
}, baseButtons, R.values(CommonComponents));

const advancedCircuitComponentButton = R.reduce((buttons, component) => {
  return R.assoc(component.typeID, {
    name: camelToSpace(component.typeID),
    art: component
  }, buttons);
}, circuitComponentButton, R.values(AdvancedComponents));

const BUTTONS = R.reduce((buttons, component) => {
  return R.assoc(component.typeID, {
    name: camelToSpace(component.typeID),
    art: component
  }, buttons);
}, advancedCircuitComponentButton, R.values(SolverComponents));

const GROUPS = {
  mouse: {
    name: 'Mouse',
    buttons: ['selectOrMove']
  },
  components: {
    name: 'Components',
    buttons: R.keys(CommonComponents)
  },
  advancedComponents: {
    name: 'Advanced Components',
    buttons: R.keys(AdvancedComponents)
  },
  solvers: {
    name: 'Solvers',
    buttons: R.keys(SolverComponents)
  }
};

export default class ComponentSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedButton: 'selectOrMove'
    };
    this.toButtonGroups = this.toButtonGroups.bind(this);
    this.toButtons = this.toButtons.bind(this);
  }

  getChildContext() {
    return { disableCurrent: true };
  }

  toButtons(buttonIDs) {
    const { onButtonClicked } = this.props;
    const { selectedButton } = this.state;

    const onButtonClick = buttonID => {
      this.setState({
        selectedButton: buttonID
      });
      onButtonClicked(buttonID);
    };

    const createButton = buttonID => {
      const props = R.pipe(
        R.assoc('id', buttonID),
        R.assoc('onClick', onButtonClick)
      )(BUTTONS[buttonID]);
      return <ComponentButton {...props} selected={ selectedButton === buttonID } key={ buttonID }/>;
    };
    return R.map(createButton, buttonIDs);
  }

  toButtonGroups(groupProperties) {
    const buttons = this.toButtons(groupProperties.buttons);
    console.log('buttonsdsd',buttons)
    return (
      <ButtonGroup
        key={ groupProperties.name }
        name={ groupProperties.name }
      >
        {buttons}
      </ButtonGroup>
    );
  }

  render() {
    const groups = createFragment(R.map(this.toButtonGroups, GROUPS));

    return (
      <div style={ this.props.style }>
        { groups }
      </div>
    );
  }
}

ComponentSelector.propTypes = {
  style: PropTypes.object,
  onButtonClicked: PropTypes.func.isRequired
};

ComponentSelector.childContextTypes = {
  disableCurrent: React.PropTypes.bool.isRequired
};
