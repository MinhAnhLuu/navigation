import React, {Component} from 'react';
import {Navbar, Nav, NavItem, Button, Modal, MenuItem, NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import './index.css'


import R from 'ramda';
//import React from 'react';
import ComponentSelector from '../../lib/circuit.im/ui/sidebar/component-selection/ComponentSelector.js';
import ComponentInspector from '../../lib/circuit.im/ui/sidebar/component-inspection/ComponentInspector.js';
import CurrentSpeed from '../../lib/circuit.im/ui/sidebar/CurrentSpeed.js';
//import { Button } from 'react-bootstrap';
//import "./Sidebar.css"
import { printCircuit, updateNetlist, loadCircuit } from '../../lib/circuit.im/state/actions';
const { PropTypes } = React;
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

const styles = {
  selector: {
    flexGrow: 4
  },
  inspector: {
    minHeight: '5em'
  },
  footer: {
    alignSelf: 'center',
    paddingTop: '5px'
  }
};

function buildFileSelector(){
  const fileSelector = document.createElement('input');
  fileSelector.setAttribute('type', 'file');
  //fileSelector.setAttribute('multiple', 'multiple');
  return fileSelector;
}

export default class NavBarInstance extends React.Component {
  constructor(props, context) {
    super(props, context);
    var {store} = this.context;
    this.store = store;
    this.state={showModal: false};
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);


    this.handleNetlistGenerate = this.handleNetlistGenerate.bind(this);
    this.handlePrintCircuit = this.handlePrintCircuit.bind(this);
    this.handleRun = this.handleRun.bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount(){
   // this.fileSelector = buildFileSelector();
  }
  handleFileSelect = (e) => {
    e.preventDefault();
    this.fileSelector = buildFileSelector();
    this.fileSelector.click();
    var string, dialogLines = this.fileSelector.name;
    var string, dialogLines2 = this.fileSelector.textContent;
    var string, dialogLines3 = this.fileSelector.type;
    var string, dialogLines4 = this.fileSelector.title;
    var string, dialogLines5 = this.fileSelector.innerText;
    var string, dialogLines6 = this.fileSelector.outerText;
    var string, dialogLines7 = this.fileSelector.formTarget;
    var string, dialogLines8 = this.fileSelector.getElementsByTagName.textContent;
    var string, dialogLines9 = this.fileSelector.contentEditable;
    var string, dialogLines10 = this.fileSelector.align;
    var string, dialogLines11 = this.fileSelector.value;
    var string, dialogLines12 = this.fileSelector.useMap;
    var string, dialogLines13 = this.fileSelector.src;
    var string, dialogLines14 = this.fileSelector.slot;
    var string, dialogLines15 = this.fileSelector.maxLength;
    var string, dialogLines16 = this.fileSelector.id;
    //this.store.dispatch(loadCircuit(this.fileSelector.textContent));
    return false;
  }
  shouldComponentUpdate(nextProps) {
    const {
      currentSpeed,
      selectedComponent
    } = this.props;

    if (currentSpeed !== nextProps.currentSpeed) {
      return true;
    }

    if (!R.equals(selectedComponent, nextProps.selectedComponent)) {
      return true;
    }

    return false;
  }

  handleNetlistGenerate() {
    var __views__ = Object.values(this.store.getState().views);
    console.log("views", JSON.stringify(__views__));
    this.store.dispatch(updateNetlist(__views__));

    var netlist = this.store.getState().netList;
    download("NetList", netlist)
  }

  handlePrintCircuit() {
    this.store.dispatch(printCircuit())
  }

  handleRun() {
    var __views__ = Object.values(this.store.getState().views);
    // console.log("views", JSON.stringify(__views__));
    this.store.dispatch(updateNetlist(__views__));
    var context = this;
    var callback = function (responseData) {
      alert("Data sent back.")
      context.store.dispatch({
        type: 'UPDATE_CHART_DATA',
        responseData: responseData
      })
    }
    this.store.dispatch({
      type: 'GET_CHART_DATA_BY_NETLIST',
      netList: this.store.getState().netList,
      callback: callback
    })
  }
  
  open() {
    this.setState({showModal: true});
  }

  close() {
    this.setState({showModal: false});
  }

  render() {
    return(
      <div>
      <Navbar inverse collapseOnSelect className="App-Topic">
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Circuit-Simulator</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav bsStyle="pills">
            <NavItem eventKey={1}><Link to="/instruction">Instruction</Link></NavItem>
            <NavItem eventKey={2}><Link to="/about">About</Link></NavItem>
            <NavDropdown eventKey={3} title="Tool" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}onClick={this.handleRun}>Run</MenuItem>
        <MenuItem eventKey={3.2}>Plot</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.3}onClick={this.handleNetlistGenerate}>Netlist Download</MenuItem>
        <MenuItem eventKey={3.4}onClick={this.handlePrintCircuit}>Save circuit</MenuItem>
        <MenuItem eventKey={3.5}onClick={this.handleFileSelect}>Upload circuit</MenuItem>
      </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={3} href="#">
              <Navbar.Link>Register</Navbar.Link>
            </NavItem>
            <NavItem eventKey={4} href="#">
              <Navbar.Link onClick={this.open}>Sign In</Navbar.Link>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={this.state.showModal} onHide={this.close}>
         <Modal.Header closeButton>
           <Modal.Title>Login Portal</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <h4>Username</h4>
           <input type="text"/>
           <h4>Password</h4>
           <input type="password"/>
         </Modal.Body>
         <Modal.Footer>
           <Button bsStyle="primary" onClick={this.close}>Log In</Button>
         </Modal.Footer>
       </Modal>
       </div>
    );
  }
}

NavBarInstance.contextTypes = {
  store: PropTypes.object
}


