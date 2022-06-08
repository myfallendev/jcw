import { createSlice } from '@reduxjs/toolkit';
import { getQuote, createPayment } from 'api/simplex';
import { getFiatPairCurrencyRate } from 'api/currencyRate';

const initialState = {
	quoteId: null,
	paymentId: undefined,
	orderId: null,
	success: null,
	fiatMoney: 0,
	cryptoMoney: 0,
	validUntil: null,
	minAmountInUSD: 50,
	maxAmountInUSD: 20000,
	supported_digital_currencies: ['BTC', 'BCH', 'LTC', 'XRP', 'ETH', 'BNB'],
	supported_fiat_currencies: ['USD', 'EUR', 'CAD', 'JPY'],
	fiatRatePair: {},
	fetching: false,
	fetchingPayment: false,
	errors: [],
};

const simplexSlice = createSlice({
	name: 'SIMPLEX',
	initialState,
	reducers: {
		getQuoteStart(state) {
			state.fetching = true;
		},
		getQuoteSuccess(state, action) {
			const { cryptoMoney, fiatMoney, quoteId, validUntil, wallet } = action.payload;
			state.cryptoMoney = cryptoMoney;
			state.fiatMoney = fiatMoney;
			state.quoteId = quoteId;
			state.validUntil = validUntil;
			state.wallet = wallet;
			state.fetching = false;
			state.errors = [];
		},
		getQuoteFailure(state, action) {
			state.errors = action.payload;
			state.fetching = false;
		},
		paymentStart(state) {
			state.fetchingPayment = true;
		},
		paymentSuccess(state, action) {
			const { success, paymentId, orderId } = action.payload;
			state.success = success;
			state.paymentId = paymentId;
			state.orderId = orderId;
			state.errors = [];
			state.fetchingPayment = false;
		},
		paymentFailure(state, action) {
			state.errors = action.payload;
			state.fetchingPayment = false;
		},
		paymentResultReset(state) {
			state.errors = [];
			state.success = null;
		},
		getFiatPairCurrencyRateStart: (state) => {
			state.fetching = true;
			state.errors = [];
		},
		getFiatPairCurrencyRateFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		getFiatPairCurrencyRateSuccess: (state, action) => {
			state.fetching = false;
			state.fiatRatePair = action.payload;
		},
	},
});

export const {
	getQuoteStart,
	getQuoteSuccess,
	getQuoteFailure,

	paymentStart,
	paymentSuccess,
	paymentFailure,
	paymentResultReset,

	getFiatPairCurrencyRateStart,
	getFiatPairCurrencyRateFailed,
	getFiatPairCurrencyRateSuccess,
} = simplexSlice.actions;

export default simplexSlice.reducer;

export const fetchQuote = (...args) => async (dispatch) => {
	try {
		dispatch(getQuoteStart());
		const { data } = await getQuote(...args);
		if (data.errorCode) {
			return dispatch(getQuoteFailure(data.errors));
		}
		dispatch(getQuoteSuccess(data.response));
	} catch (err) {
		console.error(err);
	}
};

export const fetchPayment = (paymentData) => async (dispatch) => {
	try {
		dispatch(paymentStart());
		const { data } = await createPayment(paymentData);
		if (data.errorCode) {
			return dispatch(paymentFailure(data.errors));
		}
		dispatch(paymentSuccess(data.response));
	} catch (err) {
		console.error(err);
	}
};

export const fetchGetFiatPairCurrencyRate = (fromCurrencyId, toCurrencyId) => async (dispatch) => {
	try {
		dispatch(getFiatPairCurrencyRateStart());
		const { data } = await getFiatPairCurrencyRate({ fromCurrencyId, toCurrencyId });
		if (data.errorCode) {
			return dispatch(getFiatPairCurrencyRateFailed(data.errors));
		}
		dispatch(getFiatPairCurrencyRateSuccess(data));
	} catch (err) {
		console.error(err);
	}
};
