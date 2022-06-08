//Получения справочника валют
import axiosWrapper from '../utils/axiosWrapper';

function requestCurrencyCodes() {
	return {
		type: 'REQUEST_CURRENCY_CODES',
	};
}

function receiveCurrencyCodes(json) {
	return {
		type: 'RECEIVE_CURRENCY_CODES',
		currency_codes: json,
		currencyCodesFromApi: true,
	};
}

export function getCurrencyCodes() {
	return (dispatch) => {
		dispatch(requestCurrencyCodes());
		return axiosWrapper('/api/CurrencyCode?page=1&itemsPerPage=1000', { credentials: 'same-origin' })
			.then((response) => dispatch(receiveCurrencyCodes(response.data)))
			.catch((e) => {
				console.error(e);
			});
	};
}
