import axiosWrapper from 'utils/axiosWrapper';
const api = '/api/Payment';

export const makePayment = (query) => {
	return axiosWrapper(api, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			Accept: 'application/json;',
			'Content-Type': 'application/json-patch+json',
			VerificationCode: query?.verificationCode ?? '',
			VerificationType: query?.verificationType ?? '',
		},
		data: JSON.stringify(query),
	});
};

export const getPaymentReceipt = (id) => axiosWrapper(`${api}/${id}`);
