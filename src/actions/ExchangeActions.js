// import fetchTimeoutWrapper from '../utils/fetchTimeoutWrapper'
import { fetchGetAccounts } from 'features/accountsSlice';

import axiosWrapper from '../utils/axiosWrapper';
import moment from 'moment';
import _isEmpty from 'lodash/isEmpty';

export const REQUEST_PAIRS = 'REQUEST_PAIRS';
export const RECEIVE_PAIRS = 'RECEIVE_PAIRS';
export const RECEIVE_PAIRS_ERROR = 'RECEIVE_PAIRS_ERROR';

export const REQUEST_TICKER_INFO = 'REQUEST_TICKER_INFO';
export const RECEIVE_TICKER_INFO = 'RECEIVE_TICKER_INFO';
export const RECEIVE_TICKER_INFO_ERROR = 'RECEIVE_TICKER__INFO_ERROR';

export const REQUEST_ORDER_SEND = 'REQUEST_ORDER_SEND';
export const RECEIVE_ORDER_SEND_SUCCEED = 'RECEIVE_ORDER_SEND_SUCCEED';
export const RECEIVE_ORDER_SEND_ERROR = 'RECEIVE_ORDER_SEND_ERROR';

export const REQUEST_ACTIVE_ORDERS = 'REQUEST_ACTIVE_ORDERS';
export const RECEIVE_ACTIVE_ORDERS = 'RECEIVE_ACTIVE_ORDERS';
export const RECEIVE_ACTIVE_ORDERS_ERROR = 'RECEIVE_ACTIVE_ORDERS_ERROR';

export const REQUEST_MARKET_ORDERS = 'REQUEST_MARKET_ORDERS';
export const RECEIVE_MARKET_ORDERS = 'RECEIVE_MARKET_ORDERS';
export const RECEIVE_MARKET_ORDERS_ERROR = 'RECEIVE_MARKET_ORDERS_ERROR';

export const REQUEST_REMOVE_ACTIVE_ORDER = 'REQUEST_REMOVE_ACTIVE_ORDER';
export const RECEIVE_REMOVE_ACTIVE_ORDER = 'RECEIVE_REMOVE_ACTIVE_ORDER';
export const RECEIVE_REMOVE_ACTIVE_ORDER_ERROR = 'RECEIVE_REMOVE_ACTIVE_ORDER_ERROR';

export const REQUEST_TRADE_HISTROY = 'REQUEST_TRADE_HISTROY';
export const RECEIVE_TRADE_HISTROY = 'RECEIVE_TRADE_HISTROY';
export const RECEIVE_TRADE_HISTROY_ERROR = 'RECEIVE_TRADE_HISTROY_ERROR';

export const REQUEST_CHART_DATA = 'REQUEST_CHART_DATA';
export const RECEIVE_CHART_DATA = 'RECEIVE_CHART_DATA';

export const CANCEL_FETCHING_BY_TIMEOUT = 'CANCEL_FETCHING_BY_TIMEOUT';

function fetchingTimeout() {
	return {
		type: CANCEL_FETCHING_BY_TIMEOUT,
	};
}

// function requestPairsData() {
// 	return {
// 		type: REQUEST_PAIRS,
// 	};
// }

// function receivePairsData(defaultData, filteredData) {
// 	return {
// 		type: RECEIVE_PAIRS,
// 		result: filteredData,
// 		defaultData,
// 	};
// }

// export function getPairsData(currencyCodes, pairsFilter, defaultTicker) {
// 	return (dispatch) => {
// 		dispatch(requestPairsData());
// 		const url = '/api/Trading/Info';

// 		return axiosWrapper(url)
// 			.then((response) => {
// 				if (!Array.isArray(response.data) || _isEmpty(response.data)) {
// 					dispatch(fetchingTimeout());
// 					return;
// 				}

// 				if (_isEmpty(currencyCodes)) {
// 					dispatch(receivePairsData(response.data));

// 					return;
// 				}

// 				let currencyCodesObj = {};
// 				currencyCodes.forEach((item) => {
// 					currencyCodesObj[item.isoName] = item.id;
// 				});

// 				const pairsData = response.data.map((item) => {
// 					let currencyFromCode = currencyCodesObj[item.currencyFrom] || '';
// 					let currencyToCode = currencyCodesObj[item.currencyTo] || '';

// 					return Object.assign(item, { currencyFromCode, currencyToCode });
// 				});

// 				const filteredData = pairsFilter
// 					? pairsData.filter((item) => {
// 							return (
// 								item.currencyFrom.search(pairsFilter.toUpperCase()) !== -1 ||
// 								item.currencyTo.search(pairsFilter.toUpperCase()) !== -1
// 							);
// 					  })
// 					: pairsData;

// 				dispatch(receivePairsData(pairsData, filteredData));

// 				return filteredData;
// 			})
// 			.then((json) => {
// 				if (Array.isArray(json) && json[0]) {
// 					dispatch(select(defaultTicker || json[0]));
// 				}
// 			})
// 			.catch((e) => {
// 				console.log(e);
// 				dispatch(fetchingTimeout());
// 			});
// 	};
// }

export function select(pairObject) {
	//debugger;
	return (dispatch) => {
		dispatch(requestTickerInfo(pairObject));

		const pair = '' + pairObject.currencyFrom + '%2C' + pairObject.currencyTo;
		const url = '/api/Trading/Ticker?tradingPair=' + pair + '&interval=24%3A00%3A00';

		return axiosWrapper(url)
			.then((response) => {
				if (response.data[0] && response.data[0].errorCode === 0) {
					dispatch(receiveTickerInfo(response.data[0].points[0]));
				} else {
					dispatch(fetchingTimeout());
				}
			})
			.then(() => {
				dispatch(getChartData(pairObject));
				dispatch(getMarketOrders(pairObject));
				dispatch(getActiveOrders(pairObject));
				dispatch(getTradeHistory(pairObject));
			})
			.catch((e) => {
				console.log(e);
				dispatch(fetchingTimeout());
			});
	};
}

function requestTickerInfo(pairData) {
	return {
		type: REQUEST_TICKER_INFO,
		currentTicker: pairData,
	};
}

function receiveTickerInfo(data) {
	return {
		type: RECEIVE_TICKER_INFO,
		result: data,
	};
}

function orderSendRequest() {
	return {
		type: REQUEST_ORDER_SEND,
	};
}

function orderSendSucceed() {
	return {
		type: RECEIVE_ORDER_SEND_SUCCEED,
	};
}

function orderSendError(json) {
	return {
		type: RECEIVE_ORDER_SEND_ERROR,
		errorMessage: json,
	};
}

export function sendOrder(order, pairObject, callback) {
	return (dispatch) => {
		dispatch(orderSendRequest());
		const url = '/api/Trading/Trade';

		axiosWrapper(url, {
			method: 'POST',
			data: JSON.stringify(order),
		})
			.then((response) => {
				let data = response.data;

				if (data.errorCode === 0) {
					dispatch(fetchGetAccounts());
					dispatch(select(pairObject));
					dispatch(orderSendSucceed());
					callback(true);
				} else {
					dispatch(orderSendError(data));
					callback(false);
				}
			})
			.catch((e) => {
				console.error(e);
				dispatch(orderSendError(e));
				callback(false);
			});
	};
}

function orderRemoveRequest() {
	return {
		type: REQUEST_REMOVE_ACTIVE_ORDER,
	};
}

function orderRemoveRecieved() {
	return {
		type: RECEIVE_REMOVE_ACTIVE_ORDER,
	};
}

function orderRemoveError(json) {
	return {
		type: RECEIVE_REMOVE_ACTIVE_ORDER_ERROR,
		errorMessage: json,
	};
}

export function removeOrder(order, pairObject, callback) {
	return (dispatch) => {
		dispatch(orderRemoveRequest());
		const url = '/api/Trading/RemoveOrder';

		return axiosWrapper(url, {
			method: 'POST',
			data: JSON.stringify(order),
		})
			.then((response) => {
				if (response.data.errorCode === 0) {
					dispatch(orderRemoveRecieved());
					callback(true);
				} else {
					dispatch(orderRemoveError(response.data));
					callback(false);
				}
			})
			.catch((e) => {
				console.log(e);
				dispatch(orderRemoveError(e));
				callback(false);
			})
			.then(() => {
				dispatch(fetchGetAccounts());
				dispatch(getActiveOrders(pairObject));
				dispatch(getMarketOrders(pairObject));
			});
	};
}

function requestActiveOrders() {
	return {
		type: REQUEST_ACTIVE_ORDERS,
	};
}

function receiveActiveOrders(result) {
	return {
		type: RECEIVE_ACTIVE_ORDERS,
		result,
	};
}

function receiveActiveOrdersError(errorString) {
	return {
		type: RECEIVE_ACTIVE_ORDERS_ERROR,
		result: errorString,
	};
}

export function getActiveOrders(pairObject) {
	return (dispatch) => {
		dispatch(requestActiveOrders());

		let url = '/api/Trading/ActiveOrders?tradingPair=';
		// let pairStr = "" + pairObject.currencyFrom + '%2C' + pairObject.currencyTo;

		return axiosWrapper(url, { method: 'GET' })
			.then((response) => {
				dispatch(receiveActiveOrders(response.data));
			})
			.catch((e) => {
				console.log(e);
				dispatch(receiveActiveOrdersError(e));
			});
	};
}

function requestTradeHistory() {
	return {
		type: REQUEST_TRADE_HISTROY,
	};
}

function receiveTradeHistory(result, availableMore, shouldConcat) {
	return {
		type: RECEIVE_TRADE_HISTROY,
		result,
		availableMore,
		shouldConcat,
	};
}

function receiveTradeHistoryError(errorString) {
	return {
		type: RECEIVE_TRADE_HISTROY_ERROR,
		result: errorString,
	};
}

export function getTradeHistory(pairObject, pageNumber = 1) {
	return (dispatch) => {
		dispatch(requestTradeHistory());
		const itemsPerPage = 20;

		let baseUrl = '/api/Trading/CompletedOrders?tradingPair=';
		let pairStr = '' + pairObject.currencyFrom + '%2C' + pairObject.currencyTo;
		let url = '' + baseUrl + pairStr + '&page=' + pageNumber + '&itemsPerPage=' + itemsPerPage;

		return axiosWrapper(url, { method: 'GET' })
			.then((response) => {
				const isValid = Array.isArray(response.data) && response.data.length;
				const result = isValid ? response.data : [];
				const available = isValid ? result.length === itemsPerPage : false;

				dispatch(receiveTradeHistory(result, available, pageNumber !== 1));
			})
			.catch((e) => {
				console.log(e);
				dispatch(receiveTradeHistoryError(e));
			});
	};
}

function requestChartData() {
	return {
		type: REQUEST_CHART_DATA,
	};
}

export function receiveChartData(arr) {
	return {
		type: RECEIVE_CHART_DATA,
		result: arr,
	};
}

export function getChartData(currentTicker) {
	let pair = currentTicker.currencyFrom + '%2C' + currentTicker.currencyTo;

	return (dispatch) => {
		dispatch(requestChartData());

		let start = moment()
			.subtract(24 * 14, 'hours')
			.startOf('hour')
			.utc()
			.format();
		let startPoint = '&startPoint=' + start.replace(/:/, '%3A');
		let url = '/api/Trading/Ticker?tradingPair=' + pair + startPoint + '&interval=00%3A05%3A00';

		axiosWrapper(url)
			.then((response) => {
				if (!Array.isArray(response.data) || !response.data.length) return [];

				return response.data[0].points.map((item) => {
					return {
						date: new Date(item.timePoint),
						open: +item.firstPrice,
						high: +item.high,
						low: +item.low,
						close: +item.lastPrice,
						volume: +item.volume,
					};
				});
			})
			.then((result) => dispatch(receiveChartData(result)));
	};
}

export function requestMarketOrders() {
	return {
		type: REQUEST_MARKET_ORDERS,
	};
}

export function catchMarketOrdersError(e) {
	return {
		type: RECEIVE_MARKET_ORDERS_ERROR,
		result: e,
	};
}

export function receiveMarketOrders(data) {
	return {
		type: RECEIVE_MARKET_ORDERS,
		result: data,
	};
}

export function getMarketOrders(currentTicker) {
	return (dispatch) => {
		dispatch(requestMarketOrders());

		const { currencyFrom, currencyTo } = currentTicker;
		let url = '/api/Trading/MarketOrders?tradingPair=' + currencyFrom + '%2C' + currencyTo;

		axiosWrapper(url, { method: 'GET' })
			.then((response) => dispatch(receiveMarketOrders(response.data)))
			.catch((e) => dispatch(catchMarketOrdersError(e)));
	};
}
