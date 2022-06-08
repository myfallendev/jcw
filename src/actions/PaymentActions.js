import axiosWrapper from '../utils/axiosWrapper';

export const SET_FETCHING_TRADING_PAIRS = 'SET_FETCHING_TRADING_PAIRS';
export const SET_TRADING_PAIRS = 'SET_TRADING_PAIRS';

function processPaymentRequest() {
	return {
		type: 'PROCESS_PAYMENT_REQUEST',
	};
}

function processPaymentSuccess() {
	return {
		type: 'PROCESS_PAYMENT_SUCCESS',
	};
}

function processPaymentError() {
	return {
		type: 'PROCESS_PAYMENT_ERROR',
	};
}

export function processPayment(paymentData) {
	return (dispatch) => {
		dispatch(processPaymentRequest());
		return fetch(window.jcApi + '/api/Payment', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(paymentData),
		})
			.then((response) => response.json())
			.then((json) => {
				if (json.errorCode === 0) dispatch(processPaymentSuccess());
				else dispatch(processPaymentError());
			});
	};
}

export function closePaymentResult() {
	return {
		type: 'CLOSE_PAYMENT_RESULT',
	};
}

export function saveFieldsList(fieldsList) {
	return {
		type: 'SAVE_FIELDS_LIST',
		fieldsList: fieldsList,
	};
}

export function removeFieldsList() {
	return {
		type: 'REMOVE_FIELDS_LIST',
	};
}

export function getTradingPairs() {
	return (dispatch) => {
		dispatch({
			type: SET_FETCHING_TRADING_PAIRS,
			payload: true,
		});
		return axiosWrapper(`/api/Trading/Info`, { credentials: 'same-origin' })
			.then((response) => {
				if (response.data) {
					dispatch({
						type: SET_TRADING_PAIRS,
						payload: response.data,
					});
				}
			})
			.catch((e) => {
				console.error(e);
			});
	};
}
