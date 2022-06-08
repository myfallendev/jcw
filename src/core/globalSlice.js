import { createSlice } from '@reduxjs/toolkit';
import {
	login,
	logout,
	register,
	setEmail,
	getUserInfo,
	changePassword,
	restorePassword,
	restorePasswordConfirm,
	checkEmailVerificationCode,
	requestNewEmailVerificationCode,
} from 'api/user';
import { heartbeat } from 'api/heartbeat';

import axiosWrapper from 'utils/axiosWrapper';

const current_user = localStorage.getItem('user');

const initialState = {
	user: current_user && current_user !== 'undefined' ? JSON.parse(current_user) : {},
	logged_in: !!current_user || null,
	buildNumber: null,

	emailIsSet: false,

	emailVerifyCode: '',
	successEmailVerify: null,

	fetchingPasswordChange: false,
	passwordChanged: false,
	showRestorePasswordForm: false,

	regSuccess: false,

	fetching: false,
	timeoutError: false,
	serverErrorText: '',
	serverError: false,
	errors: [],
};

const globalSlice = createSlice({
	name: 'GLOBAL',
	initialState,
	reducers: {
		getUserInfoStart: (state) => {
			state.fetching = true;
			state.errors = [];
		},
		getUserInfoFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		getUserInfoSuccess: (state, action) => {
			state.fetching = false;
			state.user = action.payload;
			state.logged_in = true;
			localStorage.setItem('user', JSON.stringify(action.payload));
		},
		heartbeatStart: (state) => {
			//state.fetching = true;
			state.errors = [];
		},
		heartbeatFailed: (state, action) => {
			//state.fetching = false;
			state.errors = action.payload;
		},
		heartbeatSuccess: (state) => {
			//state.fetching = false;
			state.timeoutError = false;
		},
		getBuildNumber: (state, action) => {
			state.buildNumber = action.payload;
		},
		resetBuildNumber: (state) => {
			state.buildNumber = null;
		},
		loginStart: (state) => {
			state.fetching = true;
			state.errors = [];
		},
		loginFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		loginSuccess: (state, action) => {
			localStorage.setItem('user', JSON.stringify(action.payload));
			state.fetching = false;
			state.user = action.payload;
			state.logged_in = true;
		},
		logoutStart: (state) => {
			state.fetching = true;
			state.errors = [];
		},
		logoutFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		logoutSuccess: (state) => {
			localStorage.removeItem('user');
			state.user = {};
			state.fetching = false;
			state.logged_in = false;
		},
		resetErrors: (state) => {
			state.errors = [];
		},
		setEmailStart: (state) => {
			state.fetching = true;
			state.errors = [];
		},
		setEmailFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		setEmailSuccess: (state) => {
			state.fetching = false;
			state.emailIsSet = true;
		},
		resetRegistrationResult: (state) => {
			state.regSuccess = false;
			state.errors = [];
		},
		setEmailVerifyCode: (state, action) => {
			state.emailVerifyCode = action.payload;
		},
		checkEmailVerificationCodeStart: (state) => {
			state.fetching = true;
			state.errors = [];
		},
		checkEmailVerificationCodeFailed: (state, action) => {
			state.fetching = false;
			state.successEmailVerify = false;
			state.errors = action.payload;
		},
		checkEmailVerificationCodeSuccess: (state) => {
			state.fetching = false;
			state.successEmailVerify = true;
			state.user.emailVerified = true;
		},
		resetSuccessEmailVerify: (state) => {
			state.successEmailVerify = null;
		},
		resetEmailVerifyCode: (state) => {
			state.emailVerifyCode = '';
		},
		requestNewEmailVerificationCodeStart: (state) => {
			state.fetching = true;
			state.errors = [];
		},
		requestNewEmailVerificationCodeFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		requestNewEmailVerificationCodeServerError: (state) => {
			state.fetching = false;
			state.serverErrorText = 'Verification request failed. Try again later.';
		},
		requestNewEmailVerificationCodeSuccess: (state) => {
			state.fetching = false;
		},
		resetServerErrorText: (state) => {
			state.serverErrorText = '';
		},
		registerStart: (state) => {
			state.fetching = true;
			state.errors = [];
		},
		registerFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		registerSuccess: (state, action) => {
			localStorage.getItem('referralLinkId') !== null && localStorage.removeItem('referralLinkId');
			state.fetching = false;
			state.user = action.payload;
			state.regSuccess = true;
		},
		resetPasswordRestoreForm: (state) => {
			state.passwordChanged = false;
			state.showRestorePasswordForm = false;
			state.errors = [];
		},
		restorePasswordStart: (state) => {
			state.fetchingPasswordChange = true;
			state.errors = [];
		},
		restorePasswordFailed: (state, action) => {
			state.fetchingPasswordChange = false;
			state.errors = action.payload;
		},
		restorePasswordSuccess: (state) => {
			state.fetchingPasswordChange = false;
			state.showRestorePasswordForm = true;
		},
		restorePasswordConfirmStart: (state) => {
			state.fetchingPasswordChange = true;
			state.errors = [];
		},
		restorePasswordConfirmFailed: (state, action) => {
			state.fetchingPasswordChange = false;
			state.errors = action.payload;
		},
		restorePasswordConfirmSuccess: (state) => {
			state.fetchingPasswordChange = false;
			state.passwordChanged = true;
		},
		changePasswordStart: (state) => {
			state.fetching = true;
			state.errors = [];
		},
		changePasswordFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
			state.serverError = false;
		},
		changePasswordSuccess: (state) => {
			state.fetching = false;
			state.user.passwordExpired = false;
			state.passwordChanged = true;
		},
		serverError: (state) => {
			state.fetching = false;
			state.serverError = true;
		},
		resetPasswordChange: (state) => {
			state.errors = [];
			state.serverError = false;
			state.passwordChanged = false;
		},
	},
});

export const {
	loginStart,
	loginFailed,
	loginSuccess,
	registerStart,
	registerFailed,
	registerSuccess,
	getUserInfoStart,
	getUserInfoFailed,
	getUserInfoSuccess,
	heartbeatStart,
	heartbeatFailed,
	heartbeatSuccess,
	getBuildNumber,
	resetBuildNumber,
	logoutStart,
	logoutFailed,
	logoutSuccess,
	resetErrors,
	setEmailStart,
	setEmailFailed,
	setEmailSuccess,
	resetRegistrationResult,
	setEmailVerifyCode,
	checkEmailVerificationCodeStart,
	checkEmailVerificationCodeFailed,
	checkEmailVerificationCodeSuccess,
	resetSuccessEmailVerify,
	resetEmailVerifyCode,
	requestNewEmailVerificationCodeStart,
	requestNewEmailVerificationCodeFailed,
	requestNewEmailVerificationCodeServerError,
	requestNewEmailVerificationCodeSuccess,
	resetServerErrorText,
	resetPasswordRestoreForm,
	restorePasswordStart,
	restorePasswordFailed,
	restorePasswordSuccess,
	restorePasswordConfirmStart,
	restorePasswordConfirmFailed,
	restorePasswordConfirmSuccess,
	changePasswordStart,
	changePasswordFailed,
	changePasswordSuccess,
	serverError,
	resetPasswordChange,
} = globalSlice.actions;

export default globalSlice.reducer;

export const fetchGetUserInfo = () => async (dispatch) => {
	try {
		dispatch(getUserInfoStart());
		const { data } = await getUserInfo();
		if (data.errorCode) {
			return dispatch(getUserInfoFailed(data.errors));
		}
		dispatch(getUserInfoSuccess(data));
	} catch (err) {
		console.error(err);
	}
};

export const fetchHeartbeat = () => async (dispatch) => {
	try {
		dispatch(heartbeatStart());
		const { data } = await heartbeat();
		if (data.errorCode) {
			return dispatch(heartbeatFailed(data.errorCode));
		}
		dispatch(heartbeatSuccess());
		try {
			const { data: appInfoData } = await axiosWrapper('/app_info.json', {
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': 'no-cache',
				},
			});
			dispatch(getBuildNumber(appInfoData.app_info.buildNumber));
		} catch (err) {
			console.error(err);
		}
	} catch (err) {
		console.error(err);
	}
};

export const fetchLogout = () => async (dispatch) => {
	try {
		dispatch(logoutStart());
		const { data } = await logout();
		if (data.errorCode) {
			return dispatch(logoutFailed(data.errors));
		}
		dispatch(logoutSuccess());
		dispatch({ type: 'RESET_ACCOUNTS_DATA' });
		dispatch({ type: 'RESET_BALANCES_DATA' });
		dispatch({ type: 'RESET_EXCHANGE_DATA' });
		dispatch({ type: 'RESET_DEVICE_DATA' });
	} catch (err) {
		console.error(err);
	}
};

export const fetchSetEmail = (email) => async (dispatch) => {
	try {
		dispatch(setEmailStart());
		const { data } = await setEmail(email);
		if (data.errorCode) {
			return dispatch(setEmailFailed(data.errors));
		}
		dispatch(setEmailSuccess());
	} catch (err) {
		console.error(err);
	}
};

export const fetchLogin = (user, pass) => async (dispatch) => {
	try {
		dispatch(loginStart());
		const { data } = await login(user, pass);
		if (data.errorCode || data.status === 400) {
			return dispatch(loginFailed(data.errors));
		}
		dispatch(loginSuccess(data));
	} catch (err) {
		console.error(err);
	}
};

export const fetchCheckEmailVerificationCode = (code) => async (dispatch) => {
	try {
		dispatch(checkEmailVerificationCodeStart());
		const { data } = await checkEmailVerificationCode(code);
		if (data.errorCode) {
			return dispatch(checkEmailVerificationCodeFailed(data.errors));
		}
		dispatch(checkEmailVerificationCodeSuccess());
		dispatch(resetEmailVerifyCode());
	} catch (err) {
		console.error(err);
	}
};

export const fetchNewEmailVerificationCode = (email) => async (dispatch) => {
	try {
		dispatch(requestNewEmailVerificationCodeStart());
		const { data } = await requestNewEmailVerificationCode(email);
		if (data.errorCode) {
			return dispatch(requestNewEmailVerificationCodeFailed(data.errors));
		}
		dispatch(requestNewEmailVerificationCodeSuccess());
	} catch (err) {
		dispatch(requestNewEmailVerificationCodeServerError());
		console.error(err);
	}
};

export const fetchRegister = (login, phone, referralLinkId) => async (dispatch) => {
	try {
		dispatch(registerStart());
		const { data } = await register(login, phone, referralLinkId);
		if (data.errorCode) {
			return dispatch(registerFailed(data.errors));
		}
		dispatch(registerSuccess(data));
	} catch (err) {
		if (err.response.status === 400) {
			return dispatch(registerFailed(err.response.data.errors));
		}
		console.error(err);
	}
};

export const fetchRestorePassword = (login) => async (dispatch) => {
	try {
		dispatch(restorePasswordStart());
		const { data } = await restorePassword(login);
		if (data.errorCode) {
			return dispatch(restorePasswordFailed(data.errors));
		}
		dispatch(restorePasswordSuccess());
	} catch (err) {
		console.error(err);
	}
};

export const fetchRestorePasswordConfirm = (login, code, firstPassword, secondPassword) => async (dispatch) => {
	try {
		dispatch(restorePasswordConfirmStart());
		const { data } = await restorePasswordConfirm(login, code, firstPassword, secondPassword);
		if (data.errorCode) {
			return dispatch(restorePasswordConfirmFailed(data.errors));
		}
		dispatch(restorePasswordConfirmSuccess());
	} catch (err) {
		console.error(err);
	}
};

export const fetchChangePassword = (oldPassword, password, passwordConfirm) => async (dispatch) => {
	try {
		dispatch(changePasswordStart());
		const { data } = await changePassword(oldPassword, password, passwordConfirm);
		if (data.errorCode) {
			return dispatch(changePasswordFailed(data.errors));
		}
		dispatch(changePasswordSuccess());
	} catch (err) {
		console.error(err);
		dispatch(serverError());
	}
};
