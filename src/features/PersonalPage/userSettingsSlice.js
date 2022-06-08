import { createSlice } from '@reduxjs/toolkit';
import { kycStatus, kycToken } from 'api/sumsubstance';
import { uploadAvatar, changeData } from 'api/user';
import { getEntries, updateEntry, getNotificationSettings, changeNotificationSettings } from 'api/userSettings';
import { getCurrencyCode } from 'api/currencyCode';
import moment from 'moment';

export const KYC_STATUS = {
	None: 0,
	ApplicantCreated: 1,
	ApplicantSubmitted: 2,
	Reviewed: 4,
	ReviewedOK: 8,
	ReviewedBad: 16,
	CanRetry: 32,
};

const getKYCStatus = (bitflag) => {
	if (!bitflag) return 0;
	if ((bitflag & KYC_STATUS.CanRetry) === KYC_STATUS.CanRetry) return KYC_STATUS.CanRetry;
	if ((bitflag & KYC_STATUS.ReviewedBad) === KYC_STATUS.ReviewedBad) return KYC_STATUS.ReviewedBad;
	if ((bitflag & KYC_STATUS.ReviewedOK) === KYC_STATUS.ReviewedOK) return KYC_STATUS.ReviewedOK;
	if ((bitflag & KYC_STATUS.ApplicantSubmitted) === KYC_STATUS.ApplicantSubmitted) return KYC_STATUS.ApplicantSubmitted;
	if ((bitflag & KYC_STATUS.ApplicantCreated) === KYC_STATUS.ApplicantCreated) return KYC_STATUS.ApplicantCreated;
};

export const USER_SETTINGS_ID = { language: 15, currency: 16 };

const initialState = {
	kycStatus: '',
	kycToken: null,
	kycApplicantId: null,
	kycDate: null,

	avatarChanged: false,

	userCurrency: null,
	userLanguage: 'en',
	settings: null,

	dataChangeSuccess: false,

	googleAuthExist: false,

	changePasswordSuccess: false,

	notificationSettingsWithdrawals: false,
	notificationSettingsSystemEvents: false,
	changeNotificationSettingsSuccess: false,

	fetching: false,
	errors: [],
	serverError: null,
};

const userSettingsSlice = createSlice({
	name: 'NEW_USER_SETTINGS',
	initialState,
	reducers: {
		kycStatusStart: (state) => {
			state.fetching = true;
			state.errors = [];
		},
		kycStatusFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		kycStatusSuccess: (state, action) => {
			state.fetching = false;
			state.kycStatus = getKYCStatus(action.payload.verification);
			state.kycDate = action.payload.time;
		},
		kycTokenStart: (state) => {
			state.fetching = true;
			state.errors = [];
		},
		kycTokenFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		kycTokenSuccess: (state, action) => {
			state.fetching = false;
			state.kycToken = action.payload;
		},
		submitUserApplicantIdStart: (state) => {
			state.fetching = true;
			state.errors = [];
		},
		submitUserApplicantIdFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		submitUserApplicantIdSuccess: (state) => {
			state.fetching = false;
		},
		submitUserApplicationCompleteStart: (state) => {
			state.fetching = true;
			state.errors = [];
		},
		submitUserApplicationCompleteFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		submitUserApplicationCompleteSuccess: (state) => {
			state.fetching = false;
		},
		uploadAvatarStart: (state) => {
			state.fetchingUploadAvatar = true;
			state.errors = [];
		},
		uploadAvatarFailed: (state, action) => {
			state.fetchingUploadAvatar = false;
			state.errors = action.payload;
		},
		uploadAvatarSuccess: (state) => {
			state.fetchingUploadAvatar = false;
			state.avatarChanged = true;
		},
		userSettingsStart: (state) => {
			state.fetching = true;
			state.errors = [];
		},
		userSettingsFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		userSettingsSuccess: (state, action) => {
			state.fetching = false;
			state.settings = action.payload;
			state.userLanguage = action.payload[USER_SETTINGS_ID.language] || 'en';
		},
		updateUserSettingsStart: (state) => {
			state.fetchingUpdateUserSettings = true;
			state.errors = [];
		},
		updateUserSettingsFailed: (state, action) => {
			state.fetchingUpdateUserSettings = false;
			state.errors = action.payload;
		},
		updateUserSettingsSuccess: (state) => {
			state.fetchingUpdateUserSettings = false;
		},
		getCurrencyCodeStart: (state) => {
			state.fetching = true;
			state.errors = [];
		},
		getCurrencyCodeFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		getCurrencyCodeSuccess: (state, action) => {
			state.fetching = false;
			state.userCurrency = action.payload;
		},
		changeDataStart: (state) => {
			state.fetching = true;
			state.errors = [];
		},
		changeDataFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		changeDataSuccess: (state) => {
			state.fetching = false;
			state.dataChangeSuccess = true;
		},
		resetChangeDataState: (state) => {
			state.dataChangeSuccess = false;
		},
		serverError: (state) => {
			state.fetching = false;
			state.serverError = true;
		},
		resetErrors: (state) => {
			state.fetching = false;
			state.errors = [];
			state.serverError = null;
		},
		getNotificationSettingsStart: (state) => {
			state.fetching = true;
			state.errors = [];
			state.serverError = null;
		},
		getNotificationSettingsFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		getNotificationSettingsSuccess: (state, action) => {
			state.fetching = false;
			state.notificationSettingsSystemEvents = action.payload.systemEvents;
			state.notificationSettingsWithdrawals = action.payload.withdrawals;
		},
		setNotificationWithdrawals: (state, action) => {
			state.notificationSettingsWithdrawals = action.payload;
		},
		setNotificationSystemEvents: (state, action) => {
			state.notificationSettingsSystemEvents = action.payload;
		},
		changeNotificationSettingsStart: (state) => {
			state.fetching = true;
			state.errors = [];
			state.serverError = null;
		},
		changeNotificationSettingsFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		changeNotificationSettingsSuccess: (state, action) => {
			state.fetching = false;
			state.notificationSettingsSystemEvents = action.payload.systemEvents;
			state.notificationSettingsWithdrawals = action.payload.withdrawals;
			state.changeNotificationSettingsSuccess = true;
		},
		closeChangeNotificationSettingsPopups: (state) => {
			state.changeNotificationSettingsSuccess = false;
			state.serverError = null;
		},
	},
});

export default userSettingsSlice.reducer;

export const {
	serverError,

	kycStatusStart,
	kycStatusFailed,
	kycStatusSuccess,

	kycTokenStart,
	kycTokenFailed,
	kycTokenSuccess,

	submitUserApplicantIdStart,
	submitUserApplicantIdFailed,
	submitUserApplicantIdSuccess,

	submitUserApplicationCompleteStart,
	submitUserApplicationCompleteFailed,
	submitUserApplicationCompleteSuccess,

	uploadAvatarStart,
	uploadAvatarFailed,
	uploadAvatarSuccess,

	userSettingsStart,
	userSettingsFailed,
	userSettingsSuccess,

	updateUserSettingsStart,
	updateUserSettingsFailed,
	updateUserSettingsSuccess,

	getCurrencyCodeStart,
	getCurrencyCodeFailed,
	getCurrencyCodeSuccess,

	changeDataStart,
	changeDataFailed,
	changeDataSuccess,
	resetChangeDataState,

	getNotificationSettingsStart,
	getNotificationSettingsFailed,
	getNotificationSettingsSuccess,
	setNotificationWithdrawals,
	setNotificationSystemEvents,
	changeNotificationSettingsStart,
	changeNotificationSettingsFailed,
	changeNotificationSettingsSuccess,
	closeChangeNotificationSettingsPopups,

	resetErrors,
} = userSettingsSlice.actions;

export const fetchKYCStatus = () => async (dispatch) => {
	try {
		dispatch(kycStatusStart());
		const { data } = await kycStatus();
		if (data.errorCode) {
			return dispatch(kycStatusFailed(data.errors));
		}
		const { verification, submittionTime } = data.response;
		const time = submittionTime && moment(submittionTime).format('LLL');
		dispatch(kycStatusSuccess({ verification, time }));
	} catch (err) {
		console.error(err);
	}
};

export const fetchKYCToken = () => async (dispatch) => {
	try {
		dispatch(kycTokenStart());
		const { data } = await kycToken();
		if (data.errorCode) {
			return dispatch(kycTokenFailed(data.errors));
		}
		dispatch(kycTokenSuccess(data.response));
	} catch (err) {
		console.error(err);
	}
};

export const fetchUploadAvatar = (img) => async (dispatch) => {
	try {
		dispatch(uploadAvatarStart());
		const { data } = await uploadAvatar(img);
		if (data.errorCode) {
			return dispatch(uploadAvatarFailed(data.errors));
		}
		dispatch(uploadAvatarSuccess(data));
	} catch (err) {
		dispatch(uploadAvatarFailed(err.response.data.errors));
		console.error(err);
	}
};

export const fetchUserSettings = () => async (dispatch) => {
	try {
		dispatch(userSettingsStart());
		const { data } = await getEntries();
		if (data.errorCode) {
			return dispatch(userSettingsFailed(data.errors));
		}
		dispatch(userSettingsSuccess(data.response));
		//default user settings for new registered user account
		if (!Object.keys(data.response).length) {
			dispatch(fetchUpdateUserSettings(15, 'en'));
			dispatch(fetchUpdateUserSettings(16, '840'));
		}
	} catch (err) {
		console.error(err);
	}
};

export const fetchUpdateUserSettings = (id, value) => async (dispatch) => {
	try {
		dispatch(updateUserSettingsStart());
		const { data } = await updateEntry(id, value);
		if (data.errorCode) {
			return dispatch(updateUserSettingsFailed(data.errors));
		}
		await dispatch(updateUserSettingsSuccess());
		dispatch(fetchUserSettings());
	} catch (err) {
		console.error(err);
	}
};

export const fetchUpdateUserCurrency = (value) => fetchUpdateUserSettings(USER_SETTINGS_ID.currency, value);
export const fetchUpdateUserLanguage = (value) => fetchUpdateUserSettings(USER_SETTINGS_ID.language, value);

export const fetchGetCurrencyCode = (id) => async (dispatch) => {
	try {
		dispatch(getCurrencyCodeStart());
		const { data } = await getCurrencyCode(id);
		if (data.errorCode) {
			return dispatch(getCurrencyCodeFailed(data.errors));
		}
		dispatch(getCurrencyCodeSuccess(data));
	} catch (err) {
		console.error(err);
	}
};

export const fetchChangeData = (userData) => async (dispatch) => {
	try {
		dispatch(changeDataStart());
		const { data } = await changeData(userData);
		if (data.errorCode) {
			return dispatch(changeDataFailed(data.errors));
		}
		dispatch(changeDataSuccess());
	} catch (err) {
		console.error(err);
	}
};

export const fetchGetNotificationSettings = () => async (dispatch) => {
	try {
		dispatch(getNotificationSettingsStart());
		const { data } = await getNotificationSettings();
		if (data.errorCode) {
			return dispatch(getNotificationSettingsFailed(data.errors));
		}
		dispatch(getNotificationSettingsSuccess(data));
	} catch (err) {
		dispatch(serverError());
		console.error(err);
	}
};

export const fetchChangeNotificationSettings = (userId, withdrawals, systemEvents) => async (dispatch) => {
	try {
		dispatch(changeNotificationSettingsStart());
		const { data } = await changeNotificationSettings(userId, withdrawals, systemEvents);
		if (data.errorCode) {
			return dispatch(changeNotificationSettingsFailed(data.errors));
		}
		dispatch(changeNotificationSettingsSuccess(data));
	} catch (err) {
		dispatch(serverError());
		console.error(err);
	}
};
