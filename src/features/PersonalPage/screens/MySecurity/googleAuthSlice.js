import { createSlice } from '@reduxjs/toolkit';
import { checkGoogleAuth, requestGoogleAuth, confirmGoogleAuth, resetGoogleAuth } from 'api/twoFactorAuthentication';

const initialState = {
	googleAuthExist: false,
	requestGoogleAuthResponse: {},
	showGoogleAuthCompletePopup: false,
	showGoogleAuthResetPopup: false,
	fetching: false,
	errors: [],
	googleAuthServerError: false,
};

const googleAuthSlice = createSlice({
	name: 'GOOGLE_AUTH_SETTINGS',
	initialState,
	reducers: {
		checkGoogleAuthStart: (state) => {
			state.fetching = true;
			state.errors = [];
			state.googleAuthServerError = false;
		},
		checkGoogleAuthFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		checkGoogleAuthSuccess: (state, action) => {
			state.fetching = false;
			state.googleAuthExist = action.payload;
		},
		requestGoogleAuthStart: (state) => {
			state.fetching = true;
			state.errors = [];
			state.googleAuthServerError = false;
		},
		requestGoogleAuthFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		requestGoogleAuthSuccess: (state, action) => {
			state.fetching = false;
			state.requestGoogleAuthResponse = action.payload;
		},
		serverError: (state) => {
			state.fetching = false;
			state.googleAuthServerError = true;
		},
		confirmGoogleAuthStart: (state) => {
			state.fetching = true;
			state.errors = [];
			state.googleAuthServerError = false;
		},
		confirmGoogleAuthFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		confirmGoogleAuthSuccess: (state) => {
			state.fetching = false;
			state.showGoogleAuthCompletePopup = true;
			state.requestGoogleAuthResponse = {};
			state.googleAuthExist = true;
		},
		resetGoogleAuthStart: (state) => {
			state.fetching = true;
			state.errors = [];
			state.googleAuthServerError = false;
		},
		resetGoogleAuthFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		resetGoogleAuthSuccess: (state) => {
			state.fetching = false;
			state.showGoogleAuthResetPopup = true;
			state.requestGoogleAuthResponse = {};
			state.googleAuthExist = false;
		},
		resetErrors: (state) => {
			state.errors = [];
			state.serverError = false;
		},
		closeResultPopups: (state) => {
			state.showGoogleAuthCompletePopup = false;
			state.showGoogleAuthResetPopup = false;
		},
		setGoogleAuthConfirmError: (state) => {
			state.errors = [{ value: 'error' }];
		},
	},
});

export default googleAuthSlice.reducer;

export const {
	checkGoogleAuthStart,
	checkGoogleAuthFailed,
	checkGoogleAuthSuccess,
	requestGoogleAuthStart,
	requestGoogleAuthFailed,
	requestGoogleAuthSuccess,
	serverError,
	confirmGoogleAuthStart,
	confirmGoogleAuthFailed,
	confirmGoogleAuthSuccess,
	resetGoogleAuthStart,
	resetGoogleAuthFailed,
	resetGoogleAuthSuccess,
	resetErrors,
	setGoogleAuthConfirmError,
	closeResultPopups,
} = googleAuthSlice.actions;

export const fetchCheckGoogleAuth = (phone) => async (dispatch) => {
	try {
		dispatch(checkGoogleAuthStart());
		const { data } = await checkGoogleAuth(phone);
		if (data.errorCode) {
			return dispatch(checkGoogleAuthFailed(data.errors));
		}
		dispatch(checkGoogleAuthSuccess(data.alreadyExisting));
	} catch (err) {
		console.error(err);
	}
};

export const fetchRequestGoogleAuth = (phone) => async (dispatch) => {
	try {
		dispatch(requestGoogleAuthStart());
		const { data } = await requestGoogleAuth(phone);
		if (data.errorCode) {
			return dispatch(requestGoogleAuthFailed(data.errors));
		}
		dispatch(requestGoogleAuthSuccess(data));
	} catch (err) {
		dispatch(serverError());
		console.error(err);
	}
};

export const fetchConfirmGoogleAuth = (phone, code) => async (dispatch) => {
	try {
		dispatch(confirmGoogleAuthStart());
		const { data } = await confirmGoogleAuth(phone, code);
		if (data.errorCode) {
			return dispatch(confirmGoogleAuthFailed(data.errors));
		}
		dispatch(confirmGoogleAuthSuccess());
	} catch (err) {
		dispatch(serverError());
		console.error(err);
	}
};

export const fetchResetGoogleAuth = (phone, code) => async (dispatch) => {
	try {
		dispatch(resetGoogleAuthStart());
		const { data } = await resetGoogleAuth(phone, code);
		if (data.errorCode) {
			return dispatch(resetGoogleAuthFailed(data.errors));
		}
		dispatch(resetGoogleAuthSuccess());
	} catch (err) {
		dispatch(serverError());
		console.error(err);
	}
};
