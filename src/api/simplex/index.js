import axiosWrapper from 'utils/axiosWrapper';
const apiPath = '/api/Simplex';

export const getQuote = (userAccountId, fiatCurrencyId, requestedFiatCurrency, requestedAmount) => {
	return axiosWrapper(`${apiPath}/getQuote`, {
		method: 'POST',
		credentials: 'same-origin',
		data: {
			userAccountId,
			fiatCurrencyId,
			requestedFiatCurrency,
			requestedAmount: +requestedAmount,
		},
	});
};

export const createPayment = (data) => {
	return axiosWrapper(`${apiPath}/createPayment`, {
		method: 'POST',
		credentials: 'same-origin',
		data,
	});
};
