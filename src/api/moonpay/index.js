import axiosWrapper from 'utils/axiosWrapper';
const apiPath = '/api/MoonPay';
export const apiKey = 'pk_test_7dPVWruCY6ZLgAlrJMVrUlVzrRytsg';

export const authenticate = () => axiosWrapper(`${apiPath}/authenticate`);
export const authenticationConfirm = (securityCode) =>
	axiosWrapper(`${apiPath}/authenticate?securityCode=${securityCode}`);
export const getAllCurrencies = () => axiosWrapper(`${apiPath}/getAllCurrencies`);
export const getLimits = () => axiosWrapper(`${apiPath}/getLimits`);
export const getInfo = () => axiosWrapper(`${apiPath}/getInfo`);
export const getRateForCurrency = (currencyISOName) =>
	axiosWrapper(`${apiPath}/getRateForCurrency?currencyISOName=${currencyISOName}`);
export const verifyPhone = () => axiosWrapper(`${apiPath}/verifyPhone`);
export const verifyPhoneConfirm = (code) => axiosWrapper(`${apiPath}/verifyPhone?verificationCode=${code}`);
export const getPayUrl = (accountId) => axiosWrapper(`${apiPath}/getPayUrl?accountId=${accountId}`);
export const makePayment = (data) => {
	const {
		baseCurrencyCode,
		baseAmount,
		currencyCode,
		walletAddress,
		walletAddressTag,
		cardNumber,
		expiryDate,
		cvc,
	} = data;
	return axiosWrapper(`${apiPath}/makePayment`, {
		method: 'POST',
		credentials: 'same-origin',
		data: JSON.stringify({
			baseCurrencyCode,
			baseAmount,
			currencyCode,
			walletAddress,
			walletAddressTag,
			cardNumber,
			expiryDate,
			cvc,
		}),
	});
};

export const getPayment = (paymentId) =>
	axiosWrapper(`${apiPath}/getPayment?paymentId=${paymentId}`, { method: 'POST', credentials: 'same-origin' });
