const initialState = {
	pairsData: [],
	pairsDataIsFetching: false,
	tickerInfo: {},
	tickerInfoIsFetching: false,
	currentTicker: {},
	orderIsFetching: false,
	tradeHistory: [],
	tradeHistoryIsFetching: false,
	tradeHistoryAvailableMore: false,
	activeOrders: [],
	activeOrdersAreFetching: false,
	orderRemoveIsFetching: false,
	chartDataIsFetching: [],
	chartData: [],
	marketOrdersDataIsFetching: false,
	marketOrders: [],
	defaultPairsData: [],
};

export default function exchange(state = initialState, action) {
	switch (action.type) {
		case 'REQUEST_PAIRS':
			return {
				...state,
				pairsDataIsFetching: true,
			};

		case 'RECEIVE_PAIRS':
			return {
				...state,
				pairsDataIsFetching: false,
				pairsData: action.result,
				defaultPairsData: action.defaultData,
			};

		case 'RECEIVE_PAIRS_ERROR':
			return {
				...state,
				pairsDataIsFetching: false,
				pairsData: [],
				error: { pairsData: action.result },
			};

		case 'REQUEST_TICKER_INFO':
			let currentTicker = action.currentTicker || state.currentTicker;

			return {
				...state,
				showErrors: false,
				tickerInfoIsFetching: true,
				orderIsFetching: true,
				tradeHistoryIsFetching: true,
				activeOrdersAreFetching: true,
				chartDataIsFetching: true,
				marketOrdersDataIsFetching: true,
				tickerInfo: {},
				currentTicker,
			};

		case 'RECEIVE_TICKER_INFO':
			return {
				...state,
				showErrors: false,
				tickerInfoIsFetching: false,
				tickerInfo: action.result,
			};

		case 'RECEIVE_TICKER_INFO_ERROR':
			return {
				...state,
				showErrors: true,
				tickerInfoIsFetching: false,
				tickerInfo: {},
				error: { tickerInfo: action.result },
			};

		case 'REQUEST_ORDER_SEND':
			return {
				...state,
				showErrors: false,
				orderIsFetching: true,
				error: { order: {} },
			};

		case 'RECEIVE_ORDER_SEND_SUCCEED':
			return {
				...state,
				orderIsFetching: false,
			};

		case 'RECEIVE_ORDER_SEND_ERROR':
			return {
				...state,
				showErrors: true,
				orderIsFetching: false,
				error: { order: action.result },
			};

		case 'REQUEST_ACTIVE_ORDERS':
			return {
				...state,
				showErrors: false,
				activeOrdersAreFetching: true,
				error: { activeOrders: {} },
			};

		case 'RECEIVE_ACTIVE_ORDERS':
			return {
				...state,
				activeOrdersAreFetching: false,
				activeOrders: action.result,
			};

		case 'RECEIVE_ACTIVE_ORDERS_ERROR':
			return {
				...state,
				showErrors: true,
				activeOrdersAreFetching: false,
				error: { activeOrders: action.result },
			};

		case 'REQUEST_REMOVE_ACTIVE_ORDER':
			return {
				...state,
				showErrors: false,
				orderRemoveIsFetching: true,
				error: { removeOrder: {} },
			};

		case 'RECEIVE_REMOVE_ACTIVE_ORDER':
			return {
				...state,
				orderRemoveIsFetching: false,
			};

		case 'RECEIVE_REMOVE_ACTIVE_ORDER_ERROR':
			return {
				...state,
				showErrors: true,
				orderRemoveIsFetching: false,
				error: { removeOrder: action.result },
			};

		case 'REQUEST_TRADE_HISTROY':
			return {
				...state,
				showErrors: false,
				tradeHistoryIsFetching: true,
				error: { tradeHistory: {} },
			};

		case 'RECEIVE_TRADE_HISTROY':
			const tradeHistory = action.shouldConcat ? state.tradeHistory.concat(action.result) : action.result;

			return {
				...state,
				tradeHistoryIsFetching: false,
				tradeHistory,
				tradeHistoryAvailableMore: action.availableMore,
			};

		case 'RECEIVE_TRADE_HISTROY_ERROR':
			return {
				...state,
				showErrors: true,
				tradeHistoryIsFetching: false,
				error: { tradeHistory: action.result },
			};

		case 'REQUEST_CHART_DATA':
			return {
				...state,
				chartDataIsFetching: true,
			};

		case 'RECEIVE_CHART_DATA':
			return {
				...state,
				chartData: action.result,
				chartDataIsFetching: false,
			};

		case 'REQUEST_MARKET_ORDERS':
			return {
				...state,
				marketOrdersDataIsFetching: true,
			};

		case 'RECEIVE_MARKET_ORDERS':
			return {
				...state,
				marketOrdersDataIsFetching: false,
				marketOrders: action.result,
			};

		case 'RECEIVE_MARKET_ORDERS_ERROR':
			return {
				...state,
				marketOrdersDataIsFetching: false,
				error: { marketOrders: action.result },
			};

		case 'CANCEL_FETCHING_BY_TIMEOUT':
			return {
				...state,
				showErrors: true,
				error: { timeout: true },
			};

		case 'RESET_EXCHANGE_DATA':
			return {
				...initialState,
			};

		default:
			return state;
	}
}
