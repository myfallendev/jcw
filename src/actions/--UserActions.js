// import fetchTimeoutWrapper from '../utils/fetchTimeoutWrapper'
//import axiosWrapper from '../utils/axiosWrapper';
//import moment from 'moment';
//import _isFunction from 'lodash/isFunction';

// export const REQUEST_USER = 'REQUEST_USER';
// export const REQUEST_USER_KYC_STATUS = 'REQUEST_USER_KYC_STATUS';
// export const REQUEST_USER_KYC_TOKEN = 'REQUEST_USER_KYC_TOKEN';

// export const RECEIVE_USER = 'RECEIVE_USER';
// export const RECEIVE_USER_ERROR = 'RECEIVE_USER_ERROR';
// export const CLEAR_ERRORS = 'CLEAR_ERRORS';
// export const REG_USER_COMPLETE = 'REG_USER_COMPLETE';
// export const REG_USER_ERROR = 'REG_USER_ERROR';
// export const SHOW_LOGIN_WINDOW = 'SHOW_LOGIN_WINDOW';
// export const SHOW_REG_WINDOW = 'SHOW_REG_WINDOW';
// export const SHOW_RESTORE_WINDOW = 'SHOW_RESTORE_WINDOW';
// export const RESTORE_PASSWORD_REQUEST = 'RESTORE_PASSWORD_REQUEST';
// export const RESTORE_PASSWORD_SUCCESS = 'RESTORE_PASSWORD_SUCCESS';
// export const RESTORE_PASSWORD_ERROR = 'RESTORE_PASSWORD_ERROR';
// export const CONFIRM_PASSWORD_REQUEST = 'CONFIRM_PASSWORD_REQUEST';
// export const CONFIRM_PASSWORD_SUCCESS = 'CONFIRM_PASSWORD_SUCCESS';
// export const CONFIRM_PASSWORD_ERROR = 'CONFIRM_PASSWORD_ERROR';
// export const CLOSE_RESTORE_POPUP = 'CLOSE_RESTORE_POPUP';
// export const RECEIVE_USER_KYC_STATUS = 'RECEIVE_USER_KYC_STATUS';
// export const RECEIVE_USER_KYC_TOKEN = 'RECEIVE_USER_KYC_TOKEN';
// export const ERROR_USER_KYC_TOKEN = 'ERROR_USER_KYC_TOKEN';
// export const ERROR_USER_KYC_STATUS = 'ERROR_USER_KYC_STATUS';

// export const CANCEL_FETCHING_BY_TIMEOUT = 'CANCEL_FETCHING_BY_TIMEOUT';

// function requestUser() {
// 	return {
// 		type: REQUEST_USER,
// 	};
// }

// KYC
// function requestUserKYCToken() {
// 	return {
// 		type: REQUEST_USER_KYC_TOKEN,
// 	};
// }

// function requestUserKYCStatus() {
// 	return {
// 		type: REQUEST_USER_KYC_STATUS,
// 	};
// }

// function receiveUserKYCStatus(status, time) {
// 	return {
// 		type: RECEIVE_USER_KYC_STATUS,
// 		status,
// 		time,
// 	};
// }

// function userKYCStatusError(data) {
// 	return {
// 		type: ERROR_USER_KYC_STATUS,
// 		receivedAt: Date.now(),
// 		error: createErrorsFromJson(data),
// 	};
// }

// export function getUserKYCStatus() {
// 	return (dispatch) => {
// 		dispatch(requestUserKYCStatus());
// 		return axiosWrapper('/api/KYC/kycStatus')
// 			.then((response) => {
// 				if (response.data.errorCode === 0) {
// 					const res = response.data.response;
// 					const { started, finished, verified, canRetry, submittionTime } = res;
// 					let status;
// 					const time = submittionTime && moment(submittionTime).format('LLL');
// 					if (!started) status = '0';
// 					if (started && !finished) status = '1';
// 					if (finished && verified === null) status = '2';
// 					if (verified) status = '3';
// 					if (verified === false && canRetry === true) status = '4';
// 					if (verified === false && canRetry === false) status = '5';
// 					dispatch(receiveUserKYCStatus(status, time));
// 				} else {
// 					dispatch(userKYCStatusError(response.data));
// 				}
// 			})
// 			.catch((e) => {
// 				console.error('kycStatus catch', e);
// 				dispatch(fetchingTimeout());
// 			});
// 	};
// }

// export function getUserKYCToken() {
// 	return (dispatch) => {
// 		dispatch(requestUserKYCToken());
// 		return axiosWrapper('/api/KYC/getUserToken')
// 			.then((response) => {
// 				if (response.data.errorCode === 0) {
// 					dispatch(receiveUserKYCToken(response.data.response));
// 				} else {
// 					dispatch(userKYCTokenError(response.data));
// 				}
// 			})
// 			.catch((e) => {
// 				console.error('kycToken catch', e);
// 				dispatch(fetchingTimeout());
// 			});
// 	};
// }

// function receiveUserKYCToken(token) {
// 	return {
// 		type: RECEIVE_USER_KYC_TOKEN,
// 		token: token,
// 		receivedAt: Date.now(),
// 	};
// }

// function userKYCTokenError(data) {
// 	return {
// 		type: ERROR_USER_KYC_TOKEN,
// 		receivedAt: Date.now(),
// 		error: createErrorsFromJson(data),
// 	};
// }


// function createErrorsFromJson(json) {
// 	let errors = {};

// 	if (!Array.isArray(json.errors) || !json.errors || !json.errors.length) return {};

// 	json.errors.forEach((item) => {
// 		errors[item.key] = item.value;
// 	});

// 	return { ...errors, timeoutError: false };
// }

// function fetchingTimeout() {
// 	return {
// 		type: CANCEL_FETCHING_BY_TIMEOUT,
// 	};
// }

// function receiveUser(json) {
// 	return {
// 		type: RECEIVE_USER,
// 		user: json,
// 		receivedAt: Date.now(),
// 	};
// }

// function loginError(json) {
// 	return {
// 		type: RECEIVE_USER_ERROR,
// 		user: json,
// 		receivedAt: Date.now(),
// 		errors: createErrorsFromJson(json),
// 	};
// }

// function regUser(json) {
// 	localStorage.getItem('referralLinkId') !== null && localStorage.removeItem('referralLinkId');
// 	return {
// 		type: REG_USER_COMPLETE,
// 		user: json,
// 		receivedAt: Date.now(),
// 	};
// }

// function registrationError(json) {
// 	return {
// 		type: REG_USER_ERROR,
// 		errors: json.errors,
// 		receivedAt: Date.now(),
// 	};
// }

// export function clearErrors() {
// 	return {
// 		type: CLEAR_ERRORS,
// 		receivedAt: Date.now(),
// 	};
// }

// export function showLoginWindow() {
// 	return {
// 		type: SHOW_LOGIN_WINDOW,
// 		//receivedAt: Date.now(),
// 	};
// }

// export function showRegWindow() {
// 	return {
// 		type: SHOW_REG_WINDOW,
// 		//receivedAt: Date.now(),
// 	};
// }


// export function showRestorePasswordWindow() {
// 	return {
// 		type: SHOW_RESTORE_WINDOW,
// 	};
// }

// export function login(user_name, password, callback) {
// 	return (dispatch) => {
// 		dispatch(requestUser());

// 		return axiosWrapper('/api/User/login', {
// 			method: 'POST',
// 			data: JSON.stringify({
// 				Login: user_name,
// 				Password: password,
// 				//'Recaptcha': window.__GCaptcha.key
// 				Recaptcha: 'SomeText',
// 			}),
// 		})
// 			.then((response) => {
// 				if (response.data.errorCode === 0) {
// 					dispatch(receiveUser(response.data));
// 				} else {
// 					dispatch(loginError(response.data));
// 				}
// 				if (callback) callback();
// 			})
// 			.catch((e) => {
// 				console.log('Login catch', e);
// 				dispatch(fetchingTimeout());
// 			});
// 	};
// }

// export function register(login, tel_number, referralLinkId) {
// 	return (dispatch) => {
// 		dispatch(requestUser());
// 		return axiosWrapper('/api/User/register', {
// 			method: 'POST',
// 			data: JSON.stringify({
// 				Login: login,
// 				Phone: tel_number,
// 				referralLinkId,
// 			}),
// 		})
// 			.then((response) => {
// 				if (response.data.errorCode === 0) {
// 					dispatch(regUser(response.data));
// 				} else {
// 					dispatch(registrationError(response.data));
// 				}
// 			})
// 			.catch((e) => {
// 				console.error(e);
// 				dispatch(fetchingTimeout());
// 			});
// 	};
// }

// function requestRestorePassword() {
// 	return {
// 		type: RESTORE_PASSWORD_REQUEST,
// 	};
// }

// function restorePasswordSuccess() {
// 	return {
// 		type: RESTORE_PASSWORD_SUCCESS,
// 	};
// }

// function restorePasswordError(json) {
// 	return {
// 		type: RESTORE_PASSWORD_ERROR,
// 		errorText: json.errorText,
// 		errors: json.errors,
// 	};
// }

// export function restorePassword(id) {
// 	const login = id.indexOf('@') !== -1 ? encodeURIComponent(id) : id;
// 	return (dispatch) => {
// 		dispatch(requestRestorePassword());
// 		return axiosWrapper('/api/User/resetPassword?login=' + login, {
// 			method: 'POST',
// 			data: JSON.stringify({ Login: login }),
// 		})
// 			.then((response) => {
// 				if (response.data.errorCode !== 1) {
// 					dispatch(restorePasswordSuccess());
// 				} else {
// 					dispatch(restorePasswordError(response.data));
// 				}
// 			})
// 			.catch((e) => {
// 				console.error(e);
// 				dispatch(fetchingTimeout());
// 			});
// 	};
// }

// function confirmPasswordRequest() {
// 	return {
// 		type: CONFIRM_PASSWORD_REQUEST,
// 	};
// }

// function confirmPasswordSuccess() {
// 	return {
// 		type: CONFIRM_PASSWORD_SUCCESS,
// 	};
// }

// function confirmPasswordError(json) {
// 	return {
// 		type: CONFIRM_PASSWORD_ERROR,
// 		user: json,
// 		errors: json.errors,
// 	};
// }

// export function confirmPasswordChange(phone, code, password, passwordConfirm) {
// 	return (dispatch) => {
// 		dispatch(confirmPasswordRequest());
// 		return axiosWrapper('/api/User/resetPasswordCommit', {
// 			method: 'POST',
// 			data: JSON.stringify({
// 				login: phone,
// 				code: code,
// 				password: password,
// 				passwordConfirm: passwordConfirm,
// 			}),
// 		}).then((response) => {
// 			if (response.data.errorCode === 0) {
// 				dispatch(confirmPasswordSuccess());
// 			} else {
// 				dispatch(confirmPasswordError(response.data));
// 			}
// 		});
// 	};
// }

// export function closeRestorePopup() {
// 	return {
// 		type: CLOSE_RESTORE_POPUP,
// 	};
// }

// export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
// export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

// function userLogoutRequest() {
// 	return {
// 		type: LOGOUT_REQUEST,
// 	};
// }

// export function userLogoutSuccess() {
// 	return {
// 		type: LOGOUT_SUCCESS,
// 	};
// }

// export const RESET_ACCOUNTS_DATA = 'RESET_ACCOUNTS_DATA';
// export const RESET_USER_DATA = 'RESET_USER_DATA';
// export const RESET_BALANCES_DATA = 'RESET_BALANCES_DATA';
// export const RESET_EXCHANGE_DATA = 'RESET_EXCHANGE_DATA';
// export const RESET_DEVICE_DATA = 'RESET_DEVICE_DATA';

// export function logout(callback) {
// 	return (dispatch) => {
// 		dispatch(userLogoutRequest());
// 		clearTimeout(window.heartbeat);
// 		return axiosWrapper('/api/User/logout', {
// 			method: 'POST',
// 		})
// 			.then(() => {
// 				dispatch(userLogoutSuccess());
// 				dispatch({ type: RESET_ACCOUNTS_DATA });
// 				dispatch({ type: RESET_USER_DATA });
// 				dispatch({ type: RESET_BALANCES_DATA });
// 				dispatch({ type: RESET_EXCHANGE_DATA });
// 				dispatch({ type: RESET_DEVICE_DATA });
// 			})
// 			.then(() => {
// 				if (_isFunction(callback)) callback();
// 			})
// 			.catch((e) => console.error(e));
// 	};
// }

// export const CLOSE_REG_POPUP = 'CLOSE_REG_POPUP';

// export function closeRegPopup() {
// 	return {
// 		type: CLOSE_REG_POPUP,
// 	};
// }

// export const HEARTBEAT_REQUEST = 'HEARTBEAT_REQUEST';
// export const HEARTBEAT_SUCCESS = 'HEARTBEAT_SUCCESS';

// function heartbeatRequest() {
// 	return {
// 		type: HEARTBEAT_REQUEST,
// 	};
// }

// export function heartbeatSuccess() {
// 	return {
// 		type: HEARTBEAT_SUCCESS,
// 	};
// }

//export const APP_INFO = 'APP_INFO';

// export function appInfo(buildNumber) {
// 	return {
// 		type: APP_INFO,
// 		buildNumber: buildNumber,
// 	};
// }

// export const APP_INFO_CLOSE = 'APP_INFO_CLOSE';

// export function closeAppInfoPopup() {
// 	return {
// 		type: APP_INFO_CLOSE,
// 		buildNumber: null,
// 	};
// }

// export function heartbeat() {
// 	return (dispatch) => {
// 		dispatch(heartbeatRequest());
// 		return axiosWrapper('/api/Heartbeat', {
// 			method: 'POST',
// 		})
// 			.then(() => {
// 				dispatch(heartbeatSuccess());
// 				let headers = {
// 					headers: {
// 						'Content-Type': 'application/json',
// 						'Cache-Control': 'no-cache',
// 					},
// 				};
// 				axiosWrapper('/app_info.json', headers)
// 					.then((response) => dispatch(appInfo(response.data.app_info.buildNumber)))
// 					.catch((e) => {
// 						console.error(e);
// 					});
// 			})
// 			.catch((e) => {
// 				console.error(e);
// 			});
// 	};
// }

// export const SET_VERIFY_EMAIL = 'SET_VERIFY_EMAIL';

// export function checkVerifyCode(verifyCode) {
// 	return (dispatch) => {
// 		return axiosWrapper('/api/User/verifyEmail?token=' + verifyCode, {
// 			method: 'POST',
// 			data: JSON.stringify({
// 				token: verifyCode,
// 			}),
// 		}).then((response) => {
// 			if (response.data.errorCode === 0) {
// 				dispatch({ type: SET_VERIFY_EMAIL, val: true });
// 			} else {
// 				dispatch({ type: SET_VERIFY_EMAIL, val: false });
// 			}
// 			dispatch(resetEmailVerifyCode());
// 		});
// 	};
// }

//export const SHOW_VERIFY_MODAL = 'SHOW_VERIFY_MODAL';
//export const HIDE_VERIFY_MODAL = 'HIDE_VERIFY_MODAL';

// export function showVerifyModal() {
// 	return (dispatch) => {
// 		dispatch({ type: SHOW_VERIFY_MODAL });
// 	};
// }

// export function hideVerifyModal() {
// 	return (dispatch) => {
// 		dispatch({ type: HIDE_VERIFY_MODAL });
// 	};
// }

//export const PUT_VERIFY_PROPS = 'PUT_VERIFY_PROPS';

// export function putVerifyProps(emailVerifyCode) {
// 	return (dispatch) => {
// 		dispatch({ type: 'PUT_VERIFY_PROPS', emailVerifyCode: emailVerifyCode });
// 	};
// }

// export const RESET_SUCCESS_EMAIL_VERIFY = 'RESET_SUCCESS_EMAIL_VERIFY';
// export const RESET_EMAIL_VERIFY_CODE = 'RESET_EMAIL_VERIFY_CODE';

// export function resetSuccessEmailVerify() {
// 	return { type: RESET_SUCCESS_EMAIL_VERIFY };
// }

// export function resetEmailVerifyCode() {
// 	return { type: RESET_EMAIL_VERIFY_CODE };
// }

// export const REQUEST_EMAIL_ERROR_TEXT = 'REQUEST_EMAIL_ERROR_TEXT';
// export const RESET_EMAIL_ERROR_TEXT = 'RESET_EMAIL_ERROR_TEXT';

// export function resetEmailErrorText() {
// 	return (dispatch) => {
// 		dispatch({ type: RESET_EMAIL_ERROR_TEXT });
// 	};
// }

// export function sendEmailOnceMore(userEmail) {
// 	return (dispatch) => {
// 		dispatch(resetSuccessEmailVerify());
// 		return axiosWrapper('/api/User/requestEmailVerification?email=' + encodeURIComponent(userEmail), {
// 			method: 'POST',
// 			data: JSON.stringify({ email: userEmail }),
// 		})
// 			.then((response) => {
// 				console.log('REQUEST EMAIL VERIFY', response);
// 			})
// 			.catch((e) => {
// 				dispatch({
// 					type: REQUEST_EMAIL_ERROR_TEXT,
// 					requestEmailErrorText: 'Verification request failed. Try again later.',
// 				});
// 				console.error(e);
// 			});
// 	};
// }

// export const VERIFY_MODAL_DID_CLOSED = 'VERIFY_MODAL_DID_CLOSED';

// export function verifyModalDidClosed(value) {
// 	return (dispatch) => {
// 		dispatch({ type: VERIFY_MODAL_DID_CLOSED, value: value });
// 	};
// }

// export function setGlobalLoader(value) {
// 	return (dispatch) => {
// 		dispatch({ type: 'SET_GLOBAL_LOADER', payload: value });
// 	};
// }

// export const SHOW_FEE_MODAL = 'SHOW_FEE_MODAL';

// export function showFeeModal(value) {
// 	return (dispatch) => {
// 		dispatch({ type: SHOW_FEE_MODAL, payload: value });
// 	};
// }

// export const FETCH_CHANGE_PASSWORD = 'FETCH_CHANGE_PASSWORD';
// export const COMPLETE_CHANGE_PASSWORD = 'COMPLETE_CHANGE_PASSWORD';
// export const ERROR_CHANGE_PASSWORD = 'ERROR_CHANGE_PASSWORD';

// export function changePassword(oldPsw, newPswFirst, newPswSecond) {
// 	return (dispatch) => {
// 		dispatch({ type: FETCH_CHANGE_PASSWORD, payload: true });
// 		return axiosWrapper('/api/User/changePassword', {
// 			method: 'POST',
// 			credentials: 'same-origin',
// 			headers: {
// 				Accept: 'application/json;',
// 				'Content-Type': 'application/json-patch+json; charset=utf-8',
// 			},
// 			data: JSON.stringify({
// 				OldPassword: oldPsw,
// 				Password: newPswFirst,
// 				PasswordConfirm: newPswSecond,
// 			}),
// 		})
// 			.then((response) => {
// 				dispatch({ type: FETCH_CHANGE_PASSWORD, payload: false });
// 				if (response.data.errorCode === 0) {
// 					dispatch({ type: COMPLETE_CHANGE_PASSWORD });
// 				} else {
// 					dispatch({
// 						type: ERROR_CHANGE_PASSWORD,
// 						payload: response.data.errors[0].value,
// 					});
// 				}
// 			})
// 			.catch((e) => {
// 				dispatch({ type: FETCH_CHANGE_PASSWORD, payload: false });
// 				console.error(e);
// 			});
// 	};
// }

// export const setEmail = (email) => async (dispatch) => {
// 	dispatch({ type: 'REQUEST_SET_USER_EMAIL' });
// 	try {
// 		const { data } = await axiosWrapper('/api/User/setEmail', { method: 'POST', data: JSON.stringify({ email }) });
// 		if (!data.response) return dispatch({ type: 'ERROR_SET_USER_EMAIL', errors: data.errors });
// 		return dispatch({ type: 'SUCCESS_SET_USER_EMAIL', email });
// 	} catch (e) {
// 		dispatch({ type: 'ERROR_SET_USER_EMAIL', errors: e });
// 		console.error(e);
// 	}
// };

// export function resetErrorsChangePassword() {
// 	return (dispatch) => {
// 		dispatch({ type: ERROR_CHANGE_PASSWORD, payload: '' });
// 	};
// }

// export function submitUserApplicantId(id) {
// 	return (dispatch) => {
// 		dispatch({ type: 'SUBMIT_USER_KYC_APPLICANT_ID', id });
// 		return axiosWrapper('/api/KYC/submitUserApplicantId?applicantId=' + id).catch((err) =>
// 			console.error('submit applicant id error', err)
// 		);
// 	};
// }

// export const resetErrors = () => (dispatch) => {
// 	dispatch({ type: 'RESET_USER_ERRORS' });
// };

// export const showSetEmailPopup = () => (dispatch) => {
// 	dispatch({ type: 'SHOW_SET_USER_EMAIL_POPUP' });
// };

// export const hideSetEmailPopup = () => (dispatch) => {
// 	dispatch({ type: 'CLOSE_SET_USER_EMAIL_POPUP' });
// };
