import { createSlice } from '@reduxjs/toolkit';
import {
	authenticate,
	authenticationConfirm,
	getAllCurrencies,
	getLimits,
	getInfo,
	getRateForCurrency,
	verifyPhone,
	verifyPhoneConfirm,
	makePayment,
	getPayment,
	getPayUrl,
} from 'api/moonpay';

const initialState = {
	showMoonPayForm: false,
	isMoonPayUser: false,
	isAuthenticated: false,
	supported_fiat_currencies: [],
	supported_crypto_currencies: [],
	limits: [],
	verificationLevels: [],
	getInfo: null,
	isPhoneNumberVerified: null,
	needPhoneCodeConfirmation: false,
	fiatCurrencyISOName: '',
	rate: 0,
	paymentId: null,
	paymentResponse: null,
	paymentSuccess: null,

	payUrl: '',

	minAmountInUSD: 20,
	maxAmountInUSD: 20000,

	fetching: false,
	fetchingPayment: false,
	errors: [],
};

const moonpaySlice = createSlice({
	name: 'MOONPAY',
	initialState,
	reducers: {
		authStart(state) {
			state.fetching = true;
			state.errors = [];
		},
		authFailed(state, action) {
			state.fetching = false;
			state.errors = action.payload;
		},
		authSuccess(state) {
			state.fetching = false;
			state.isMoonPayUser = true;
		},
		authConfirmStart(state) {
			state.fetching = true;
			state.errors = [];
		},
		authConfirmFailed(state, action) {
			state.fetching = false;
			state.errors = action.payload;
		},
		authConfirmSuccess(state, action) {
			state.fetching = false;
			state.isAuthenticated = true;
		},
		getAllCurrenciesStart(state) {
			state.fetching = true;
			state.errors = [];
		},
		getAllCurrenciesFailed(state, action) {
			state.fetching = false;
			state.errors = action.payload;
		},
		getAllCurrenciesSuccess(state, action) {
			state.fetching = false;
			state.supported_fiat_currencies = action.payload
				.filter((curr) => curr.type === 'fiat')
				.map((curr) => curr.code.toUpperCase());
			state.supported_crypto_currencies = action.payload
				.filter((curr) => curr.type === 'crypto')
				.map((curr) => curr.code.toUpperCase());
		},
		getLimitsStart(state) {
			state.fetching = true;
			state.errors = [];
		},
		getLimitsFailed(state, action) {
			state.fetching = false;
			state.errors = action.payload;
		},
		getLimitsSuccess(state, action) {
			state.fetching = false;
			state.limits = action.payload.limits;
			state.verificationLevels = action.payload.verificationLevels;
		},
		getInfoStart(state) {
			state.fetching = true;
			state.errors = [];
		},
		getInfoFailed(state, action) {
			state.fetching = false;
			state.errors = action.payload;
		},
		getInfoSuccess(state, action) {
			state.fetching = false;
			state.isPhoneNumberVerified = action.payload.isPhoneNumberVerified;
			state.isAuthenticated = true;
			state.getInfo = action.payload;
		},
		getRateForCurrencyStart(state) {
			state.fetching = true;
			state.errors = [];
		},
		getRateForCurrencyFailed(state, action) {
			state.fetching = false;
			state.errors = action.payload;
		},
		getRateForCurrencySuccess(state, action) {
			state.fetching = false;
			state.rate = action.payload[state.fiatCurrencyISOName] || 0;
		},
		verifyPhoneStart(state) {
			state.fetching = true;
			state.errors = [];
		},
		verifyPhoneFailed(state, action) {
			state.fetching = false;
			state.errors = action.payload;
		},
		verifyPhoneSuccess(state) {
			state.fetching = false;
			state.needPhoneCodeConfirmation = true;
		},
		verifyPhoneConfirmStart(state) {
			state.fetching = true;
			state.errors = [];
		},
		verifyPhoneConfirmFailed(state, action) {
			state.fetching = false;
			state.errors = action.payload;
		},
		verifyPhoneConfirmSuccess(state) {
			state.fetching = false;
			state.needPhoneCodeConfirmation = false;
			state.isPhoneNumberVerified = true;
		},
		makePaymentStart(state) {
			state.fetchingPayment = true;
			state.errors = [];
		},
		makePaymentFailed(state, action) {
			state.fetchingPayment = false;
			state.errors = action.payload;
		},
		makePaymentSuccess(state, action) {
			state.fetchingPayment = false;
			state.paymentResponse = action.payload;
			state.paymentId = action.payload.id;
		},
		getPaymentStart(state) {
			state.fetchingPayment = true;
			state.errors = [];
		},
		getPaymentFailed(state, action) {
			state.fetchingPayment = false;
			state.errors = action.payload;
		},
		getPaymentSuccess(state, action) {
			state.fetchingPayment = false;
			state.paymentResponse = action.payload;
		},
		setFiatCurrency(state, action) {
			state.fiatCurrencyISOName = action.payload;
		},
		getPayUrlStart: (state) => {
			state.fetching = true;
			state.errors = [];
		},
		getPayUrlFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		getPayUrlSuccess: (state, action) => {
			state.fetching = false;
			state.payUrl = action.payload;
		},
	},
});

export const {
	authStart,
	authFailed,
	authSuccess,
	authConfirmStart,
	authConfirmFailed,
	authConfirmSuccess,
	getAllCurrenciesStart,
	getAllCurrenciesFailed,
	getAllCurrenciesSuccess,
	getLimitsStart,
	getLimitsFailed,
	getLimitsSuccess,
	getInfoStart,
	getInfoFailed,
	getInfoSuccess,
	getRateForCurrencyStart,
	getRateForCurrencyFailed,
	getRateForCurrencySuccess,
	verifyPhoneStart,
	verifyPhoneFailed,
	verifyPhoneSuccess,
	verifyPhoneConfirmStart,
	verifyPhoneConfirmFailed,
	verifyPhoneConfirmSuccess,
	makePaymentStart,
	makePaymentFailed,
	makePaymentSuccess,
	getPaymentStart,
	getPaymentFailed,
	getPaymentSuccess,
	setFiatCurrency,
	getPayUrlStart,
	getPayUrlFailed,
	getPayUrlSuccess,
} = moonpaySlice.actions;

export default moonpaySlice.reducer;

export const fetchAuthenticate = () => async (dispatch) => {
	try {
		dispatch(authStart());
		const { data } = await authenticate();
		if (data.errorCode) {
			return dispatch(authFailed(data.errors));
		}
		dispatch(authSuccess());
	} catch (err) {
		console.error(err);
	}
};

export const fetchAuthenticateConfirm = (code) => async (dispatch) => {
	try {
		dispatch(authConfirmStart());
		const { data } = await authenticationConfirm(code);
		if (data.errorCode) {
			return dispatch(authConfirmFailed(data.errors));
		}
		dispatch(authConfirmSuccess());
	} catch (err) {
		console.error(err);
	}
};

export const fetchGetAllCurrencies = () => async (dispatch) => {
	try {
		dispatch(getAllCurrenciesStart());
		const { data } = await getAllCurrencies();
		if (data.errorCode) {
			return dispatch(getAllCurrenciesFailed(data.errors));
		}
		const res = await JSON.parse(data.response);
		dispatch(getAllCurrenciesSuccess(res));
	} catch (err) {
		console.error(err);
	}
};

export const fetchGetLimits = () => async (dispatch) => {
	try {
		dispatch(getLimitsStart());
		const { data } = await getLimits();
		if (data.errorCode) {
			return dispatch(getLimitsFailed(data.errors));
		}
		dispatch(getLimitsSuccess(data.response));
	} catch (err) {
		console.error(err);
	}
};

export const fetchGetInfo = () => async (dispatch) => {
	try {
		dispatch(getInfoStart());
		const { data } = await getInfo();
		if (data.errorCode) {
			return dispatch(getInfoFailed(data.errors));
		}
		dispatch(getInfoSuccess(data.response));
	} catch (err) {
		console.error(err);
	}
};

export const fetchGetRateForCurrency = (currencyIsoName) => async (dispatch) => {
	try {
		dispatch(getRateForCurrencyStart());
		const { data } = await getRateForCurrency(currencyIsoName.toLowerCase());
		if (data.errorCode) {
			return dispatch(getRateForCurrencyFailed(data.errors));
		}
		const res = await JSON.parse(data.response);
		dispatch(getRateForCurrencySuccess(res));
	} catch (err) {
		console.error(err);
	}
};

export const fetchVerifyPhone = () => async (dispatch) => {
	try {
		dispatch(verifyPhoneStart());
		const { data } = await verifyPhone();
		if (data.errorCode) {
			return dispatch(verifyPhoneFailed(data.errors));
		}
		dispatch(verifyPhoneSuccess());
	} catch (err) {
		console.error(err);
	}
};

export const fetchVerifyPhoneConfirm = (code) => async (dispatch) => {
	try {
		dispatch(verifyPhoneConfirmStart());
		const { data } = await verifyPhoneConfirm(code);
		if (data.errorCode) {
			return dispatch(verifyPhoneConfirmFailed(data.errors));
		}
		dispatch(verifyPhoneConfirmSuccess());
	} catch (err) {
		console.error(err);
	}
};

export const fetchMakePayment = (query) => async (dispatch) => {
	try {
		dispatch(makePaymentStart());
		const { data } = await makePayment(query);
		if (!data.response) {
			return dispatch(makePaymentFailed(data.errors));
		}
		const res = await JSON.parse(data.response);
		dispatch(makePaymentSuccess(res));
	} catch (err) {
		console.error(err);
	}
};

export const fetchGetPayment = (id) => async (dispatch) => {
	try {
		dispatch(getPaymentStart());
		const { data } = await getPayment(id);
		if (data.errorCode) {
			return dispatch(getPaymentFailed(data.errors));
		}
		const res = await JSON.parse(data.response);
		dispatch(getPaymentSuccess(res));
	} catch (err) {
		console.error(err);
	}
};

export const fetchGetPayUrl = (accountId) => async (dispatch) => {
	try {
		dispatch(getPayUrlStart());
		const { data } = await getPayUrl(accountId);
		if (data.errorCode) {
			return dispatch(getPayUrlFailed(data.errors));
		}
		dispatch(getPayUrlSuccess(data.response));
	} catch (err) {
		console.error(err);
	}
};
