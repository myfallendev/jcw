import axiosWrapper from '../utils/axiosWrapper';

function receiveGetQuote(data) {
	return {
		type: 'RECEIVE_GET_QUOTE',
		payload: data,
	};
}

function receiveCreateSimplexPayment(data) {
	return {
		type: 'RECEIVE_CREATE_SIMPLEX_PAYMENT',
		payload: data,
	};
}

export function getQuote(userAccountId, fiatCurrencyId, requestedFiatCurrency, requestedAmount) {
	return (dispatch) => {
		dispatch({ type: 'REQUEST_GET_QUOTE' });
		return axiosWrapper('/api/Simplex/getQuote', {
			method: 'POST',
			credentials: 'same-origin',
			data: {
				userAccountId,
				fiatCurrencyId,
				requestedFiatCurrency,
				requestedAmount: +requestedAmount,
			},
		})
			.then((response) => {
				if (response.data.errorCode) {
					dispatch({
						type: 'FAILED_GET_QUOTE',
						payload: response.data.errors,
					});
					console.error(response.data.errors);
				} else if (response.data) {
					dispatch(receiveGetQuote(response.data.response));
				}
			})
			.catch((e) => {
				console.error(e);
			});
	};
}

export function createPayment(data) {
	return (dispatch) => {
		dispatch({ type: 'REQUEST_CREATE_SIMPLEX_PAYMENT' });
		return axiosWrapper('/api/Simplex/createPayment', {
			method: 'POST',
			credentials: 'same-origin',
			data,
		})
			.then((response) => {
				if (response.data.errorCode) {
					dispatch({
						type: 'FAILED_CREATE_SIMPLEX_PAYMENT',
						errors: response.data.errors,
					});

					console.error(response.data.errors);
				} else {
					dispatch(receiveCreateSimplexPayment(response.data.response));
				}
			})
			.catch((e) => {
				console.error(e);
			});
	};
}

export function showGetQuotesForm() {
	return {
		type: 'SHOW_GET_QUOTES_FORM',
	};
}

export function closeGetQuotesForm() {
	return {
		type: 'CLOSE_GET_QUOTES_FORM',
	};
}
