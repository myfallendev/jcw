import axiosWrapper from 'utils/axiosWrapper';
const apiPath = '/api/UserAccount';

export const transferByPhone = (receiverUserPhone, currencyId, amount, verificationCode, verificationType) => {
	return axiosWrapper(`${apiPath}/transferByPhone`, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			Accept: 'application/json;',
			'Content-Type': 'application/json-patch+json',
			VerificationCode: verificationCode ?? '',
			VerificationType: verificationType ?? '',
		},
		data: JSON.stringify({ receiverUserPhone, currencyId, amount }),
	});
};

export const getWalletEvents = () => axiosWrapper(`${apiPath}/GetTransactionsForUser?page=1&itemsPerPage=100`);
export const getAccounts = () => axiosWrapper(`${apiPath}?page=1&itemsPerPage=100`);
export const getCryptoAddress = (id) => axiosWrapper(`${apiPath}/getCryptoAddress?userAccountId=${id}`);
export const getAutoConversionPairs = () => axiosWrapper(`${apiPath}/getAutoConversions`);
export const setAutoConversionPair = (userAccountFromId, userAccountToId, enabled) =>
	axiosWrapper(`${apiPath}/setAutoConversion`, {
		method: 'POST',
		data: { userAccountFromId, userAccountToId, enabled },
	});
