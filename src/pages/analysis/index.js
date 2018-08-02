import React, {Component} from 'react'
import ScrollArea from 'react-scrollbar';
import {Grid, Col, FormGroup, FormControl, form} from 'react-bootstrap';
import data from './data.json'
import './index.css'

class Analysis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      optionList: data.optionList
    }
  }

  getValidationState() {
    return 'warning';
  }

  handleScroll(scrollData){
    //console.log(scrollData);
  }

  render () {
    let scrollbarStyles = {borderRadius: 5};
    var itemElements = [];

    for( var i = 0; i< this.state.optionList.length; i++){
        var option = this.state.optionList[i].property;
        itemElements.push(
          <div className="item" key={i}>
            <div className="col-xs-8">{option}</div>
            <div className="col-xs-4">
              <FormControl
                type="text"
              />
              <FormControl.Feedback />
            </div>
          </div>
        );
    }

    return (
      <Grid>
        <h3>Blackbox Macromodel</h3>
        <Col className="col-xs-4 optionArea">
          <ScrollArea
              className="area"
              contentClassName="content"
              verticalScrollbarStyle={scrollbarStyles}
              verticalContainerStyle={scrollbarStyles}
              horizontalScrollbarStyle={scrollbarStyles}
              horizontalContainerStyle={scrollbarStyles}
              smoothScrolling={true}
              minScrollSize={40}
              onScroll={this.handleScroll}
              >
              <form>
                <FormGroup
                  id="optionGroup"
                  controlId="formBasicText"
                  validationState={this.getValidationState()}
                  >
                  {itemElements}
                </FormGroup>
              </form>
          </ScrollArea>
        </Col>
      </Grid>
    );
  }
}

export default Analysis
