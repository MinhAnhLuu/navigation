import { ADD_NEW_ARGUMENT, UPDATE_ARGUMENT_VALUE, GET_CHART_DATA, UPDATE_CHART_DATA, GET_CHART_DATA_BY_NETLIST} from '../constants/actionTypes'

export const addNewArgument = (id, value) => ({ type: ADD_NEW_ARGUMENT, id, value })
export const updateArgumentValue = (id, value) => ({ type: UPDATE_ARGUMENT_VALUE, id, value })
export const getChartData = (callback) => ({ type: GET_CHART_DATA, callback})
export const updateChartData = (responseData) => ({ type: UPDATE_CHART_DATA, responseData})
export const getChartDataByNetlist = (netList, callback) => ({ type: GET_CHART_DATA_BY_NETLIST, netList, callback})