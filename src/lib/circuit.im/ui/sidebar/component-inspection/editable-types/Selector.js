import React from 'react';
import radium from 'radium';
import R from 'ramda';
import { unformatSI, formatSI } from 'format-si-prefix';
import camelToSpace from '../../../utils/camelToSpace';
import { FormGroup, Radio } from 'react-bootstrap';
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

class Selector extends React.Component {

    constructor(props) {
        super(props);
    }

    onValueChange(event) {
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        const { unit, editable, options } = this.props;
        const { value } = this.state;
        const styles = getStyles(this.context.theme);
        const optionsRender = options.map(ele => {
            return (
                <div>
                    <Radio name="radioGroup" inline>
                        {String(ele)}
                    </Radio>
                    <br />
                </div>);
        });

        return (
            <div style={styles.value.outer}>
                <div style={{ 'color': '#ddd' }}>
                    {camelToSpace(String(editable))}
                </div>
                <FormGroup>
                    {optionsRender}
                </FormGroup>
            </div>
        );
    }
}

Selector.propTypes = {
    editable: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    options: PropTypes.arrayOf(PropTypes.string),
    onChangeValue: PropTypes.func.isRequired
};

Selector.contextTypes = {
    theme: PropTypes.object.isRequired
};

export default radium(Selector);
