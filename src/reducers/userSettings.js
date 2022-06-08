function updateItemInArray(array, itemId, updateItemCallback) {
	const updatedItems = array.map((item) => {
		if (item.id !== itemId) {
			return item;
		}

		const updatedItem = updateItemCallback(item);
		return updatedItem;
	});

	return updatedItems;
}

const initialState = {
	currentPage: 'personal-data',
	fetchingUserInfo: false,
	userInfo: {},
	//change password
	showChangePswPopup: false,
	changePasswordStatus: [],
	showChangePasswordErrors: false,
	fetchingChangePassword: false,
	changePasswordCompleted: false,
	changePasswordServerError: false,
	//change phone
	fetchingChangePhone: false,
	confirmationCodeSend: false,
	changePhoneCompleted: false,
	showChangePhonePopup: false,
	showChangePhoneErrors: false,
	showCountryPhoneCodePopup: false,
	countryPhoneCode: {
		name: '',
		countryCode: '',
		phoneCode: '',
	},
	//change login
	showChangeLoginPopup: false,
	fetchingChangeLogin: false,
	showChangeLoginErrors: false,
	changeLoginStatus: false,
	changeLoginCompleted: false,
	//change email
	changeEmailStatus: [],
	showChangeEmailPopup: false,
	showChangeEmailErrors: false,
	fetchingChangeEmail: false,
	changeEmailCompleted: false,
	//change geolocation
	changeGeolocationCompleted: false,
	changeGeolocationStatus: [],
	showChangeGeolocationPopup: false,
	showChangeGeolocationErrors: false,
	fetchingChangeGeolocation: false,
	//change name
	changeFullNameStatus: [],
	showChangeFullNamePopup: false,
	fetchingChangeFullName: false,
	changeFullNameCompleted: false,
	subscriptions: [
		{
			id: 0,
			text: 'Receive email notifications about updates',
			active: false,
		},
		{
			id: 1,
			text: 'Receive email notifications about withdrawals',
			active: false,
		},
	],
	showSubscriptionsPopup: false,
	fetchingUploadAvatar: false,
	avatarChanged: false,
	popupOpened: false,
	termsAreAgreed: false,
	userTypedPhone: '',
	phoneNumberToSend: '',
	userTypedPhoneIsValid: false,
	userCurrency: null,
	userCurrencyFetching: false,
	userLoginType: 'phone',
	//GA
	googleAuthExist: false,
	requestGoogleAuthResponse: {},
	googleAuthConfirmError: false,
	googleAuthResetForm: false,
	googleAuthResetError: false,
	showGoogleAuthCompletePopup: false,
	showGoogleAuthResetPopup: false,
	fetchGoogleAuth: false,
	googleAuthServerError: false,
	//Subscriptions
	fetchNotificationSettings: false,
	notificationSettingsWithdrawals: false,
	notificationSettingsSystemEvents: false,
	showSubscriptionsErrorPopup: false,
};

export default function userSettings(state = initialState, action) {
	switch (action.type) {
		case 'REQUEST_GET_USER_INFO':
			return { ...state, fetchingUserInfo: true };
		case 'SUCCESS_GET_USER_INFO':
			localStorage.setItem('user', JSON.stringify(action.userInfo));
			return { ...state, userInfo: action.userInfo, fetchingUserInfo: false, avatarChanged: false };
		case 'OPEN_CHANGE_PASSWORD_POPUP':
			return { ...state, showChangePswPopup: true };
		case 'CLOSE_CHANGE_PASSWORD_POPUP':
			return {
				...state,
				showChangePswPopup: false,
				showChangePasswordErrors: false,
				changePasswordCompleted: false,
			};
		case 'CHANGE_PASSWORD_REQUEST':
			return { ...state, fetchingChangePassword: true };
		case 'CHANGE_PASSWORD_LOADER_HIDE':
			return { ...state, fetchingChangePassword: false };
		case 'CHANGE_PASSWORD_SERVER_ERROR':
			return { ...state, changePasswordServerError: action.value };
		case 'CHANGE_PASSWORD_SUCCESS':
			return {
				...state,
				changePasswordStatus: action.changePasswordStatus,
				showChangePasswordErrors: false,
				changePasswordCompleted: true,
				fetchingChangePassword: false,
				showChangePswPopup: true,
			};
		case 'CHANGE_PASSWORD_ERROR':
			return {
				...state,
				changePasswordStatus: action.changePasswordStatus,
				showChangePasswordErrors: true,
				fetchingChangePassword: false,
			};
		case 'CLEAR_CHANGE_PASSWORD_ERRORS':
			return { ...state, showChangePasswordErrors: false, changePasswordServerError: false };
		case 'OPEN_CHANGE_PHONE_POPUP':
			return { ...state, showChangePhonePopup: true };
		case 'CLOSE_CHANGE_PHONE_POPUP':
			return { ...state, showChangePhonePopup: false, showChangePhoneErrors: false, changePhoneCompleted: false };

		case 'OPEN_COUNTRY_CODE_POPUP':
			return { ...state, showCountryPhoneCodePopup: true };
		case 'CLOSE_COUNTRY_CODE_POPUP':
			return { ...state, showCountryPhoneCodePopup: false };

		case 'SET_USER_PHONE_AND_COUNTRY_CODES':
		case 'SET_COUNTRY_CODES':
		case 'SET_USER_PHONE_NUMBER':
			return { ...state, ...action, showCountryPhoneCodePopup: false };

		case 'CHANGE_PHONE_REQUEST':
			return { ...state, fetchingChangePhone: true };
		case 'CONFIRMATION_CODE_SEND':
			return { ...state, confirmationCodeSend: true, fetchingChangePhone: false };
		case 'CHANGE_PHONE_SUCCESS':
			return {
				...state,
				changePhoneStatus: action.changePhoneStatus,
				showChangePhoneErrors: false,
				changePhoneCompleted: true,
				fetchingChangePhone: false,
				showChangePhonePopup: true,
			};
		case 'CHANGE_PHONE_ERROR':
			return {
				...state,
				changePhoneStatus: action.changePhoneStatus,
				showChangePhoneErrors: true,
				fetchingChangePhone: false,
			};
		case 'CLEAR_CHANGE_PHONE_ERRORS':
			return { ...state, showChangePhoneErrors: false };
		case 'OPEN_CHANGE_LOGIN_POPUP':
			return { ...state, showChangeLoginPopup: true };
		case 'CLOSE_CHANGE_LOGIN_POPUP':
			return { ...state, showChangeLoginPopup: false, showChangeLoginErrors: false, changeLoginCompleted: false };
		case 'CHANGE_LOGIN_REQUEST':
			return { ...state, fetchingChangeLogin: true };
		case 'CHANGE_LOGIN_SUCCESS':
			return {
				...state,
				changeLoginStatus: action.changeLoginStatus,
				showChangeLoginErrors: false,
				changeLoginCompleted: true,
				fetchingChangeLogin: false,
				showChangeLoginPopup: true,
			};
		case 'CHANGE_LOGIN_ERROR':
			return {
				...state,
				changeLoginStatus: action.changeLoginStatus,
				showChangeLoginErrors: true,
				fetchingChangeLogin: false,
			};
		case 'CLEAR_CHANGE_LOGIN_ERRORS':
			return { ...state, showChangeLoginErrors: false };
		case 'OPEN_CHANGE_EMAIL_POPUP':
			return { ...state, showChangeEmailPopup: true };
		case 'CLOSE_CHANGE_EMAIL_POPUP':
			return { ...state, showChangeEmailPopup: false, showChangeEmailErrors: false, changeEmailCompleted: false };
		case 'CHANGE_EMAIL_REQUEST':
			return { ...state, fetchingChangeEmail: true };
		case 'CHANGE_EMAIL_SUCCESS':
			return { ...state, showChangeEmailErrors: false, changeEmailCompleted: true, fetchingChangeEmail: false };
		case 'CHANGE_EMAIL_ERROR':
			return {
				...state,
				changeEmailStatus: action.changeEmailStatus,
				showChangeEmailErrors: true,
				fetchingChangeEmail: false,
			};
		case 'CLEAR_CHANGE_EMAIL_ERRORS':
			return { ...state, showChangeEmailErrors: false };
		case 'CLOSE_CHANGE_GEOLOCATION_POPUP':
			return {
				...state,
				showChangeGeolocationPopup: false,
				showChangeGeolocationErrors: false,
				changeGeolocationCompleted: false,
			};
		case 'OPEN_CHANGE_GEOLOCATION_POPUP':
			return { ...state, showChangeGeolocationPopup: true };
		case 'CHANGE_GEOLOCATION_REQUEST':
			return { ...state, fetchingChangeGeolocation: true };
		case 'CHANGE_GEOLOCATION_SUCCESS':
			return {
				...state,
				changeGeolocationStatus: action.changeGeolocationStatus,
				showChangeGeolocationErrors: false,
				changeGeolocationCompleted: true,
				fetchingChangeGeolocation: false,
			};
		case 'CHANGE_GEOLOCATION_ERROR':
			return {
				...state,
				changeGeolocationStatus: action.changeGeolocationStatus,
				showChangeGeolocationErrors: true,
				fetchingChangeGeolocation: false,
			};
		case 'CLEAR_CHANGE_GEOLOCATION_ERRORS':
			return { ...state, showChangeGeolocationErrors: false };
		case 'OPEN_CHANGE_FULL_NAME_POPUP':
			return { ...state, showChangeFullNamePopup: true };
		case 'CLOSE_CHANGE_FULL_NAME_POPUP':
			return { ...state, showChangeFullNamePopup: false, changeFullNameCompleted: false };
		case 'CHANGE_FULL_NAME_REQUEST':
			return { ...state, fetchingChangeFullName: true };
		case 'CHANGE_FULL_NAME_SUCCESS':
			return {
				...state,
				changeFullNameStatus: action.changeFullNameStatus,
				showChangeFullNameErrors: false,
				changeFullNameCompleted: true,
				fetchingChangeFullName: false,
			};
		case 'CHANGE_FULL_NAME_ERROR':
			return {
				...state,
				changeFullNameStatus: action.changeFullNameStatus,
				showChangeFullNameErrors: true,
				fetchingChangeGeolocation: false,
			};
		case 'SWITCH_SUBSCRIPTION': {
			const newSubscriptionList = updateItemInArray(state.subscriptions, action.id, (subscription) => {
				return { ...subscription, active: !subscription.active };
			});
			return { ...state, subscriptions: newSubscriptionList };
		}
		case 'CHANGE_SUBSCRIPTIONS':
			return { ...state, showSubscriptionsPopup: true };
		case 'CLOSE_SUBSCRIPTIONS_POPUP':
			return { ...state, showSubscriptionsPopup: false };
		case 'UPLOAD_AVATAR_REQUEST':
			return { ...state, fetchingUploadAvatar: true };
		case 'UPLOAD_AVATAR_SUCCESS':
			return { ...state, fetchingUploadAvatar: false, avatarChanged: true };
		case 'UPLOAD_AVATAR_ERROR':
			return { ...state, fetchingUploadAvatar: false };
		case 'TOGGLE_POPUP':
			return { ...state, popupOpened: action.opened };
		case 'CLOSE_ALL_POPUPS':
			return {
				...state,
				showSubscriptionsPopup: false,
				showChangeGeolocationPopup: false,
				showChangeRegAddressPopup: false,
				showChangePswPopup: false,
				showChangeFullNamePopup: false,
				showChangeEmailPopup: false,
			};
		case 'SET_TERMS_AGREED':
			return { ...state, termsAreAgreed: true };
		case 'SET_TERMS_DISAGREED':
			return { ...state, termsAreAgreed: false };
		case 'CHANGE_GEOLOCATION_COMPLETED_CLOSE':
			return {
				...state,
				changeGeolocationCompleted: false,
			};
		case 'CHANGE_USER_CURRENCY_REQUEST':
			return { ...state, userCurrencyFetching: true };

		case 'CHANGE_USER_CURRENCY_SUCCESS':
			return { ...state, userCurrency: action.userCurrency, userCurrencyFetching: false };

		case 'CHANGE_LOGIN_TYPE':
			return { ...state, userLoginType: action.value };

		case 'CHECK_GOOGLE_AUTH_EXIST':
			return { ...state, googleAuthExist: action.value };
		case 'SET_GOOGLE_AUTH_REQUEST_RESPONSE':
			return { ...state, requestGoogleAuthResponse: action.value };
		case 'SET_GOOGLE_AUTH_CONFIRM_ERROR':
			return { ...state, googleAuthConfirmError: action.value };

		case 'GOOGLE_AUTH_RESET_FORM':
			return { ...state, googleAuthResetForm: action.value };
		case 'CLOSE_GOOGLE_AUTH_POPUPS':
			return { ...state, showGoogleAuthCompletePopup: false, showGoogleAuthResetPopup: false };
		case 'OPEN_GOOGLE_AUTH_COMPLETE_POPUP':
			return { ...state, showGoogleAuthCompletePopup: true };
		case 'OPEN_GOOGLE_AUTH_RESET_POPUP':
			return { ...state, showGoogleAuthResetPopup: true };
		case 'FETCH_GOOGLE_AUTH':
			return { ...state, fetchGoogleAuth: action.value };
		case 'SET_GOOGLE_AUTH_SERVER_ERROR':
			return { ...state, googleAuthServerError: action.value };

		case 'FETCH_NOTIFICATION_SETTINGS':
			return { ...state, fetchNotificationSettings: action.value };
		case 'SET_NOTIFICATION_SETTINGS':
			return {
				...state,
				notificationSettingsWithdrawals: action.withdrawals,
				notificationSettingsSystemEvents: action.systemEvents,
			};
		case 'SET_NOTIFICATION_SETTING_SYSTEM_EVENTS':
			return { ...state, notificationSettingsSystemEvents: action.systemEvents };
		case 'SET_NOTIFICATION_SETTING_WITHDRAWALS':
			return { ...state, notificationSettingsWithdrawals: action.withdrawals };
		case 'SHOW_NOTIFICATION_ERROR_POPUP':
			return { ...state, showSubscriptionsErrorPopup: action.value };
		default:
			return state;
	}
}
