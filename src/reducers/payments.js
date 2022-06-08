const initialState = {
	fetchingPaymentProcession: false,
	showPaymentSuccessWindow: false,
	showPaymentResult: false,
	fieldsList: [],
	fetchingTradingPairs: false,
	tradingPairs: [],
};

export default function payments(state = initialState, action) {
	switch (action.type) {
		case 'PROCESS_PAYMENT_REQUEST':
			return { ...state, fetchingPaymentProcession: true };

		case 'PROCESS_PAYMENT_SUCCESS':
			return {
				...state,
				fetchingPaymentProcession: false,
				showPaymentSuccessWindow: true,
				showPaymentResult: true,
			};

		case 'PROCESS_PAYMENT_ERROR':
			return { ...state, showPaymentResult: true };

		case 'CLOSE_PAYMENT_RESULT':
			return { ...state, showPaymentSuccessWindow: false, showPaymentResult: false };

		case 'SAVE_FIELDS_LIST':
			return { ...state, fieldsList: action.fieldsList };

		case 'REMOVE_FIELDS_LIST':
			return { ...state, fieldsList: [] };

		// case 'SET_FETCHING_TRADING_PAIRS':
		// 	return { ...state, fetchingTradingPairs: action.payload };

		case 'SET_TRADING_PAIRS':
			return { ...state, fetchingTradingPairs: false, tradingPairs: action.payload };

		default:
			return state;
	}
}
