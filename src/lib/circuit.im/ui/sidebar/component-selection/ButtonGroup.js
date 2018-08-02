import React from 'react';
import R from 'ramda';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import FaAngleDown from 'react-icons/lib/fa/angle-down';

function styles({ STYLES }) {
  return {
    group: {
      margin: '10px 0px'
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      alignItems: 'baseline'
    },
    title: R.merge(STYLES.title, { paddingLeft: '5px' })
  };
}

class ButtonGroup extends React.Component {
  constructor({ name, children }, { theme }) {
    super()
    this.name = name
    this.children = children;
    this.theme = theme

    this.titleOnClick = this.titleOnClick.bind(this);
    this.state = { childrenHidden: true }
  }

  titleOnClick() {
    if (this.state.childrenHidden == true) {
      this.setState({ childrenHidden: false })
    } else {
      this.setState({ childrenHidden: true })
    }
  }
  render() {
    const style = styles(this.theme);


    return (
      <div style={style.group} >
        {this.state.childrenHidden == false ?
        <div>
          <div style={style.buttons}>
            <span style={style.title} onClick={this.titleOnClick}>
            <FaAngleDown/>{this.name}</span>
          </div>
          <div style={style.buttons}> {this.children} </div>
        </div> 
        : 
          <div style={style.buttons}>
            <span style={style.title} onClick={this.titleOnClick}>
            <FaAngleRight/>{this.name}</span>
          </div> }
      </div>
    );
  }
}

ButtonGroup.propTypes = {
  name: React.PropTypes.string,
  children: React.PropTypes.array.isRequired
};

ButtonGroup.contextTypes = {
  theme: React.PropTypes.object
};

export default ButtonGroup;
