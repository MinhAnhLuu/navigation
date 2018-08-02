import R from 'ramda';
import React from 'react';
import ComponentSelector from './component-selection/ComponentSelector.js';
import ComponentInspector from './component-inspection/ComponentInspector.js';
import CurrentSpeed from './CurrentSpeed';
import { Button } from 'react-bootstrap';
import './InspectorSidebar.css'
import { printCircuit, updateNetlist } from '../../state/actions';

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

export default class InspectorSidebar extends React.Component {
    constructor(props, context) {
        super(props, context);

        var { store } = this.context;
        this.store = store;

        this.handleNetlistGenerate = this.handleNetlistGenerate.bind(this);
        this.handlePrintCircuit = this.handlePrintCircuit.bind(this);
        this.handleRun = this.handleRun.bind(this);
        this.inspectorSidebarStyle = {
            backgroundColor: 'rgb(40, 40, 40)',
            boxSizing: 'border-box',
            borderLeft: `rgb(125, 249, 255) 2px solid`,
            padding: '10px 5px',
            width: '240px',
            display: 'block',
            flexDirection: 'column',
            minHeight: '100vh'
        }
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
        // console.log("views", JSON.stringify(__views__));
        this.store.dispatch(updateNetlist(__views__));

        var netlist = this.store.getState().netList;
        download("NetList", netlist)
    }

    handlePrintCircuit() {
        this.store.dispatch(printCircuit())
        download("NetList", JSON.stringify(this.store.getState().views))
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

    render() {
        const {
      style,
            selectedComponent,
            currentSpeed,
            handlePlot,
            onSelectMode: handleSelectMode,
            onDeleteComponent: handleDelete,
            oneditComponent: handleeditComponent,
            onChangeCurrentSpeed: handleChangeCurrentSpeed,
            onPrintCircuit: handlePrintCircuit
    } = this.props;
        return (
            <div style={this.inspectorSidebarStyle} className="inspectorSidebar">
                <ComponentInspector style={styles.inspector}
                    selectedComponent={selectedComponent}
                    onDeleteComponent={handleDelete}
                    oneditComponent={handleeditComponent}
                />
            </div>
        );
    }
}

InspectorSidebar.contextTypes = {
    store: PropTypes.object
}

InspectorSidebar.propTypes = {
    style: PropTypes.object,

    onSelectMode: PropTypes.func.isRequired,

    currentSpeed: PropTypes.number.isRequired,

    selectedComponent: PropTypes.shape({
        typeID: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        editables: PropTypes.object
    }),

    onDeleteComponent: PropTypes.func.isRequired,
    oneditComponent: PropTypes.func.isRequired,
    onChangeCurrentSpeed: PropTypes.func.isRequired,
    onPrintCircuit: PropTypes.func.isRequired
};
