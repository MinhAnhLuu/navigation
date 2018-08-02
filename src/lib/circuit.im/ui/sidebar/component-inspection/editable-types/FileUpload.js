import React from 'react';
import radium from 'radium';
import R from 'ramda';
import { unformatSI, formatSI } from 'format-si-prefix';
import camelToSpace from '../../../utils/camelToSpace';
import axios, { post } from 'axios';
const { PropTypes } = React;



const getStyles = ({ COLORS }) => ({
    value: {
        outer: {
            padding: '10px 0px'
        },
        input: {
            padding: '2px',
            backgroundColor: COLORS.textInputBackground,
            color: COLORS.base,
            width: '90%',
            borderRadius: '2px',
            border: '1px solid transparent',

            ':focus': {
                border: '1px solid transparent',
                color: COLORS.semiHighlight
            }
        }
    }
});

const isOkNumber = R.allPass([
    R.is(Number),
    R.compose(R.not, Number.isNaN)
]);

const within = ({ lower = -Infinity, upper = Infinity }) => (val) => val >= lower && val <= upper;

class UploadFileSelector extends React.Component {

    constructor(props) {
        super(props);
        const { value } = props;
        this.state = {
            value: value ? formatSI(value) : undefined
        };
        this.onValueChange = this.onValueChange.bind(this);
    }
    handleFileUpload(selectorFiles: FileList ) {
        const file = selectorFiles[0];
        var name = 'Awesome Cat Pic';
        let data = new FormData();
        data.append('file', file);
        data.append('name', name);

       
        axios.post('http://localhost:3333/files', data)
                .then(response => console.log("success"))
                .catch(error => console.log("fail"));
    }

    onValueChange(event) {
        // const { editable, bounds = {} } = this.props;

        // const value = event.target.value;
        // this.setState({
        //     value: value || ''
        // });
        // const numericVal = unformatSI(value);
        // if (isOkNumber(numericVal) && within(bounds)(numericVal)) {
        //     this.props.onChangeValue(editable, numericVal);
        // }
    }

    componentWillReceiveProps(nextProps) {
        const { value } = nextProps;
        this.state = {
            value: value ? formatSI(value) : undefined
        };
    }

    render() {
        const { unit, editable } = this.props;
        const { value } = this.state;
        const styles = getStyles(this.context.theme);
        return (
            <div style={styles.value.outer}>
                <div style={{ 'color': '#ddd' }}>
                    {camelToSpace(String(editable))}
                </div>
                <input name="value" type="file" value={value}
                    onChange={this.onValueChange} onChange={(e) => this.handleFileUpload(e.target.files)}/>
            </div>
        );
    }
}

UploadFileSelector.propTypes = {
    editable: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    unit: PropTypes.string,
    bounds: PropTypes.shape({
        lower: PropTypes.number,
        upper: PropTypes.number
    }),

    onChangeValue: PropTypes.func.isRequired
};

UploadFileSelector.contextTypes = {
    theme: PropTypes.object.isRequired
};

export default radium(UploadFileSelector);
