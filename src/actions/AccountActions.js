import axiosWrapper from '../utils/axiosWrapper';
//import { getBalances } from '../actions/BalanceActions';
import _forEach from 'lodash/forEach';

export const REQUEST_ACCOUNTS = 'REQUEST_ACCOUNTS';
export const RECEIVE_ACCOUNTS = 'RECEIVE_ACCOUNTS';
export const RECEIVE_CRYPTO_ACCOUNT_ADDRESS = 'RECEIVE_CRYPTO_ACCOUNT_ADDRESS';
export const CHANGE_ACCOUNT_LIST_STATUS = 'CHANGE_ACCOUNT_LIST_STATUS';
export const CHANGE_CURRENT_ACCOUNT = 'CHANGE_CURRENT_ACCOUNT';
export const RESET_CURRENT_ACCOUNT = 'RESET_CURRENT_ACCOUNT';
export const TOGGLE_ACCOUNT_LIST = 'TOGGLE_ACCOUNT_LIST';

export const REQUEST_WITHDRAW_TO_WALLET = 'REQUEST_WITHDRAW_TO_WALLET';
export const COMPLETE_WITHDRAW_TO_WALLET = 'COMPLETE_WITHDRAW_TO_WALLET';
export const CLOSE_WITHDRAW_TO_WALLET_COMPLETE_POPUP = 'CLOSE_WITHDRAW_TO_WALLET_COMPLETE_POPUP';

export const FETCH_WITHDRAW_START = 'FETCH_WITHDRAW_START';
export const FETCH_WITHDRAW_COMPLETE = 'FETCH_WITHDRAW_COMPLETE';
export const WITHDRAW_TO_WALLET_CODE_REQUEST = 'WITHDRAW_TO_WALLET_CODE_REQUEST';
export const WITHDRAW_TO_WALLET_CODE_COMPLETE = 'WITHDRAW_TO_WALLET_CODE_COMPLETE';
export const WITHDRAW_TO_WALLET_CODE_RESET = 'WITHDRAW_TO_WALLET_CODE_RESET';
export const WITHDRAW_TO_WALLET_CODE_TRANSACTION_ID = 'WITHDRAW_TO_WALLET_CODE_TRANSACTION_ID';
export const SHOW_VERIFICATION_CODE_ERROR_MSG = 'SHOW_VERIFICATION_CODE_ERROR_MSG';
export const HIDE_VERIFICATION_CODE_ERROR_MSG = 'HIDE_VERIFICATION_CODE_ERROR_MSG';
export const TOGGLE_ZERO_BALANCES = 'TOGGLE_ZERO_BALANCES';
export const HIDE_WITHDRAW_FAILED_POPUP = 'HIDE_WITHDRAW_FAILED_POPUP';
export const SHOW_WITHDRAW_FAILED_POPUP = 'SHOW_WITHDRAW_FAILED_POPUP';
export const SHOW_VERIFICATION_CODE_ERROR500_MSG = 'SHOW_VERIFICATION_CODE_ERROR500_MSG';
export const HIDE_VERIFICATION_CODE_ERROR500_MSG = 'HIDE_VERIFICATION_CODE_ERROR500_MSG';
export const STOP_FETCHING = 'STOP_FETCHING';

export const REQUEST_MOONPAY_URL = 'REQUEST_MOONPAY_URL';
export const RECEIVED_MOONPAY_URL = 'RECEIVED_MOONPAY_URL';
export const FAILED_MOONPAY_URL = 'FAILED_MOONPAY_URL';

// function requestAccounts() {
// 	return {
// 		type: REQUEST_ACCOUNTS,
// 	};
// }

// function requestCryptoAddress() {
// 	return {
// 		type: 'REQUEST_CRYPTO_ADDRESS',
// 	};
// }

// function receiveAccounts(json) {
// 	const balances = Array.isArray(json) ? createBalances(json) : [];

// 	function createBalances(arr) {
// 		let result = {};

// 		arr.forEach((item) => {
// 			result['' + item.account.currency] = item.balance;
// 		});

// 		return result;
// 	}

// 	return {
// 		type: RECEIVE_ACCOUNTS,
// 		accounts: json,
// 		fetching: false,
// 		balances,
// 	};
// }

// export function getAccounts(callback) {
// 	return (dispatch) => {
// 		dispatch(requestAccounts());
// 		return axiosWrapper('/api/UserAccount?page=1&itemsPerPage=100', {
// 			credentials: 'same-origin',
// 		})
// 			.then(({ data }) => {
// 				dispatch(receiveAccounts(data));
// 				dispatch(getOperators());
// 				if (typeof callback === 'function') callback();
// 			})
// 			.catch((e) => {
// 				console.error(e);
// 			});
// 	};
// }

// function receiveCryptoAddress(json) {
// 	return {
// 		type: RECEIVE_CRYPTO_ACCOUNT_ADDRESS,
// 		payload: json,
// 	};
// }

// export function getCryptoAddress(accountId) {
// 	return (dispatch) => {
// 		dispatch(requestCryptoAddress());
// 		return axiosWrapper('/api/UserAccount/GetCryptoAddress?userAccountId=' + accountId, { credentials: 'same-origin' })
// 			.then((response) => {
// 				if (response.data.errorCode) {
// 					return dispatch({ type: 'FAILED_GET_CRYPTO_ADDRESS', payload: response.data });
// 				}
// 				dispatch(receiveCryptoAddress(response.data));
// 			})
// 			.catch((e) => {
// 				console.error(e);
// 			});
// 	};
// }

//CURRENCY RATES

// function requestCurrencyRates() {
// 	return {
// 		type: 'REQUEST_CURRENCY_RATES',
// 	};
// }

// function receiveCurrencyRates(json) {
// 	return {
// 		type: 'RECEIVE_CURRENCY_RATES',
// 		rates: json,
// 	};
// }

// export function getCurrencyRates(currencyId) {
// 	return (dispatch) => {
// 		dispatch(requestCurrencyRates());
// 		return axiosWrapper('/api/CurrencyRate?toCurrencyId=' + currencyId, {
// 			credentials: 'same-origin',
// 		})
// 			.then((response) => dispatch(receiveCurrencyRates(response.data)))
// 			.catch((e) => {
// 				console.error(e);
// 			});
// 	};
// }

function requestCurrencyRatePair() {
	return {
		type: 'REQUEST_CURRENCY_RATE_PAIR',
	};
}

function receiveCurrencyRatePair(json) {
	return {
		type: 'RECEIVE_CURRENCY_RATE_PAIR',
		ratePair: json,
	};
}

function receiveCurrencyRatePairError(json) {
	return {
		type: 'RECEIVE_CURRENCY_RATE_PAIR_ERROR',
		result: json,
	};
}

export function getCurrencyRatePair({ fromCurrencyId, toCurrencyId, sellRate, volume, callback }) {
	volume = volume || 0;

	const emptyResult = {
		fromCurrencyId,
		toCurrencyId,
		amount: 0, //calculated amount
		value: 0, //conversion rate
		percentageChange24H: 0,
		serverTime: new Date(),
		errorCode: 0,
	};

	return (dispatch) => {
		dispatch(requestCurrencyRatePair());

		if (!fromCurrencyId || !toCurrencyId) {
			callback(false, 'This pair is temporarily unavailable');
			return dispatch(receiveCurrencyRatePair(emptyResult));
		}

		const url =
			'/api/CurrencyRate/GetPairForTrading?fromCurrencyId=' +
			fromCurrencyId +
			'&toCurrencyId=' +
			toCurrencyId +
			'&sellRate=' +
			sellRate +
			'&volume=' +
			volume;

		const error_tooHigh = 'Requested volume is too high';
		const error_noTradingOrders = 'There are no trading orders for your request';
		const error_unavailable = 'This pair is temporarily unavailable';

		return axiosWrapper(url, {})
			.then((response) => {
				let data = response.data;
				if (data.errorCode === 1 && data.errors[0].code) {
					switch (data.errors[0].code) {
						case 2:
							callback(false, error_noTradingOrders);
							return dispatch(receiveCurrencyRatePair(emptyResult));
						case 107:
							return dispatch(receiveCurrencyRatePair(emptyResult));
						case 109:
							callback(false, data.errors[0].code === 'QueryRate' ? error_tooHigh : error_noTradingOrders);
							return dispatch(receiveCurrencyRatePair(emptyResult));
						default:
							callback(false, error_unavailable);
							return dispatch(receiveCurrencyRatePair(emptyResult));
					}
				}

				if (data.errorCode === 1) return dispatch(receiveCurrencyRatePairError(data));

				data.baseCurrency = data.toCurrencyId;

				return dispatch(receiveCurrencyRatePair(data));
			})
			.catch((e) => {
				console.error(e);
			});
	};
}

// function requestFiatPairCurrencyRate() {
// 	return {
// 		type: 'REQUEST_FIAT_PAIR_CURRENCY_RATE',
// 	};
// }

// function receiveFiatPairCurrencyRate(json) {
// 	return {
// 		type: 'RECEIVE_FIAT_PAIR_CURRENCY_RATE',
// 		rate: json,
// 	};
// }

// export function getFiatPairCurrencyRate(fromCurrencyId, toCurrencyId) {
// 	return (dispatch) => {
// 		dispatch(requestFiatPairCurrencyRate());
// 		return axiosWrapper(
// 			'/api/CurrencyRate/getFiatPair/?fromCurrencyId=' + fromCurrencyId + '&toCurrencyId=' + toCurrencyId,
// 			{ credentials: 'same-origin' }
// 		)
// 			.then((response) => dispatch(receiveFiatPairCurrencyRate(response.data)))
// 			.catch((e) => {
// 				console.error(e);
// 			});
// 	};
// }

export function changeAccountListStatus(accountListOpened) {
	return {
		type: CHANGE_ACCOUNT_LIST_STATUS,
		accountListOpened: accountListOpened,
	};
}

export function changeCurrentAccount(account) {
	return {
		type: CHANGE_CURRENT_ACCOUNT,
		account: account,
	};
}

export function resetCurrentAccount() {
	return {
		type: RESET_CURRENT_ACCOUNT,
	};
}

export function toggleAccountList() {
	return {
		type: TOGGLE_ACCOUNT_LIST,
	};
}

export function changeSenderAccountListStatus(senderAccountListOpened) {
	return {
		type: 'CHANGE_SENDER_ACCOUNT_LIST_STATUS',
		senderAccountListOpened: senderAccountListOpened,
	};
}

export function changeSenderAccount(account) {
	if (account === undefined) account = {};
	return {
		type: 'CHANGE_SENDER_ACCOUNT',
		account: account,
	};
}

export function changeReceiverAccountListStatus(receiverAccountListOpened) {
	return {
		type: 'CHANGE_RECEIVER_ACCOUNT_LIST_STATUS',
		receiverAccountListOpened: receiverAccountListOpened,
	};
}

export function changeReceiverAccount(account) {
	if (account === undefined) account = {};
	return {
		type: 'CHANGE_RECEIVER_ACCOUNT',
		account: account,
	};
}

export function resetAccounts() {
	return {
		type: 'RESET_ACCOUNTS',
	};
}

function requestAccountPayment() {
	return {
		type: 'REQUEST_ACCOUNT_PAYMENT',
	};
}

function completeAccountPayment() {
	return {
		type: 'COMPLETE_ACCOUNT_PAYMENT',
	};
}

function accountPaymentError(json) {
	return {
		type: 'ACCOUNT_PAYMENT_ERROR',
		result: json,
	};
}

export function accountPaymentRequest(senderAcc, receiverAcc, volumeFrom, rate, callback) {
	return (dispatch) => {
		dispatch(requestAccountPayment());
		const url =
			'/api/UserAccount/accountToAccountConvert?senderAccountId=' +
			senderAcc +
			'&receiverAccountId=' +
			receiverAcc +
			'&volumeFrom=' +
			volumeFrom +
			'&rate=' +
			rate;

		return axiosWrapper(url, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.data)
			.then((response) => {
				if (!response.errorCode) dispatch(completeAccountPayment());
				else callback(false, response.errors[0].value);
				dispatch(accountPaymentError(response));
			})
			.catch((e) => {
				console.error(e);
			});
	};
}

export function closeConfirmationPopup() {
	return {
		type: 'CLOSE_CONFIRMATION_POPUP',
	};
}

// function requestWalletEvents() {
// 	return {
// 		type: 'REQUEST_WALLET_EVENTS',
// 	};
// }

// function receiveWalletEvents(json) {
// 	return {
// 		events: json,
// 		type: 'RECEIVE_WALLET_EVENTS',
// 	};
// }

// export function getWalletEvents() {
// 	return (dispatch) => {
// 		dispatch(requestWalletEvents());
// 		return axiosWrapper('/api/UserAccount/GetTransactionsForUser?page=1&itemsPerPage=100', {
// 			method: 'GET',
// 		})
// 			.then(({ data }) => {
// 				dispatch(receiveWalletEvents(data));
// 			})
// 			.catch((e) => {
// 				//dispatch(receiveWalletEvents([]));
// 				console.error(e);
// 			});
// 	};
// }

// export function openWalletWithdrawPopup(account, cryptoCurrencyName = '', userCurrencyName = '', rate = 0) {
// 	return {
// 		type: 'OPEN_WALLET_TRANSFERS_POPUP',
// 		transferIsWithdraw: true,
// 		account,
// 		cryptoCurrencyName,
// 		userCurrencyName,
// 		rate,
// 	};
// }

// function requestWithdrawToWallet() {
// 	return {
// 		type: 'REQUEST_WITHDRAW_TO_WALLET',
// 	};
// }

// function completeWithdrawToWallet(response) {
// 	return {
// 		type: 'COMPLETE_WITHDRAW_TO_WALLET',
// 		response: response,
// 	};
// }

// export function closeWithdrawToWalletCompletePopup() {
// 	return {
// 		type: 'CLOSE_WITHDRAW_TO_WALLET_COMPLETE_POPUP',
// 	};
// }

// export function withdrawToWallet(query) {
// 	return (dispatch) => {
// 		dispatch(requestWithdrawToWallet());
// 		dispatch({ type: FETCH_WITHDRAW_START });
// 		axiosWrapper('/api/Payment', {
// 			method: 'POST',
// 			credentials: 'same-origin',
// 			headers: {
// 				Accept: 'application/json;',
// 				'Content-Type': 'application/json-patch+json',
// 			},
// 			data: JSON.stringify(query),
// 		})
// 			.then((response) => {
// 				if (response.data.errorCode === 2) {
// 					dispatch({
// 						type: WITHDRAW_TO_WALLET_CODE_REQUEST,
// 						WithdrawToWalletCodeRequestType: response.data.verificationType,
// 					});
// 					dispatch({ type: FETCH_WITHDRAW_COMPLETE });
// 				}
// 			})
// 			.catch((e) => {
// 				dispatch({ type: FETCH_WITHDRAW_COMPLETE });
// 				console.error(e);
// 			});
// 	};
// }

// export function withdrawToWalletCommit(query) {
// 	return (dispatch) => {
// 		dispatch(requestWithdrawToWallet());
// 		dispatch({ type: FETCH_WITHDRAW_START });
// 		axiosWrapper('/api/Payment', {
// 			method: 'POST',
// 			credentials: 'same-origin',
// 			headers: {
// 				Accept: 'application/json;',
// 				'Content-Type': 'application/json-patch+json',
// 				VerificationCode: query.verificationCode,
// 				VerificationType: query.verificationType,
// 			},
// 			data: JSON.stringify(query),
// 		})
// 			.then((response) => {
// 				switch (response.data.errorCode) {
// 					case 1: {
// 						// NotSuccessful
// 						dispatch({ type: SHOW_WITHDRAW_FAILED_POPUP });
// 						break;
// 					}
// 					case 2: {
// 						// Need verification
// 						dispatch({
// 							type: WITHDRAW_TO_WALLET_CODE_REQUEST,
// 							WithdrawToWalletCodeRequestType: response.data.verificationType,
// 						});
// 						break;
// 					}
// 					case 3: {
// 						// Wrong verification code
// 						dispatch({
// 							type: SHOW_VERIFICATION_CODE_ERROR_MSG,
// 						});
// 						break;
// 					}
// 					default: {
// 						dispatch(completeWithdrawToWallet(response.data));
// 						setTimeout(() => {
// 							dispatch(getBalances());
// 							//dispatch(getAccounts());
// 							//dispatch(getWalletEvents());
// 						}, 1000);
// 					}
// 				}
// 				dispatch({ type: FETCH_WITHDRAW_COMPLETE });
// 			})
// 			.catch((e) => {
// 				dispatch({ type: SHOW_VERIFICATION_CODE_ERROR500_MSG });
// 				dispatch({ type: FETCH_WITHDRAW_COMPLETE });
// 				console.error(e);
// 			});
// 	};
// }

// export function toggleZeroBalances(val) {
// 	return {
// 		type: 'TOGGLE_ZERO_BALANCES',
// 		val: val,
// 	};
// }

// export function withdrawToWalletCodeReset() {
// 	return (dispatch) => {
// 		dispatch({ type: WITHDRAW_TO_WALLET_CODE_RESET });
// 	};
// }

// export function hideVerificationCodeErrorMsg() {
// 	return (dispatch) => {
// 		dispatch({ type: HIDE_VERIFICATION_CODE_ERROR_MSG });
// 	};
// }

// export function hideVerificationCodeError500Msg() {
// 	return (dispatch) => {
// 		dispatch({ type: HIDE_VERIFICATION_CODE_ERROR500_MSG });
// 	};
// }

// export function hideWithdrawFailedPopup() {
// 	return (dispatch) => {
// 		dispatch({ type: HIDE_WITHDRAW_FAILED_POPUP });
// 	};
// }

export function sendNotify(userId, subject, content) {
	return (dispatch) => {
		userId = userId !== '' ? userId : '';

		content = content.replace(/"/g, '\\"');
		console.log(content);
		let query = {
			userId: userId,
			message: `${content}`,
			subject: subject,
		};
		console.log(query);
		axiosWrapper('/api/Admin/User/notify', {
			method: 'POST',
			data: query,
		})
			.then((response) => {
				console.log('Notify response', response);
			})
			.catch((e) => {
				console.error(e);
			});
	};
}

// export function getOperators(callback) {
// 	return (dispatch) => {
// 		dispatch({ type: 'REQUEST_OPERATORS' });
// 		return axiosWrapper('/api/Operator?page=1&itemsPerPage=100', {
// 			credentials: 'same-origin',
// 		})
// 			.then((response) => {
// 				dispatch({
// 					type: 'SUCCESS_OPERATORS',
// 					payload: response.data,
// 				});
// 				if (callback) callback();
// 			})
// 			.catch((e) => {
// 				console.error(e);
// 			});
// 	};
// }

// export const GET_FEE = 'GET_FEE';

// export function getFee() {
// 	return (dispatch, getState) => {
// 		dispatch(setFeeFetching(true));
// 		//dispatch(getOperators());
// 		let state = getState();
// 		let currencyIds = [];
// 		_forEach(state.accounts.operators, (item) => {
// 			if (item.currencyId !== null) currencyIds.push(item.currencyId);
// 		});
// 		return axiosWrapper('/api/Fee', {
// 			method: 'POST',
// 			credentials: 'same-origin',
// 			headers: {
// 				Accept: 'application/json',
// 				'Content-Type': 'application/json',
// 			},
// 			data: {
// 				currencyIds,
// 			},
// 		})
// 			.then((response) => {
// 				dispatch({
// 					type: GET_FEE,
// 					payload: response.data,
// 				});
// 				dispatch(setFeeFetching(false));
// 			})
// 			.catch((e) => {
// 				dispatch(setFeeFetching(false));
// 				console.error(e);
// 			});
// 	};
// }

// export const SET_FEE_FETCHING = 'SET_FEE_FETCHING';

// export function setFeeFetching(value) {
// 	return {
// 		type: 'SET_FEE_FETCHING',
// 		payload: value,
// 	};
// }

// export const SET_TRADING_PAIRS = 'SET_TRADING_PAIRS';

// export function getTradingPairs() {
// 	return (dispatch) => {
// 		return axiosWrapper('/api/Trading/Info', {
// 			credentials: 'same-origin',
// 		})
// 			.then((response) => {
// 				if (response.data) {
// 					dispatch({
// 						type: 'SET_TRADING_PAIRS',
// 						payload: response.data,
// 					});
// 				}
// 			})
// 			.catch((e) => {
// 				console.error(e);
// 			});
// 	};
// }

// export const GET_AUTOCONVERSION_PAIRS = 'GET_AUTOCONVERSION_PAIRS';

// export function getAutoConversionPairs() {
// 	return (dispatch, setState) => {
// 		return axiosWrapper('/api/UserAccount/getAutoConversions', {
// 			credentials: 'same-origin',
// 		})
// 			.then((response) => {
// 				if (response.data) {
// 					dispatch({
// 						type: 'GET_AUTOCONVERSION_PAIRS',
// 						payload: response.data,
// 					});
// 				}
// 			})
// 			.catch((e) => {
// 				console.error(e);
// 			});
// 	};
// }

// export function setAutoConversionPair(userAccountFromId, userAccountToId, enabled) {
// 	return (dispatch) => {
// 		return axiosWrapper(
// 			`/api/UserAccount/setAutoConversion?userAccountFromId=${userAccountFromId}&userAccountToId=${userAccountToId}&enabled=${enabled}`,
// 			{
// 				method: 'POST',
// 				credentials: 'same-origin',
// 				headers: {
// 					Accept: 'application/json',
// 					'Content-Type': 'application/json',
// 				},
// 				data: {
// 					userAccountFromId,
// 					userAccountToId,
// 					enabled,
// 				},
// 			}
// 		)
// 			.then((response) => {
// 				if (response.data) dispatch(getAutoConversionPairs());
// 			})
// 			.catch((e) => {
// 				console.error(e);
// 			});
// 	};
// }

// export const getMoonpayUrl = (accountId) => async (dispatch) => {
// 	dispatch({ type: REQUEST_MOONPAY_URL });
// 	try {
// 		const res = await axiosWrapper(`/api/MoonPay/getPayUrl?accountId=${accountId}`);
// 		const url = res.data.response;
// 		dispatch({ type: RECEIVED_MOONPAY_URL, data: url });
// 		return url;
// 	} catch (e) {
// 		dispatch({ type: FAILED_MOONPAY_URL, data: e.response.errorString });
// 		console.error(e);
// 	}
// };

// export const transferByPhone = (receiverUserPhone, currencyId, amount) => async (dispatch) => {
// 	dispatch({ type: 'REQUEST_TRANSFER_BY_PHONE' });
// 	try {
// 		const { data } = await axiosWrapper('/api/UserAccount/transferByPhone', {
// 			method: 'POST',
// 			credentials: 'same-origin',
// 			headers: {
// 				Accept: 'application/json',
// 				'Content-Type': 'application/json',
// 			},
// 			data: JSON.stringify({ receiverUserPhone, currencyId, amount }),
// 		});
// 		if (data.errorCode === 2) {
// 			dispatch({
// 				type: 'TRANSFER_BY_PHONE_CODE_REQUEST',
// 				transferByPhoneVerificationType: data.verificationType,
// 			});
// 		}
// 	} catch (err) {
// 		dispatch({ type: 'FAILED_TRANSFER_BY_PHONE', errors: err });
// 		console.error(err);
// 	}
// };

// export const transferByPhoneCommit = (receiverUserPhone, currencyId, amount, verificationCode, verificationType) => (
// 	dispatch
// ) => {
// 	dispatch({ type: 'REQUEST_TRANSFER_BY_PHONE_COMMIT' });
// 	axiosWrapper('/api/UserAccount/transferByPhone', {
// 		method: 'POST',
// 		credentials: 'same-origin',
// 		headers: {
// 			Accept: 'application/json;',
// 			'Content-Type': 'application/json-patch+json',
// 			VerificationCode: verificationCode,
// 			VerificationType: verificationType,
// 		},
// 		data: JSON.stringify({ receiverUserPhone, currencyId, amount }),
// 	})
// 		.then((response) => {
// 			switch (response.data.errorCode) {
// 				case 1: {
// 					// NotSuccessful
// 					dispatch({ type: 'SHOW_TRANSFER_BY_PHONE_FAILED_POPUP' });
// 					break;
// 				}
// 				case 2: {
// 					// Need verification
// 					dispatch({
// 						type: 'TRANSFER_BY_PHONE_CODE_REQUEST',
// 						transferByPhoneVerificationType: response.data.verificationType,
// 					});
// 					break;
// 				}
// 				case 3: {
// 					// Wrong verification code
// 					dispatch({
// 						type: SHOW_VERIFICATION_CODE_ERROR_MSG,
// 					});
// 					break;
// 				}
// 				default: {
// 					dispatch({ type: 'SUCCESS_TRANSFER_BY_PHONE_COMMIT', response: response.data });
// 				}
// 			}
// 		})
// 		.catch((e) => {
// 			dispatch({ type: SHOW_VERIFICATION_CODE_ERROR500_MSG });
// 			console.error(e);
// 		});
// };

// export const hideTransferByPhoneFailedPopup = () => (dispatch) =>
// 	dispatch({ type: 'HIDE_TRANSFER_BY_PHONE_FAILED_POPUP' });

// export const transferByPhoneCodeReset = () => (dispatch) => dispatch({ type: 'TRANSFER_BY_PHONE_CODE_RESET' });
