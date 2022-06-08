const initialState = {
	showMoonPayForm: false,
	isMoonPayUser: false,
	isAuthenticated: false,
	supported_fiat_currencies: [],
	supported_crypto_currencies: [],
	limits: [],
	verificationLevels: [],
	getInfoSuccess: '',
	isPhoneNumberVerified: false,
	fiatCurrencyISOName: '',
	rate: 0,

	//paymentId: undefined,
	//orderId: null,
	//paymentSuccess: null,
	//fiatMoney: 0,
	//cryptoMoney: 0,
	//validUntil: null,
	//minAmountInUSD: 20,
	//maxAmountInUSD: 20000,

	fetching: false,
	fetchingPayment: false,
	errors: [],
};

export default function moonpay(state = initialState, action) {
	switch (action.type) {
		case 'CLOSE_BUY_WITH_CARD_POPUP':
			return { ...state, showMoonPayForm: false, errors: [] };
		case 'SHOW_MOONPAY_FORM':
			return { ...state, showMoonPayForm: true };
		case 'CLOSE_MOONPAY_FORM':
			return { ...state, showMoonPayForm: false, errors: [] };
		case 'REQUEST_AUTHENTICATION':
			return { ...state, fetching: true, errors: [] };
		case 'FAILED_AUTHENTICATION':
			return { ...state, fetching: false, errors: action.errors };
		case 'SUCCESS_AUTHENTICATION':
			return { ...state, fetching: false, isMoonPayUser: true, errors: [] };
		case 'REQUEST_AUTHENTICATION_CONFIRM':
			return { ...state, fetching: true, errors: [] };
		case 'FAILED_AUTHENTICATION_CONFIRM':
			return { ...state, fetching: false, errors: action.errors };
		case 'SUCCESS_AUTHENTICATION_CONFIRM':
			return { ...state, fetching: false, isAuthenticated: true, errors: [] };
		case 'FETCH_ALL_CURRENCIES':
			return { ...state, fetching: true };
		case 'FAILED_FETCH_ALL_CURRENCIES':
			return { ...state, fetching: false, errors: action.errors };
		case 'SUCCESS_FETCH_ALL_CURRENCIES':
			return {
				...state,
				fetching: false,
				supported_fiat_currencies: action.data
					.filter((curr) => curr.type === 'fiat')
					.map((curr) => curr.code.toUpperCase()),
				supported_crypto_currencies: action.data
					.filter((curr) => curr.type === 'crypto')
					.map((curr) => curr.code.toUpperCase()),
			};
		case 'GET_LIMITS_REQUEST':
			return { ...state, fetching: true };
		case 'GET_LIMITS_FAILED':
			return { ...state, fetching: false, errors: action.errors };
		case 'GET_LIMITS_SUCCESS':
			const { limits, verificationLevels } = action.data;
			return { ...state, fetching: false, limits, verificationLevels };
		case 'GET_INFO_REQUEST':
			return { ...state, fetching: true, errors: [] };
		case 'GET_INFO_FAILED':
			return {
				...state,
				fetching: false,
				getInfoSuccess: action.errors[0].value,
				errors: action.errors,
			};
		case 'GET_INFO_SUCCESS':
			return {
				...state,
				fetching: false,
				isAuthenticated: true,
				getInfoSuccess: 'Successful',
				isPhoneNumberVerified: action.data.isPhoneNumberVerified,
			};
		case 'REQUEST_PHONE_VERIFICATION':
			return { ...state, fetching: true };
		case 'FAILED_PHONE_VERIFICATION':
			return { ...state, fetching: false, errors: action.errors };
		case 'SUCCESS_PHONE_VERIFICATION':
			return { ...state, fetching: false, isPhoneNumberVerified: true, errors: [] };
		case 'REQUEST_RATE_FOR_CURRENCY':
			return { ...state, fetching: true };
		case 'FAILED_RATE_FOR_CURRENCY':
			return { ...state, fetching: false, errors: action.errors };
		case 'RECEIVE_RATE_FOR_CURRENCY':
			const rate = action.data[state.fiatCurrencyISOName] || 0;
			return { ...state, rate, errors: [], fetching: false };
		case 'SET_FIAT_CURRENCY':
			return { ...state, fiatCurrencyISOName: action.currency };
		case 'REQUEST_CREATE_MOONPAY_PAYMENT':
			return { ...state, fetchingPayment: true };
		case 'FAILED_CREATE_MOONPAY_PAYMENT':
			return { ...state, fetchingPayment: false, errors: action.errors };
		case 'RECEIVE_CREATE_MOONPAY_PAYMENT':
			return { ...state, fetchingPayment: false, ...action.payload, errors: [] };
		default:
			return state;
	}
}
