import { ADD_NEW_ARGUMENT, UPDATE_ARGUMENT_VALUE, GET_CHART_DATA, UPDATE_CHART_DATA, GET_CHART_DATA_BY_NETLIST } from '../constants/actionTypes'

var initialState = {
    chartData: {
        numArray: 0,
        arrayNames: [],
        data: []
    },
    args: []
}

var buildFormatRechartData = function (data) {
    var numArr = data.length;
    var lenData = data[0].value.length;
    var rechartData = {
        arrayNames: [],
        numArray: numArr,
        data: []
    };

    for (var i = 0; i < numArr; i++) {
        rechartData.arrayNames.push(data[i].name)
    }

    for (var i = 0; i < lenData; i++) {
        var chartRecord = {}

        for (var j = 0; j < numArr; j++) {
            chartRecord[data[j].name] = parseFloat(data[j].value[i])
        }

        rechartData.data.push(chartRecord)
    }
    return rechartData;
}

export default function circuitData(state = initialState, action) {
    switch (action.type) {
        case ADD_NEW_ARGUMENT:
            return {
                ...state,
                args: [...state.args, {
                    id: action.id,
                    value: action.value
                }]
            }

        case UPDATE_ARGUMENT_VALUE:
            return {
                ...state,
                args: state.args.map(arg =>
                    arg.id === action.id ?
                        { ...arg, value: action.value } :
                        arg
                )
            }

        case GET_CHART_DATA:
            var formData = {}

            Array.from(state.args, function (arg, i) {
                var agrKey = arg.id;
                var argValue = arg.value;

                formData[agrKey] = argValue;
            })

            fetch('http://localhost:3333/example-1', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, method: 'POST', body: JSON.stringify(formData)
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    var responseData = JSON.parse(responseJson.data_chart);

                    action.callback(responseData)
                })
                .catch((error) => { console.error(error); })

            return state

        case GET_CHART_DATA_BY_NETLIST:
            var formData = {
                netList: action.netList
            }

            fetch('http://localhost:3333/get-chart-data-by-netlist', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, method: 'POST', body: JSON.stringify(formData)
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    var responseData = JSON.parse(responseJson.data_chart);

                    action.callback(responseData)
                })
                .catch((error) => { console.error(error); })

            return state

        case UPDATE_CHART_DATA:
            return {
                ...state,
                chartData: buildFormatRechartData(action.responseData)
            }

        default:
            return state
    }
}