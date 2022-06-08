//const current_user = localStorage.getItem('user');

const initialState = {
	//user: current_user ? JSON.parse(current_user) : {},
	//logged_in: !!current_user,
	//errors
	//errors: [],
	//show_errors: false,
	//errorChangePassword: '',
	//fetching
	//fetching: false,
	//fetchChangePassword: false,
	//fetchingPasswordRestore: false,
	//show
	//isRegSuccess: false,
	//isLoginWindow: false,
	//showRestorePasswordWindow: false,
	//showRestorePasswordPopup: false,
	//showFeeModal: false,
	//showSetEmailPopup: false,
	//showVerifyModal: false,
	//other
	//passwordChanged: false,
	//emailIsSet: false,
	//heartbeat: false,
	//buildNumber: null,
	//emailVerifyCode: '',
	//successEmailVerify: null,
	//requestEmailErrorText: '',
	//verifyModalDidClosed: false,
	//globalLoader: true,
	//KYC
	//userKYCToken: null,
	//userKYCApplicantId: null,
	//userKYCStatus: '',
	//userKYCDate: null,
};

export default function user(state = initialState, action) {
	switch (action.type) {
		case 'REQUEST_USER':
			return { ...state, fetching: true };

		case 'REQUEST_USER_KYC_STATUS':
			return { ...state, fetching: true };

		case 'REQUEST_USER_KYC_TOKEN':
			return { ...state, fetching: true };

		case 'CANCEL_FETCHING_BY_TIMEOUT':
			return {
				...state,
				user: { ...state.user, errors: { timeoutError: true } },
				show_errors: true,
				timeoutError: true,
				errors: [],
				fetching: false,
				fetchingPasswordRestore: false,
			};

		case 'RECEIVE_USER':
			localStorage.setItem('user', JSON.stringify(action.user));

			return {
				...state,
				user: action.user,
				fetching: false,
				logged_in: true,
				show_errors: false,
				errors: [],
				timeoutError: false,
			};

		case 'RECEIVE_USER_ERROR':
			return {
				...state,
				user: action.user,
				show_errors: true,
				fetching: false,
				errors: action.errors,
				timeoutError: false,
			};

		case 'RECEIVE_USER_KYC_STATUS':
			return {
				...state,
				userKYCStatus: action.status,
				userKYCDate: action.time,
				fetching: false,
				show_errors: false,
				errors: [],
			};

		case 'ERROR_USER_KYC_STATUS':
			return {
				...state,
				fetching: false,
				errors: action.errors,
			};

		case 'RECEIVE_USER_KYC_TOKEN':
			return {
				...state,
				userKYCToken: action.token,
				fetching: false,
				show_errors: false,
				errors: [],
			};

		case 'ERROR_USER_KYC_TOKEN':
			return {
				...state,
				fetching: false,
				errors: action.errors,
			};

		case 'REG_USER_COMPLETE':
			return {
				...state,
				user: action.user,
				isRegSuccess: true,
				fetching: false,
				timeoutError: false,
			};

		case 'REG_USER_ERROR':
			debugger;
			return {
				...state,
				show_errors: true,
				errors: action.errors,
				fetching: false,
				timeoutError: false,
			};

		case 'CLEAR_ERRORS':
			return {
				...state,
				user: action.user,
				show_errors: false,
				errors: [],
				timeoutError: false,
				fetching: false,
			};

		case 'SHOW_LOGIN_WINDOW':
			return {
				...state,
				user: action.user,
				show_errors: false,
				errors: [],
				timeoutError: false,
				fetching: false,
				isLoginWindow: true,
				showRestorePasswordWindow: false,
			};

		case 'SHOW_REG_WINDOW':
			return {
				...state,
				user: action.user,
				show_errors: false,
				errors: [],
				timeoutError: false,
				fetching: false,
				isLoginWindow: false,
				showRestorePasswordWindow: false,
			};

		case 'SHOW_RESTORE_WINDOW':
			return {
				...state,
				show_errors: false,
				errors: [],
				timeoutError: false,
				showRestorePasswordWindow: true,
				isLoginWindow: true,
			};

		case 'LOGOUT_REQUEST':
			return {
				...state,
				fetching: true,
				timeoutError: false,
			};

		case 'LOGOUT_SUCCESS':
			localStorage.removeItem('user');
			return {
				...state,
				fetching: false,
				user: [],
				logged_in: false,
				timeoutError: false,
			};

		case 'CLOSE_REG_POPUP':
			return {
				...state,
				show_errors: false,
				errors: [],
				timeoutError: false,
				isRegSuccess: false,
				isLoginWindow: true,
			};

		case 'RESTORE_PASSWORD_REQUEST':
			return {
				...state,
				fetchingPasswordRestore: true,
				timeoutError: false,
			};

		case 'RESTORE_PASSWORD_SUCCESS':
			return {
				...state,
				show_errors: false,
				errors: [],
				timeoutError: false,
				fetchingPasswordRestore: false,
				showRestorePasswordWindow: false,
				showRestorePasswordPopup: true,
			};

		case 'RESTORE_PASSWORD_ERROR':
			return {
				...state,
				fetchingPasswordRestore: false,
				show_errors: true,
				errors: action.errors,
				timeoutError: false,
				errorText: action.errors[0].value,
			};

		case 'CONFIRM_PASSWORD_REQUEST':
			return {
				...state,
				fetchingPasswordConfirm: true,
				timeoutError: false,
			};

		case 'CONFIRM_PASSWORD_SUCCESS':
			return {
				...state,
				show_errors: false,
				errors: [],
				timeoutError: false,
				fetchingPasswordConfirm: false,
				passwordChanged: true,
			};

		case 'CONFIRM_PASSWORD_ERROR':
			return {
				...state,
				timeoutError: false,
				user: action.user,
				show_errors: true,
				errors: action.errors,
			};

		case 'CLOSE_RESTORE_POPUP':
			return {
				...state,
				show_errors: false,
				errors: [],
				timeoutError: false,
				showRestorePasswordPopup: false,
				showRestorePasswordWindow: false,
				isLoginWindow: true,
				passwordChanged: false,
			};

		case 'HEARTBEAT_REQUEST':
			return {
				...state,
				heartbeat: true,
			};

		case 'HEARTBEAT_SUCCESS':
			return {
				...state,
				heartbeat: false,
				timeoutError: false,
			};

		case 'APP_INFO':
			return {
				...state,
				buildNumber: action.buildNumber,
			};

		case 'APP_INFO_CLOSE':
			return {
				...state,
				buildNumber: action.buildNumber,
			};

		case 'SHOW_VERIFY_MODAL':
			return {
				...state,
				showVerifyModal: true,
				timeoutError: false,
			};

		case 'HIDE_VERIFY_MODAL':
			return {
				...state,
				showVerifyModal: false,
				timeoutError: false,
			};

		case 'PUT_VERIFY_PROPS':
			return {
				...state,
				showVerifyModal: state.logged_in,
				emailVerifyCode: action.emailVerifyCode,
			};

		case 'SET_VERIFY_EMAIL':
			return {
				...state,
				successEmailVerify: action.val,
				user: { ...state.user, emailVerified: action.val },
			};

		case 'RESET_SUCCESS_EMAIL_VERIFY':
			return {
				...state,
				successEmailVerify: null,
			};

		case 'RESET_EMAIL_VERIFY_CODE':
			return {
				...state,
				emailVerifyCode: '',
			};

		case 'REQUEST_EMAIL_ERROR_TEXT':
			return {
				...state,
				requestEmailErrorText: action.requestEmailErrorText,
			};

		case 'RESET_EMAIL_ERROR_TEXT':
			return {
				...state,
				requestEmailErrorText: '',
				timeoutError: false,
			};

		case 'VERIFY_MODAL_DID_CLOSED':
			return {
				...state,
				verifyModalDidClosed: action.value,
			};
		case 'SET_GLOBAL_LOADER':
			return {
				...state,
				globalLoader: action.payload,
			};
		case 'SHOW_FEE_MODAL':
			return {
				...state,
				showFeeModal: action.payload,
			};
		case 'RESET_USER_DATA':
			return {
				...initialState,
				logged_in: false,
			};
		case 'FETCH_CHANGE_PASSWORD':
			return { ...state, fetchChangePassword: action.payload };
		case 'COMPLETE_CHANGE_PASSWORD':
			return {
				...state,
				user: {
					...state.user,
					passwordExpired: false,
				},
			};
		case 'ERROR_CHANGE_PASSWORD':
			return { ...state, errorChangePassword: action.payload };
		case 'SUBMIT_USER_KYC_APPLICANT_ID':
			return { ...state, userKYCApplicantId: action.id };
		case 'REQUEST_CHANGE_EMAIL_ERROR':
			return { ...state, fetching: true, erorrs: [] };
		case 'ERROR_SET_USER_EMAIL':
			return { ...state, fetching: false, errors: action.errors };
		case 'SUCCESS_SET_USER_EMAIL':
			return { ...state, fetching: false, emailIsSet: true };
		case 'SHOW_SET_USER_EMAIL_POPUP':
			return { ...state, showSetEmailPopup: true };
		case 'CLOSE_SET_USER_EMAIL_POPUP':
			return { ...state, showSetEmailPopup: false, errors: [] };
		case 'RESET_USER_ERRORS':
			return { ...state, errors: [] };
		default:
			return state;
	}
}
