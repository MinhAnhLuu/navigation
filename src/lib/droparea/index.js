import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Draggable from '../draggable'
import './index.css'
import LLTLChart from '../../components/chart/voltlinechart-rechart'
import {Button} from 'react-bootstrap'

const ContentComp = React.createClass({
  getInitialState: function() {
    this.dialogClose = this.dialogClose.bind(this)

    return {
      renderPlot : true
    };
  },
  dialogClose () {
    this.setState({renderPlot : false})
    this.props.handlePlotClose(this.props.name)
  },
  render (){
    // console.log("rerender ContentComp")
    return (
      this.state.renderPlot === true ? (
        <object>
          <LLTLChart chartData={this.props.chartData}/>
          <Button className="CSConfirmButton" onClick={this.dialogClose}>Close</Button>
        </object>
      ) : null
    )
  }
})

class DropArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
    };
  }
  onDragOver(e) {
    // console.log("DropArea.onDragOver");

    // DnDを有効にするには既存のイベント処理を無効にする
    e.preventDefault();
    return false;
  }
  // dropイベントのリスナーを設定
  onDrop(e) {
    // console.log("DropArea.onDrop");

    var obj = JSON.parse(e.dataTransfer.getData('application/json'));
    let list = this.state.list;
    let index = this.state.list.findIndex((item) => item.id === obj.id);
    list[index].isDragging = false;
    list[index].top  = (e.clientY - obj.y);
    list[index].left = (e.clientX - obj.x);

    let newState = Object.assign(
      this.state, {
        list : list
      });

    this.setState(newState);

    // DnDを有効にするには既存のイベント処理を無効にする必要がある
    e.preventDefault();
  }
  updateStateDragging( id, isDragging){
    let list = this.state.list;
    let index = this.state.list.findIndex((item) => item.id === id);
    list[index].isDragging = isDragging;

    let newState = Object.assign(
      this.state, {
        list : list
      });
    this.setState(newState);
  }
  updateStateResizing( id, isResizing){
    let list = this.state.list;
    let index = this.state.list.findIndex((item) => item.id === id);
    list[index].isResizing = isResizing;


    let newState = Object.assign(
      this.state, {
        list : list
      });
    this.setState(newState);
  }
  funcResizing(id, clientX, clientY){
    let node = ReactDOM.findDOMNode(this.refs["node_" + id]);

    let list = this.state.list;
    let index = this.state.list.findIndex((item) => item.id === id);
    list[index].width =   clientX - node.offsetLeft + (16 / 2);
    list[index].height =  clientY - node.offsetTop  + (16 / 2);

    let newState = Object.assign(
      this.state, {
        list : list
      });
    this.setState(newState);
  }
  render() {

      // console.log("rerender droparea")
    this.state.list = this.props.list
    var a = this.props.chartData
    let items = [];
    for (let item of this.state.list) {
      var contentComp = <ContentComp name={item.id} handlePlotClose={this.props.handlePlotClose} chartData={this.props.chartData}/>
      items.push(
        <Draggable
          ref={"node_" + item.id}
          key={item.id}
          id={item.id}
          top={item.top}
          left={item.left}
          width={item.width}
          height={item.height}
          contentComp={contentComp}
          isDragging={item.isDragging}
          isResizing={item.isResizing}
          updateStateDragging={this.updateStateDragging.bind(this)}
          updateStateResizing={this.updateStateResizing.bind(this)}
          funcResizing={this.funcResizing.bind(this)}
        />
      );
    }
    return (
      <div
        className="drop-area"
        onDragOver={this.onDragOver.bind(this)}
        onDrop={this.onDrop.bind(this)} >
        {items}
      </div>
    );
  }
};

export default DropArea
