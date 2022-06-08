import { fetchCurrencyRatesForFiatCurrency } from 'features/currencyRatesSlice';

import _filter from 'lodash/filter';
import axiosWrapper from '../utils/axiosWrapper';
//import moment from 'moment';
import createContainerFromServerErrorsArray from '../utils/createContainerFromServerErrorsArray';

export const GET_USER_INFO_REQUEST = 'REQUEST_GET_USER_INFO';
export const GET_USER_INFO_SUCCESS = 'SUCCESS_GET_USER_INFO';

export const OPEN_CHANGE_PASSWORD_POPUP = 'OPEN_CHANGE_PASSWORD_POPUP';
export const CLOSE_CHANGE_PASSWORD_POPUP = 'CLOSE_CHANGE_PASSWORD_POPUP';
export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_ERROR = 'CHANGE_PASSWORD_ERROR';
export const CLEAR_CHANGE_PASSWORD_ERRORS = 'CLEAR_CHANGE_PASSWORD_ERRORS';
export const CHANGE_PASSWORD_LOADER_HIDE = 'CHANGE_PASSWORD_LOADER_HIDE';
export const CHANGE_PASSWORD_SERVER_ERROR = 'CHANGE_PASSWORD_SERVER_ERROR';

export const OPEN_COUNTRY_CODE_POPUP = 'OPEN_COUNTRY_CODE_POPUP';
export const CLOSE_COUNTRY_CODE_POPUP = 'CLOSE_COUNTRY_CODE_POPUP';
export const SET_USER_PHONE_AND_COUNTRY_CODES = 'SET_USER_PHONE_AND_COUNTRY_CODES';
export const SET_COUNTRY_CODES = 'SET_COUNTRY_CODES';
export const SET_USER_PHONE_NUMBER = 'SET_USER_PHONE_NUMBER';

export const OPEN_CHANGE_PHONE_POPUP = 'OPEN_CHANGE_PHONE_POPUP';
export const CLOSE_CHANGE_PHONE_POPUP = 'CLOSE_CHANGE_PHONE_POPUP';
export const CHANGE_PHONE_REQUEST = 'CHANGE_PHONE_REQUEST';
export const CONFIRMATION_CODE_SEND = 'CONFIRMATION_CODE_SEND';
export const CHANGE_PHONE_SUCCESS = 'CHANGE_PHONE_SUCCESS';
export const CHANGE_PHONE_ERROR = 'CHANGE_PHONE_ERROR';
export const CLEAR_CHANGE_PHONE_ERRORS = 'CLEAR_CHANGE_PHONE_ERRORS';

const CHANGE_PIN_REQUEST = 'CHANGE_PIN_REQUEST';
const CHANGE_PIN_REQUEST_COMPLETE = 'CHANGE_PIN_REQUEST_COMPLETE';
const CHANGE_PIN_CONFIRM_REQUEST = 'CHANGE_PIN_CONFIRM_REQUEST';
const CHANGE_PIN_CONFIRM_REQUEST_COMPLETE = 'CHANGE_PIN_CONFIRM_REQUEST_COMPLETE';
const SHOW_CHANGE_PIN_IS_WRONG_MSG = 'SHOW_CHANGE_PIN_IS_WRONG_MSG';
const HIDE_CHANGE_PIN_IS_WRONG_MSG = 'HIDE_CHANGE_PIN_IS_WRONG_MSG';
const SHOW_CHANGE_PIN_FAILED_POPUP = 'SHOW_CHANGE_PIN_FAILED_POPUP';
const HIDE_CHANGE_PIN_FAILED_POPUP = 'HIDE_CHANGE_PIN_FAILED_POPUP';
const CHANGE_PIN_SUCCESS = 'CHANGE_PIN_SUCCESS';
const CHANGE_PIN_VERIFICATION_TYPE = 'CHANGE_PIN_VERIFICATION_TYPE';
const SHOW_ERROR500_MSG = 'SHOW_ERROR500_MSG';
const HIDE_ERROR500_MSG = 'HIDE_ERROR500_MSG';
const CHANGE_PIN_STATUS_RESET = 'CHANGE_PIN_STATUS_RESET';

export const OPEN_CHANGE_LOGIN_POPUP = 'OPEN_CHANGE_LOGIN_POPUP';
export const CLOSE_CHANGE_LOGIN_POPUP = 'CLOSE_CHANGE_LOGIN_POPUP';
export const CHANGE_LOGIN_REQUEST = 'CHANGE_LOGIN_REQUEST';
export const CHANGE_LOGIN_SUCCESS = 'CHANGE_LOGIN_SUCCESS';
export const CHANGE_LOGIN_ERROR = 'CHANGE_LOGIN_ERROR';
export const CLEAR_CHANGE_LOGIN_ERRORS = 'CLEAR_CHANGE_LOGIN_ERRORS';

export const OPEN_CHANGE_EMAIL_POPUP = 'OPEN_CHANGE_EMAIL_POPUP';
export const CLOSE_CHANGE_EMAIL_POPUP = 'CLOSE_CHANGE_EMAIL_POPUP';
export const CHANGE_EMAIL_REQUEST = 'CHANGE_EMAIL_REQUEST';
export const CHANGE_EMAIL_SUCCESS = 'CHANGE_EMAIL_SUCCESS';
export const CHANGE_EMAIL_ERROR = 'CHANGE_EMAIL_ERROR';
export const CLEAR_CHANGE_EMAIL_ERRORS = 'CLEAR_CHANGE_EMAIL_ERRORS';

export const OPEN_CHANGE_GEOLOCATION_POPUP = 'OPEN_CHANGE_GEOLOCATION_POPUP';
export const CHANGE_GEOLOCATION_REQUEST = 'CHANGE_GEOLOCATION_REQUEST';
export const CHANGE_GEOLOCATION_SUCCESS = 'CHANGE_GEOLOCATION_SUCCESS';
export const CHANGE_GEOLOCATION_ERROR = 'CHANGE_GEOLOCATION_ERROR';
export const CLOSE_CHANGE_GEOLOCATION_POPUP = 'CLOSE_CHANGE_GEOLOCATION_POPUP';

export const OPEN_CHANGE_FULL_NAME_POPUP = 'OPEN_CHANGE_FULL_NAME_POPUP';
export const CLOSE_CHANGE_FULL_NAME_POPUP = 'CLOSE_CHANGE_FULL_NAME_POPUP';
export const CHANGE_FULL_NAME_REQUEST = 'CHANGE_FULL_NAME_REQUEST';
export const CHANGE_FULL_NAME_SUCCESS = 'CHANGE_FULL_NAME_SUCCESS';
export const CHANGE_FULL_NAME_ERROR = 'CHANGE_FULL_NAME_ERROR';

export const SWITCH_SUBSCRIPTION = 'SWITCH_SUBSCRIPTION';
export const CHANGE_SUBSCRIPTIONS = 'CHANGE_SUBSCRIPTIONS';
export const CLOSE_SUBSCRIPTIONS_POPUP = 'CLOSE_SUBSCRIPTIONS_POPUP';

export const UPLOAD_AVATAR_REQUEST = 'UPLOAD_AVATAR_REQUEST';
export const UPLOAD_AVATAR_SUCCESS = 'UPLOAD_AVATAR_SUCCESS';
export const UPLOAD_AVATAR_ERROR = 'UPLOAD_AVATAR_ERROR';

export const SET_TERMS_AGREED = 'SET_TERMS_AGREED';
export const SET_TERMS_DISAGREED = 'SET_TERMS_AGREED';

export const CHANGE_USER_CURRENCY = 'CHANGE_USER_CURRENCY';

export const CHANGE_LOGIN_TYPE = 'CHANGE_LOGIN_TYPE';
export const CHECK_GOOGLE_AUTH_EXIST = 'CHECK_GOOGLE_AUTH_EXIST';
export const SET_GOOGLE_AUTH_REQUEST_RESPONSE = 'SET_GOOGLE_AUTH_REQUEST_RESPONSE';
export const SET_GOOGLE_AUTH_CONFIRM_ERROR = 'SET_GOOGLE_AUTH_CONFIRM_ERROR';
export const GOOGLE_AUTH_RESET_FORM = 'GOOGLE_AUTH_RESET_FORM';
export const GOOGLE_AUTH_RESET_FORM_ERROR = 'GOOGLE_AUTH_RESET_FORM_ERROR';
export const OPEN_GOOGLE_AUTH_COMPLETE_POPUP = 'OPEN_GOOGLE_AUTH_COMPLETE_POPUP';
export const OPEN_GOOGLE_AUTH_RESET_POPUP = 'OPEN_GOOGLE_AUTH_RESET_POPUP';
export const CLOSE_GOOGLE_AUTH_POPUPS = 'CLOSE_GOOGLE_AUTH_POPUPS';
export const FETCH_GOOGLE_AUTH = 'FETCH_GOOGLE_AUTH';
export const SET_GOOGLE_AUTH_SERVER_ERROR = 'SET_GOOGLE_AUTH_SERVER_ERROR';

export const FETCH_NOTIFICATION_SETTINGS = 'FETCH_NOTIFICATION_SETTINGS';
export const SET_NOTIFICATION_SETTINGS = 'SET_NOTIFICATION_SETTINGS';
export const SET_NOTIFICATION_SETTING_SYSTEM_EVENTS = 'SET_NOTIFICATION_SETTING_SYSTEM_EVENTS';
export const SET_NOTIFICATION_SETTING_WITHDRAWALS = 'SET_NOTIFICATION_SETTING_WITHDRAWALS';
export const SHOW_NOTIFICATION_ERROR_POPUP = 'SHOW_NOTIFICATION_ERROR_POPUP';

// function getUserInfoRequest() {
// 	return {
// 		type: GET_USER_INFO_REQUEST,
// 	};
// }

// function getUserInfoSuccess(json) {
// 	return {
// 		type: GET_USER_INFO_SUCCESS,
// 		userInfo: json,
// 	};
// }

// export function getUserInfo() {
// 	return (dispatch) => {
// 		dispatch(getUserInfoRequest());
// 		return axiosWrapper('/api/User/getInfo', {
// 			method: 'POST',
// 			credentials: 'same-origin',
// 		})
// 			.then((response) => {
// 				dispatch(getUserInfoSuccess(response.data));
// 			})
// 			.catch((e) => {
// 				console.error(e);
// 			});
// 	};
// }

// export function openChangePasswordPopup() {
// 	return {
// 		type: OPEN_CHANGE_PASSWORD_POPUP,
// 	};
// }

// export function closeChangePasswordPopup() {
// 	return {
// 		type: CLOSE_CHANGE_PASSWORD_POPUP,
// 	};
// }

// function changePasswordRequest() {
// 	return {
// 		type: CHANGE_PASSWORD_REQUEST,
// 	};
// }

// function changePasswordSuccess(json) {
// 	return {
// 		type: CHANGE_PASSWORD_SUCCESS,
// 		changePasswordStatus: json,
// 	};
// }

// function changePasswordError(json) {
// 	const errors = createContainerFromServerErrorsArray(json.errors);

// 	return {
// 		type: CHANGE_PASSWORD_ERROR,
// 		changePasswordStatus: { ...json, errors },
// 	};
// }

// export function changePassword(oldPsw, newPswFirst, newPswSecond) {
// 	return (dispatch) => {
// 		dispatch(changePasswordRequest());
// 		return axiosWrapper('/api/User/changePassword', {
// 			method: 'POST',
// 			credentials: 'same-origin',
// 			headers: {
// 				Accept: 'application/json;',
// 				'Content-Type': 'application/json-patch+json; charset=utf-8',
// 			},
// 			data: JSON.stringify({ OldPassword: oldPsw, Password: newPswFirst, PasswordConfirm: newPswSecond }),
// 		})
// 			.then((response) => {
// 				if (response.data.errorCode !== 0) {
// 					dispatch(changePasswordError(response.data));
// 				} else {
// 					dispatch(changePasswordSuccess(response.data));
// 				}
// 			})
// 			.catch((e) => {
// 				dispatch({ type: CHANGE_PASSWORD_LOADER_HIDE });
// 				dispatch({ type: CHANGE_PASSWORD_SERVER_ERROR, value: true });
// 				console.error(e);
// 			});
// 	};
// }

// export function clearChangePasswordErrors() {
// 	return {
// 		type: CLEAR_CHANGE_PASSWORD_ERRORS,
// 	};
// }

// export function openCountryCodePopup() {
// 	return {
// 		type: OPEN_COUNTRY_CODE_POPUP,
// 	};
// }

// export function closeCountryCodePopup() {
// 	return {
// 		type: CLOSE_COUNTRY_CODE_POPUP,
// 	};
// }

export function openChangePhonePopup() {
	return {
		type: OPEN_CHANGE_PHONE_POPUP,
	};
}

export function closeChangePhonePopup() {
	return {
		type: CLOSE_CHANGE_PHONE_POPUP,
	};
}

function changePhoneRequest() {
	return {
		type: CHANGE_PHONE_REQUEST,
	};
}

function changePhoneSuccess(json) {
	return {
		type: CHANGE_PHONE_SUCCESS,
		changePhoneStatus: json,
	};
}

function changePhoneError(json) {
	return {
		type: CHANGE_PHONE_ERROR,
		changePhoneStatus: json,
	};
}

export function changePhone(newPhone) {
	return (dispatch) => {
		dispatch(changePhoneRequest());
		return axiosWrapper('/api/User/changePhoneRequest?newPhone=' + newPhone, {
			method: 'POST',
			credentials: 'same-origin',
		})
			.then((response) => {
				if (Object.keys(response.data.errors).length) dispatch(changePhoneError(response.data));
				else {
					dispatch(confirmationCodeSend());
				}
			})
			.catch((e) => {
				console.error(e);
			});
	};
}

export function confirmCheckCode(code) {
	return (dispatch) => {
		return axiosWrapper('/api/User/changePhoneCommit?checkCode=' + code, {
			method: 'POST',
			credentials: 'same-origin',
		})
			.then((response) => {
				if (Object.keys(response.data.errors).length) dispatch(changePhoneError(response.data));
				else {
					dispatch(changePhoneSuccess(response.data));
				}
			})
			.catch((e) => {
				console.error(e);
			});
	};
}

function confirmationCodeSend() {
	return {
		type: CONFIRMATION_CODE_SEND,
	};
}

// function changePINRequest() {
// 	return { type: CHANGE_PIN_REQUEST };
// }

// function changePINRequestComplete() {
// 	return { type: CHANGE_PIN_REQUEST_COMPLETE };
// }

// function verificationTypeSend(t) {
// 	return { type: CHANGE_PIN_VERIFICATION_TYPE, payload: t };
// }

// function changePINConfirmRequest() {
// 	return { type: CHANGE_PIN_CONFIRM_REQUEST };
// }

// function changePINConfirmComplete() {
// 	return { type: CHANGE_PIN_CONFIRM_REQUEST_COMPLETE };
// }

// function showChangePINFailedPopup() {
// 	return { type: SHOW_CHANGE_PIN_FAILED_POPUP };
// }

// export function hideChangePINFailedPopup() {
// 	return { type: HIDE_CHANGE_PIN_FAILED_POPUP };
// }

// function showChangePINisWrongMsg() {
// 	return {
// 		type: SHOW_CHANGE_PIN_IS_WRONG_MSG,
// 	};
// }

// export function hideChangePINisWrongMsg() {
// 	return {
// 		type: HIDE_CHANGE_PIN_IS_WRONG_MSG,
// 	};
// }

// function showError500Msg() {
// 	return { type: SHOW_ERROR500_MSG };
// }

// export function hideError500Msg() {
// 	return { type: HIDE_ERROR500_MSG };
// }

// export function changePIN(pin) {
// 	return (dispatch) => {
// 		dispatch(changePINRequest());
// 		return axiosWrapper('/api/User/changePin?newPin=' + pin, {
// 			method: 'POST',
// 			credentials: 'same-origin',
// 		})
// 			.then((response) => {
// 				if (response.data.errorCode === 2) {
// 					dispatch(verificationTypeSend(response.data.verificationType));
// 					dispatch(changePINRequestComplete());
// 				}
// 			})
// 			.catch((e) => {
// 				dispatch(changePINRequestComplete());
// 				console.error(e);
// 			});
// 	};
// }

// export function changePINConfirm({ verificationCode, verificationType }) {
// 	return (dispatch) => {
// 		dispatch(changePINConfirmRequest());
// 		return axiosWrapper('/api/User/changePin', {
// 			method: 'POST',
// 			credentials: 'same-origin',
// 			headers: {
// 				Accept: 'application/json;',
// 				'Content-Type': 'application/json-patch+json',
// 				verificationCode,
// 				verificationType,
// 			},
// 		})
// 			.then((response) => {
// 				dispatch(changePINConfirmComplete());
// 				switch (response.data.errorCode) {
// 					case 1: {
// 						// NotSuccessful
// 						dispatch(showChangePINFailedPopup());
// 						break;
// 					}
// 					case 2: {
// 						// Need verification
// 						dispatch(verificationTypeSend(response.data.verificationType));
// 						break;
// 					}
// 					case 3: {
// 						// Wrong verification code
// 						dispatch(showChangePINisWrongMsg());
// 						break;
// 					}
// 					default: {
// 						dispatch(changePINSuccess());
// 					}
// 				}
// 			})
// 			.catch((e) => {
// 				dispatch(changePINConfirmComplete());
// 				dispatch(showError500Msg());
// 				console.error(e);
// 			});
// 	};
// }

// export function changePINSuccess() {
// 	return {
// 		type: CHANGE_PIN_SUCCESS,
// 	};
// }

// export function changePinStatusReset() {
// 	return {
// 		type: CHANGE_PIN_STATUS_RESET,
// 	};
// }

// export function openChangeLoginPopup() {
// 	return {
// 		type: OPEN_CHANGE_LOGIN_POPUP,
// 	};
// }

// export function closeChangeLoginPopup() {
// 	return {
// 		type: CLOSE_CHANGE_LOGIN_POPUP,
// 	};
// }

// export function openChangeEmailPopup() {
// 	return {
// 		type: OPEN_CHANGE_EMAIL_POPUP,
// 	};
// }

// export function closeChangeEmailPopup() {
// 	return {
// 		type: CLOSE_CHANGE_EMAIL_POPUP,
// 	};
// }

// function changeEmailRequest() {
// 	return {
// 		type: CHANGE_EMAIL_REQUEST,
// 	};
// }

// function changeEmailSuccess(json) {
// 	return {
// 		type: CHANGE_EMAIL_SUCCESS,
// 		changeEmailStatus: json,
// 	};
// }

// function changeEmailError(json) {
// 	return {
// 		type: CHANGE_EMAIL_ERROR,
// 		changeEmailStatus: json,
// 	};
// }

// export function changeEmail(newEmail) {
// 	return (dispatch) => {
// 		dispatch(changeEmailRequest());
// 		return axiosWrapper('/api/User/changeEmail?email=' + newEmail, {
// 			method: 'POST',
// 			credentials: 'same-origin',
// 			data: JSON.stringify({ email: newEmail }),
// 		})
// 			.then((response) => {
// 				Object.keys(response.data.errors).length
// 					? dispatch(changeEmailError(response.data))
// 					: dispatch(changeEmailSuccess(response.data));
// 			})
// 			.catch((e) => {
// 				console.error(e);
// 			});
// 	};
// }

// export function clearChangeEmailErrors() {
// 	return {
// 		type: CLEAR_CHANGE_EMAIL_ERRORS,
// 	};
// }

// export function closeChangeGeolocationPopup() {
// 	return {
// 		type: CLOSE_CHANGE_GEOLOCATION_POPUP,
// 	};
// }

// export function openChangeGeolocationPopup() {
// 	return {
// 		type: OPEN_CHANGE_GEOLOCATION_POPUP,
// 	};
// }

// function changeGeolocationRequest() {
// 	return {
// 		type: CHANGE_GEOLOCATION_REQUEST,
// 	};
// }

// function changeGeolocationSuccess(json) {
// 	return {
// 		type: CHANGE_GEOLOCATION_SUCCESS,
// 		changeGeolocationStatus: json,
// 	};
// }

// function changeGeolocationError(json) {
// 	return {
// 		type: CHANGE_GEOLOCATION_ERROR,
// 		changeGeolocationStatus: json,
// 	};
// }

// export function changeGeolocation(userData) {
// 	return (dispatch) => {
// 		dispatch(changeGeolocationRequest());
// 		return (
// 			axiosWrapper('/api/User/changeData', {
// 				method: 'POST',
// 				credentials: 'same-origin',
// 				headers: {
// 					Accept: 'application/json',
// 					'Content-Type': 'application/json',
// 				},
// 				data: JSON.stringify(userData),
// 			})
// 				//.then(response => response.json())
// 				.then((response) => {
// 					Object.keys(response.data.errors).length
// 						? dispatch(changeGeolocationError(response.data))
// 						: dispatch(changeGeolocationSuccess(response.data));
// 				})
// 				.catch((e) => {
// 					console.error(e);
// 				})
// 		);
// 	};
// }

// export function openChangeFullNamePopup() {
// 	return {
// 		type: OPEN_CHANGE_FULL_NAME_POPUP,
// 	};
// }

// export function closeChangeFullNamePopup() {
// 	return {
// 		type: CLOSE_CHANGE_FULL_NAME_POPUP,
// 	};
// }

// export function togglePopup(opened) {
// 	return {
// 		type: 'TOGGLE_POPUP',
// 		opened: !opened,
// 	};
// }

// function changeFullNameRequest() {
// 	return {
// 		type: CHANGE_FULL_NAME_REQUEST,
// 	};
// }

// function changeFullNameSuccess(json) {
// 	json['birthDate'] = moment(json.birthDate).format('LL');
// 	return {
// 		type: CHANGE_FULL_NAME_SUCCESS,
// 		changeFullNameStatus: json,
// 	};
// }

// function changeFullNameError(json) {
// 	return {
// 		type: CHANGE_FULL_NAME_ERROR,
// 		changeFullNameStatus: json,
// 	};
// }

// export function changeFullName(userData) {
// 	return (dispatch) => {
// 		dispatch(changeFullNameRequest());
// 		return axiosWrapper('/api/User/changeData', {
// 			method: 'POST',
// 			credentials: 'same-origin',
// 			headers: {
// 				Accept: 'application/json',
// 				'Content-Type': 'application/json',
// 			},
// 			data: JSON.stringify(userData),
// 		})
// 			.then((response) => {
// 				Object.keys(response.data.errors).length
// 					? dispatch(changeFullNameError(response.data))
// 					: dispatch(changeFullNameSuccess(response.data));
// 			})
// 			.catch((e) => {
// 				console.error(e);
// 			});
// 	};
// }

// export function switchEmailSubscription(id) {
// 	return {
// 		type: SWITCH_SUBSCRIPTION,
// 		id: id,
// 	};
// }

export function changeSubscriptions() {
	/*TODO needs subrscibe API Methods */
	return {
		type: CHANGE_SUBSCRIPTIONS,
	};
}

export function closeSubscriptionsPopup() {
	return {
		type: CLOSE_SUBSCRIPTIONS_POPUP,
	};
}

// function uploadAvatarRequest() {
// 	return {
// 		type: UPLOAD_AVATAR_REQUEST,
// 	};
// }

// function uploadAvatarSuccess(json) {
// 	return {
// 		type: UPLOAD_AVATAR_SUCCESS,
// 	};
// }

// function uploadAvatarError(json) {
// 	return {
// 		type: UPLOAD_AVATAR_ERROR,
// 	};
// }

// export function uploadAvatar(data) {
// 	return (dispatch) => {
// 		dispatch(uploadAvatarRequest());
// 		return axiosWrapper('/api/User/changeImage', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'multipart/form-data',
// 			},
// 			data: data,
// 		})
// 			.then((response) => {
// 				Object.keys(response.data.errors).length
// 					? dispatch(uploadAvatarError(response.data))
// 					: dispatch(uploadAvatarSuccess(response.data));
// 			})
// 			.catch((e) => {
// 				dispatch({ type: 'UPLOAD_AVATAR_ERROR' }); // hide loader
// 				console.error(e);
// 			});
// 	};
// }

export function closeAllPopups() {
	return {
		type: 'CLOSE_ALL_POPUPS',
	};
}

export function setTermsAgreed() {
	return {
		type: 'SET_TERMS_AGREED',
	};
}

export function resetTermsAgreed() {
	return {
		type: 'SET_TERMS_DISAGREED',
	};
}

export function setUserPhoneAndCountryCode(countryName, countryCode, countryPhoneCode, phoneNumber) {
	return {
		type: 'SET_USER_PHONE_AND_COUNTRY_CODES',
		countryPhoneCode: {
			name: countryName,
			countryCode: countryCode,
			phoneCode: countryPhoneCode,
		},
		userTypedPhone: phoneNumber || countryPhoneCode + ' ',
		phoneNumberToSend: '',
		userTypedPhoneIsValid: false,
	};
}

export function setCountryCodes(countryName, countryCode, countryPhoneCode) {
	return {
		type: 'SET_COUNTRY_CODES',
		countryPhoneCode: {
			name: countryName,
			countryCode: countryCode,
			phoneCode: countryPhoneCode,
		},
	};
}

export function setUserTypedPhone(userTypedPhone, phoneNumberToSend, userTypedPhoneIsValid = false) {
	return {
		type: 'SET_USER_PHONE_NUMBER',
		userTypedPhone,
		phoneNumberToSend,
		userTypedPhoneIsValid,
	};
}

export function changeGeolocationCompletedClose() {
	return {
		type: 'CHANGE_GEOLOCATION_COMPLETED_CLOSE',
	};
}

export function changeUserCurrencyDispatch(currencyId) {
	return {
		type: 'CHANGE_USER_CURRENCY_SUCCESS',
		userCurrency: currencyId,
	};
}

export function changeUserCurrency(currencyId, userid) {
	return (dispatch) => {
		dispatch({
			type: 'CHANGE_USER_CURRENCY_REQUEST',
		});
		let userSettingsCurrencyCodeInDB = 16;
		axiosWrapper('/api/UserSettings?page=1&itemsPerPage=15', {
			method: 'GET',
			credentials: 'same-origin',
		})
			.then((response) => {
				//TODO: РАЗОБРАТЬСЯ ЧТО ЗДЕСТ ПРОИСХОДИТ и ПОЧЕМУ PUT запрос уходит с непонятными данными второй раз (дублируется)
				let filter = _filter(response.data, (o) => o.settingId === userSettingsCurrencyCodeInDB);
				if (filter.length && currencyId === null) {
					dispatch(changeUserCurrencyDispatch(+filter[0].value));
				}
				let output = null;
				if (currencyId !== null) output = currencyId;
				if (filter.length && currencyId === null) output = filter[0].value;
				if (!filter.length && currencyId === null) output = 840;
				//output = output !== null ? output : 840;
				dispatch(changeUserCurrencyDispatch(output));
				dispatch(fetchCurrencyRatesForFiatCurrency(output));
				let queryType = filter.length ? 'PUT' : 'POST';
				axiosWrapper('/api/UserSettings', {
					method: queryType,
					credentials: 'same-origin',
					headers: {
						Accept: 'application/json;',
						'Content-Type': 'application/json-patch+json',
					},
					data: JSON.stringify({
						userId: userid,
						settingId: userSettingsCurrencyCodeInDB,
						value: output,
					}),
				}).catch((e) => {
					console.error(e);
				});
			})
			.catch((e) => {
				console.error(e);
			});
	};
}

export function changeLoginType(value) {
	return {
		type: CHANGE_LOGIN_TYPE,
		value,
	};
}

export function checkGoogleAuth(userPhoneNumber) {
	return (dispatch) => {
		dispatch({ type: FETCH_GOOGLE_AUTH, value: true });
		return axiosWrapper('/api/TwoFactorAuthentication/CheckGoogleAuth?phone=' + userPhoneNumber, {
			method: 'GET',
		})
			.then((response) => {
				dispatch({ type: CHECK_GOOGLE_AUTH_EXIST, value: response.data.alreadyExisting }); // gAuth exist
				dispatch({ type: FETCH_GOOGLE_AUTH, value: false });
			})
			.catch((e) => {
				dispatch({ type: FETCH_GOOGLE_AUTH, value: false });
				console.error(e);
			});
	};
}

export function requestGoogleAuth(userPhoneNumber) {
	return (dispatch) => {
		dispatch({ type: FETCH_GOOGLE_AUTH, value: true });
		return axiosWrapper('/api/TwoFactorAuthentication/RequestGoogleAuth?phone=' + userPhoneNumber, {
			method: 'GET',
		})
			.then((response) => {
				dispatch({ type: SET_GOOGLE_AUTH_REQUEST_RESPONSE, value: response.data }); // gAuth exist
				dispatch({ type: FETCH_GOOGLE_AUTH, value: false });
			})
			.catch((e) => {
				dispatch({ type: FETCH_GOOGLE_AUTH, value: false });
				dispatch({ type: SET_GOOGLE_AUTH_SERVER_ERROR, value: true });
				console.error(e);
			});
	};
}

export function confirmGoogleAuth(userPhoneNumber, code) {
	return (dispatch) => {
		dispatch({ type: FETCH_GOOGLE_AUTH, value: true });
		return axiosWrapper(
			'/api/TwoFactorAuthentication/ConfirmGoogleAuth?phone=' + userPhoneNumber + '&checkCode=' + code,
			{
				method: 'GET',
			}
		)
			.then((response) => {
				if (response.data.errorCode === 0) {
					dispatch({ type: SET_GOOGLE_AUTH_REQUEST_RESPONSE, value: {} });
					dispatch({ type: CHECK_GOOGLE_AUTH_EXIST, value: true });
					dispatch({ type: OPEN_GOOGLE_AUTH_COMPLETE_POPUP });
					dispatch({ type: FETCH_GOOGLE_AUTH, value: false });
					dispatch(hideGoogleAuthResetForm());
				} else {
					dispatch({ type: FETCH_GOOGLE_AUTH, value: false });
					dispatch({ type: SET_GOOGLE_AUTH_CONFIRM_ERROR, value: true });
				}
			})
			.catch((e) => {
				dispatch({ type: FETCH_GOOGLE_AUTH, value: false });
				dispatch({ type: SET_GOOGLE_AUTH_SERVER_ERROR, value: true });
				console.error(e);
			});
	};
}

export function resetGoogleAuthConfirmError() {
	return (dispatch) => {
		dispatch({ type: SET_GOOGLE_AUTH_CONFIRM_ERROR, value: false });
	};
}

export function resetGoogleAuthServerError() {
	return (dispatch) => {
		dispatch({ type: SET_GOOGLE_AUTH_SERVER_ERROR, value: false });
	};
}

export function setGoogleAuthConfirmError() {
	return (dispatch) => {
		dispatch({ type: SET_GOOGLE_AUTH_CONFIRM_ERROR, value: true });
	};
}

export function showGoogleAuthResetForm() {
	return (dispatch) => {
		dispatch({ type: GOOGLE_AUTH_RESET_FORM, value: true });
	};
}

export function hideGoogleAuthResetForm() {
	return (dispatch) => {
		dispatch({ type: GOOGLE_AUTH_RESET_FORM, value: false });
	};
}

export function resetGoogleAuth(userPhoneNumber, code) {
	return (dispatch) => {
		dispatch({ type: FETCH_GOOGLE_AUTH, value: true });
		return axiosWrapper(
			'/api/TwoFactorAuthentication/ResetGoogleAuth?phone=' + userPhoneNumber + '&checkCode=' + code,
			{
				method: 'GET',
			}
		)
			.then((response) => {
				if (response.data.errorCode === 0) {
					dispatch({ type: SET_GOOGLE_AUTH_REQUEST_RESPONSE, value: {} });
					dispatch({ type: CHECK_GOOGLE_AUTH_EXIST, value: false });
					dispatch({ type: OPEN_GOOGLE_AUTH_RESET_POPUP });
					dispatch({ type: FETCH_GOOGLE_AUTH, value: false });
				} else {
					dispatch({ type: SET_GOOGLE_AUTH_CONFIRM_ERROR, value: true });
					dispatch({ type: FETCH_GOOGLE_AUTH, value: false });
				}
			})
			.catch((e) => {
				dispatch({ type: FETCH_GOOGLE_AUTH, value: false });
				dispatch({ type: SET_GOOGLE_AUTH_SERVER_ERROR, value: true });
				console.error(e);
			});
	};
}

export function closeGoogleAuthPopup() {
	return (dispatch) => {
		dispatch({ type: CLOSE_GOOGLE_AUTH_POPUPS });
	};
}

export function getNoftications() {
	return (dispatch) => {
		dispatch({ type: FETCH_NOTIFICATION_SETTINGS, value: true });
		return axiosWrapper('/api/UserSettings/getNotificationSettings', {
			method: 'GET',
		})
			.then((response) => {
				dispatch({ type: FETCH_NOTIFICATION_SETTINGS, value: false });
				dispatch({
					type: SET_NOTIFICATION_SETTINGS,
					withdrawals: response.data.withdrawals,
					systemEvents: response.data.systemEvents,
				});
			})
			.catch((e) => {
				dispatch({ type: FETCH_NOTIFICATION_SETTINGS, value: false });
				console.error(e);
			});
	};
}

export function setNotificationWithdrawals(withdrawals) {
	return (dispatch) => {
		dispatch({
			type: SET_NOTIFICATION_SETTING_WITHDRAWALS,
			withdrawals: withdrawals,
		});
	};
}

export function setNotificationSystemEvents(systemEvents) {
	return (dispatch) => {
		dispatch({
			type: SET_NOTIFICATION_SETTING_SYSTEM_EVENTS,
			systemEvents: systemEvents,
		});
	};
}

export function putNotification(uid, withdrawals, systemEvents) {
	return (dispatch) => {
		let query = {
			userId: uid,
			withdrawals: withdrawals,
			systemEvents: systemEvents,
		};
		dispatch({ type: FETCH_NOTIFICATION_SETTINGS, value: true });
		return axiosWrapper('/api/UserSettings/changeNotificationSettings', {
			method: 'POST',
			data: query,
		})
			.then((response) => {
				dispatch({ type: FETCH_NOTIFICATION_SETTINGS, value: false });
				dispatch({
					type: SET_NOTIFICATION_SETTINGS,
					withdrawals: response.data.withdrawals,
					systemEvents: response.data.systemEvents,
				});
				dispatch({ type: CHANGE_SUBSCRIPTIONS });
			})
			.catch((e) => {
				dispatch({ type: FETCH_NOTIFICATION_SETTINGS, value: false });
				dispatch({ type: SHOW_NOTIFICATION_ERROR_POPUP, value: true });
				console.error(e);
			});
	};
}

export function closeNotificationErrorPopup() {
	return (dispatch) => {
		dispatch({ type: SHOW_NOTIFICATION_ERROR_POPUP, value: false });
	};
}
