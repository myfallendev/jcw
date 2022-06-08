import axiosWrapper from '../utils/axiosWrapper';

export function getRateForCurrency(currencyISOName) {
	currencyISOName = currencyISOName.toLowerCase();
	return (dispatch) => {
		dispatch({ type: 'REQUEST_RATE_FOR_CURRENCY' });
		return axiosWrapper('/api/MoonPay/getRateForCurrency?currencyISOName=' + currencyISOName)
			.then(async ({ data }) => {
				if (data.errorCode) {
					dispatch({
						type: 'FAILED_RATE_FOR_CURRENCY',
						payload: data.errors,
					});
					console.error(data.errors);
				} else if (data.response) {
					const res = await JSON.parse(data.response);
					dispatch(receiveRateForCurrency(res));
				}
			})
			.catch((e) => {
				console.error(e);
			});
	};
}

function receiveRateForCurrency(data) {
	return {
		type: 'RECEIVE_RATE_FOR_CURRENCY',
		data,
	};
}


export function showMoonPayForm() {
	return {
		type: 'SHOW_MOONPAY_FORM',
	};
}

export function closeMoonPayForm() {
	return {
		type: 'CLOSE_MOONPAY_FORM',
	};
}

function authRequest() {
	return {
		type: 'REQUEST_AUTHENTICATION',
	};
}

export function authentication() {
	return (dispatch) => {
		dispatch(authRequest());
		return axiosWrapper('/api/MoonPay/authenticate')
			.then((response) => {
				if (response.data.errorCode === 0) {
					return dispatch(isAuthenticated());
				}
				dispatch(authFailed(response.data.errors));
			})
			.catch((e) => {
				console.error(e);
				//dispatch(authFailed(e));
			});
	};
}
export function authenticationConfirm(securityCode) {
	return async (dispatch) => {
		dispatch(authConfirmRequest());
		try {
			const response = await axiosWrapper('/api/MoonPay/authenticate?securityCode=' + securityCode);
			if (response.data.errorCode !== 0) {
				return dispatch(authConfirmFailed(response.data.errors));
			}
			dispatch(authConfirmSuccess());
		} catch (e) {
			//dispatch(showError500Msg());
			//dispatch(changePINConfirmComplete());
			//dispatch(authConfirmFailed(e));
		}
	};
}

function authFailed(errors) {
	return {
		type: 'FAILED_AUTHENTICATION',
		errors,
	};
}

function isAuthenticated() {
	return {
		type: 'SUCCESS_AUTHENTICATION',
	};
}

function authConfirmRequest() {
	return {
		type: 'REQUEST_AUTHENTICATION_CONFIRM',
	};
}

function authConfirmFailed(errors) {
	return {
		type: 'FAILED_AUTHENTICATION_CONFIRM',
		errors,
	};
}

function authConfirmSuccess() {
	return {
		type: 'SUCCESS_AUTHENTICATION_CONFIRM',
	};
}

export function getAllCurrencies() {
	return async (dispatch) => {
		dispatch(fetchAllCurrencies());
		try {
			const { data } = await axiosWrapper('/api/MoonPay/getAllCurrencies');
			if (data.errorCode !== 0) {
				return dispatch(failedFetchAllCurrencies(data.errors));
			}
			dispatch(successFetchAllCurrencies(JSON.parse(data.response)));
		} catch (err) {
			console.error(err);
			return dispatch(failedFetchAllCurrencies(err));
		}
	};
}

function fetchAllCurrencies() {
	return {
		type: 'FETCH_ALL_CURRENCIES',
	};
}

function failedFetchAllCurrencies(errors) {
	return {
		type: 'FAILED_FETCH_ALL_CURRENCIES',
		errors,
	};
}

function successFetchAllCurrencies(data) {
	return {
		type: 'SUCCESS_FETCH_ALL_CURRENCIES',
		data,
	};
}

export function getLimits() {
	return async (dispatch) => {
		dispatch(getLimitsRequest());
		try {
			const response = await axiosWrapper('/api/MoonPay/getLimits');
			if (response.data.errorCode !== 0) {
				return dispatch(getLimitsFailed(response.data.errors));
			}
			dispatch(getLimitsSuccess(response.data.response));
		} catch (e) {
		}
	};
}

function getLimitsRequest() {
	return {
		type: 'GET_LIMITS_REQUEST',
	};
}

function getLimitsFailed(errors) {
	return {
		type: 'GET_LIMITS_FAILED',
		errors,
	};
}

function getLimitsSuccess(data) {
	return {
		type: 'GET_LIMITS_SUCCESS',
		data,
	};
}

export function getInfo() {
	return async (dispatch) => {
		dispatch(getInfoRequest());
		try {
			const response = await axiosWrapper('/api/MoonPay/getInfo');
			if (response.data.errorCode !== 0) {
				return dispatch(getInfoFailed(response.data.errors));
			}
			dispatch(getInfoSuccess(response.data.response));
		} catch (e) {
		}
	};
}

function getInfoRequest() {
	return {
		type: 'GET_INFO_REQUEST',
	};
}

function getInfoFailed(errors) {
	return {
		type: 'GET_INFO_FAILED',
		errors,
	};
}

function getInfoSuccess(data) {
	return {
		type: 'GET_INFO_SUCCESS',
		data,
	};
}

export function setFiatCurrency(currency) {
	return {
		type: 'SET_FIAT_CURRENCY',
		currency,
	};
}
