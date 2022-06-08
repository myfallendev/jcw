import { createSlice } from '@reduxjs/toolkit';
import { fetchGetAccounts } from '../accountsSlice';
import {
	getTradingPairs,
	getActiveOrders,
	getMarketOrders,
	getTradingHistory,
	getTickerInfo,
	sendOrder,
	removeOrder,
} from 'api/trading';
import moment from 'moment';

const initialState = {
	tradingPairs: [],
	tickerInfo: {},
	chartData: [],
	activeOrders: [],
	marketOrders: [],
	tradeHistory: [],
	tradeHistoryAvailableMore: false,

	fetching: false,
	fetchingTradingPairs: false,
	removeOrderFetching: false,
	activeOrdersFetching: false,
	marketOrdersFetching: false,
	tradingHistoryFetching: false,
	errors: [],
	serverError: false,
};

const tradingSlice = createSlice({
	name: 'TRADING',
	initialState,
	reducers: {
		getTradingPairsStart: (state) => {
			state.fetchingTradingPairs = true;
			state.errors = [];
			state.serverError = false;
		},
		getTradingPairsFailed: (state, action) => {
			state.fetchingTradingPairs = false;
			state.errors = action.payload;
		},
		getTradingPairsSuccess: (state, action) => {
			state.fetchingTradingPairs = false;
			state.tradingPairs = action.payload.filter((item) => Boolean(item.currencyFrom));
		},
		fetchingTimeout: (state) => {
			state.fetching = false;
			state.serverError = true;
		},
		getTickerInfoStart: (state) => {
			state.fetching = true;
			state.errors = [];
			state.serverError = false;
		},
		getTickerInfoFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		getTickerInfoSuccess: (state, action) => {
			state.fetching = false;
			state.tickerInfo = action.payload[0].points[0] || {};
		},
		getChartDataStart: (state) => {
			state.fetching = true;
			state.errors = [];
			state.serverError = false;
		},
		getChartDataFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		getChartDataSuccess: (state, action) => {
			state.fetching = false;
			state.chartData = action.payload;
		},
		removeOrderStart: (state) => {
			state.removeOrderFetching = true;
			state.errors = [];
			state.serverError = false;
		},
		removeOrderFailed: (state, action) => {
			state.removeOrderFetching = false;
			state.errors = action.payload;
		},
		removeOrderSuccess: (state) => {
			state.removeOrderFetching = false;
		},
		getActiveOrdersStart: (state) => {
			state.activeOrdersFetching = true;
			state.errors = [];
			state.serverError = false;
		},
		getActiveOrdersFailed: (state, action) => {
			state.activeOrdersFetching = false;
			state.errors = action.payload;
		},
		getActiveOrdersSuccess: (state, action) => {
			state.activeOrdersFetching = false;
			state.activeOrders = action.payload;
		},
		getMarketOrdersStart: (state) => {
			state.marketOrdersFetching = true;
			state.errors = [];
			state.serverError = false;
		},
		getMarketOrdersFailed: (state, action) => {
			state.marketOrdersFetching = false;
			state.errors = action.payload;
		},
		getMarketOrdersSuccess: (state, action) => {
			state.marketOrdersFetching = false;
			state.marketOrders = action.payload;
		},
		getTradingHistoryStart: (state) => {
			state.tradingHistoryFetching = true;
			state.errors = [];
			state.serverError = false;
		},
		getTradingHistoryFailed: (state, action) => {
			state.tradingHistoryFetching = false;
			state.errors = action.payload;
		},
		getTradingHistorySuccess: (state, action) => {
			state.tradingHistoryFetching = false;
			state.tradeHistory = action.payload.shouldConcat
				? state.tradeHistory.concat(action.payload.result)
				: action.payload.result;
			state.tradeHistoryAvailableMore = action.payload.availableMore;
		},
		sendOrderStart: (state) => {
			state.fetching = true;
			state.errors = [];
			state.serverError = false;
		},
		sendOrderFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		sendOrderSuccess: (state) => {
			state.fetching = false;
		},
	},
});

export default tradingSlice.reducer;
export const {
	getTradingPairsStart,
	getTradingPairsFailed,
	getTradingPairsSuccess,
	getTickerInfoStart,
	getTickerInfoFailed,
	getTickerInfoSuccess,
	fetchingTimeout,
	getChartDataStart,
	getChartDataFailed,
	getChartDataSuccess,
	removeOrderStart,
	removeOrderFailed,
	removeOrderSuccess,
	getActiveOrdersStart,
	getActiveOrdersFailed,
	getActiveOrdersSuccess,
	getMarketOrdersStart,
	getMarketOrdersFailed,
	getMarketOrdersSuccess,
	getTradingHistoryStart,
	getTradingHistoryFailed,
	getTradingHistorySuccess,
	sendOrderStart,
	sendOrderFailed,
	sendOrderSuccess,
} = tradingSlice.actions;

export const fetchGetTradingPairs = () => async (dispatch) => {
	try {
		dispatch(getTradingPairsStart());
		const { data } = await getTradingPairs();
		if (data.errorCode) {
			return dispatch(getTradingPairsFailed(data.errors));
		}
		dispatch(getTradingPairsSuccess(data));
	} catch (err) {
		dispatch(fetchingTimeout());
		console.error(err);
	}
};

export const fetchGetTickerInfo = (tradingPairObject) => async (dispatch) => {
	try {
		dispatch(getTickerInfoStart());
		const { data } = await getTickerInfo(`${tradingPairObject.currencyFrom},${tradingPairObject.currencyTo}`);
		if (data.errorCode) {
			return dispatch(getTickerInfoFailed(data.errors));
		}
		dispatch(getTickerInfoSuccess(data));
	} catch (err) {
		dispatch(fetchingTimeout());
		console.error(err);
	}
};

export const fetchGetChartData = (tradingPairObject) => async (dispatch) => {
	const pair = `${tradingPairObject.currencyFrom},${tradingPairObject.currencyTo}`;
	const start = moment()
		.subtract(24 * 14, 'hours')
		.startOf('hour')
		.utc()
		.format();
	//const startPoint = '&startPoint=' + start.replace(/:/, '%3A');
	//let url = '/api/Trading/Ticker?tradingPair=' + pair + startPoint + '&interval=00%3A05%3A00';
	try {
		dispatch(getChartDataStart());
		const { data } = await getTickerInfo(pair, start, `00:05:00`);
		if (data.errorCode) {
			return dispatch(getChartDataFailed(data.errors));
		}
		const chartData = data.length
			? data[0].points.map((item) => ({
					date: item.timePoint,
					open: +item.firstPrice,
					high: +item.high,
					low: +item.low,
					close: +item.lastPrice,
					volume: +item.volume,
			  }))
			: [];
		dispatch(getChartDataSuccess(chartData));
	} catch (err) {
		console.error(err);
	}
};

export const fetchRemoveOrder = (order, pair, callback) => async (dispatch) => {
	try {
		dispatch(removeOrderStart());
		const { data } = await removeOrder(order);
		if (data.errorCode) {
			dispatch(removeOrderFailed(data.errors));
			callback(false);
			return;
		}
		dispatch(removeOrderSuccess());
		callback(true);
	} catch (err) {
		console.error(err);
		dispatch(removeOrderFailed(err));
		callback(false);
	} finally {
		dispatch(fetchGetAccounts());
		dispatch(fetchGetActiveOrders(pair));
		dispatch(fetchGetMarketOrders(pair));
	}
};

export const fetchSendOrder = (order, pair, callback) => async (dispatch) => {
	try {
		dispatch(sendOrderStart());
		const { data } = await sendOrder(order);
		if (data.errorCode) {
			dispatch(sendOrderFailed(data.errors));
			callback(false);
			return;
		}
		dispatch(sendOrderSuccess());
		callback(true);
		dispatch(fetchGetAccounts());
		dispatch(fetchGetTickerInfo(pair));
		dispatch(fetchGetChartData(pair));
		dispatch(fetchGetActiveOrders(pair));
		dispatch(fetchGetMarketOrders(pair));
		dispatch(fetchGetTradingHistory(pair));
	} catch (err) {
		console.error(err);
		dispatch(sendOrderFailed(err));
		callback(false);
	}
};

export const fetchGetActiveOrders = (tradingPairObject) => async (dispatch) => {
	const pair = tradingPairObject && `${tradingPairObject.currencyFrom},${tradingPairObject.currencyTo}`;
	try {
		dispatch(getActiveOrdersStart());
		const { data } = await getActiveOrders(pair || '');
		if (data.errorCode) {
			return dispatch(getActiveOrdersFailed(data.errors));
		}
		dispatch(getActiveOrdersSuccess(data));
	} catch (err) {
		console.error(err);
	}
};

export const fetchGetMarketOrders = (tradingPairObject) => async (dispatch) => {
	const pair = `${tradingPairObject.currencyFrom},${tradingPairObject.currencyTo}`;
	try {
		dispatch(getMarketOrdersStart());
		const { data } = await getMarketOrders(pair);
		if (data.errorCode) {
			return dispatch(getMarketOrdersFailed(data.errors));
		}
		dispatch(getMarketOrdersSuccess(data));
	} catch (err) {
		console.error(err);
	}
};

export const fetchGetTradingHistory = (tradingPairObject, page = 1, itemsPerPage = 20) => async (dispatch) => {
	const pair = `${tradingPairObject.currencyFrom},${tradingPairObject.currencyTo}`;
	try {
		dispatch(getTradingHistoryStart());
		const { data } = await getTradingHistory(pair, page, itemsPerPage);
		if (data.errorCode) {
			return dispatch(getTradingHistoryFailed(data.errors));
		}
		const isValid = Array.isArray(data) && data.length;
		const result = isValid ? data : [];
		const available = isValid ? result.length === itemsPerPage : false;
		dispatch(getTradingHistorySuccess({ result, availableMore: available, shouldConcat: page !== 1 }));
	} catch (err) {
		console.error(err);
	}
};
