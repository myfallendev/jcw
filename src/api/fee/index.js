import axiosWrapper from 'utils/axiosWrapper';

export const getFees = (currencyIds) =>
	axiosWrapper('/api/Fee', {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		data: {
			currencyIds,
		},
	});
