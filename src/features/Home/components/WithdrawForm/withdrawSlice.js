import { createSlice } from '@reduxjs/toolkit';
import { transferByPhone } from 'api/userAccount';
import { isJCAccount } from 'api/user';
import { makePayment } from 'api/payment';

const initialState = {
	fetching: false,

	transferByPhoneCodeRequest: false,
	transferByPhoneVerificationType: 0,
	transferByPhoneFailed: false,
	transferByPhoneSuccess: false,

	withdrawToWalletCodeRequest: false,
	withdrawToWalletVerificationType: 0,
	withdrawToWalletFailed: false,
	withdrawToWalletSuccess: false,

	showServerErrorMsg: false,
	showVerificationCodeErrorMsg: false,

	checkExists: null,
	withdrawResponse: {},
	errors: [],
};

const withdrawSlice = createSlice({
	name: 'WITHDRAW',
	initialState,
	reducers: {
		transferByPhoneStart(state) {
			state.fetching = true;
			state.errors = [];
		},
		transferByPhoneCodeRequest(state, action) {
			state.transferByPhoneVerificationType = action.payload;
			state.fetching = false;
			state.transferByPhoneCodeRequest = true;
			state.errors = [];
		},
		transferByPhoneFailed(state, action) {
			state.fetching = false;
			state.transferByPhoneFailed = true;
			state.transferByPhoneCodeRequest = false;
			state.withdrawResponse = action.payload;
			state.errors = action.payload.errors;
		},
		transferByPhoneSuccess(state, action) {
			state.fetching = false;
			state.transferByPhoneCodeRequest = false;
			state.transferByPhoneSuccess = true;
			state.withdrawResponse = action.payload;
		},
		transferByPhoneWrongCode(state) {
			state.fetching = false;
			state.showVerificationCodeErrorMsg = true;
		},
		hideWrongCodePopup(state) {
			state.showVerificationCodeErrorMsg = false;
		},
		withdrawReset() {
			return initialState;
		},
		showServerError(state) {
			state.fetching = false;
			state.showServerErrorMsg = true;
		},
		hideServerError(state) {
			state.showServerErrorMsg = false;
		},
		withdrawToWalletStart(state) {
			state.fetching = true;
			state.errors = [];
		},
		withdrawToWalletCodeRequest(state, action) {
			state.withdrawToWalletVerificationType = action.payload;
			state.fetching = false;
			state.showVerificationCodeErrorMsg = false;
			state.withdrawToWalletCodeRequest = true;
			state.errors = [];
		},
		withdrawToWalletFailed(state, action) {
			state.fetching = false;
			state.withdrawToWalletFailed = true;
			state.withdrawToWalletCodeRequest = false;
			state.withdrawResponse = action.payload;
			state.errors = action.payload.errors;
		},
		hideWithdrawToWalletFailedPopup(state) {
			state.withdrawToWalletFailed = false;
		},
		withdrawToWalletWrongCode(state) {
			state.fetching = false;
			state.showVerificationCodeErrorMsg = true;
		},
		withdrawToWalletSuccess(state, action) {
			state.fetching = false;
			state.withdrawToWalletSuccess = true;
			state.withdrawResponse = action.payload;
		},
		hideResultIsSuccessPopup(state) {
			state.withdrawToWalletSuccess = false;
			state.transferByPhoneSuccess = false;
		},
		hideResultIsFailurePopup(state) {
			state.transferByPhoneFailed = false;
			state.withdrawToWalletFailed = false;
		},
		isJCAccountStart(state) {
			state.fetching = true;
			state.errors = [];
		},
		isJCAccountFailed(state, action) {
			state.fetching = false;
			state.errors = action.payload;
			state.checkExists = false;
		},
		isJCAccountSuccess(state) {
			state.fetching = false;
			state.checkExists = true;
		},
		resetIsJCAccountErrors(state) {
			state.checkExists = null;
			state.errors = [];
		},
	},
});

export const {
	transferByPhoneStart,
	transferByPhoneCodeRequest,
	transferByPhoneFailed,
	withdrawReset,
	transferByPhoneWrongCode,
	hideWrongCodePopup,
	transferByPhoneSuccess,
	showServerError,
	hideServerError,
	withdrawToWalletStart,
	withdrawToWalletCodeRequest,
	withdrawToWalletWrongCode,
	withdrawToWalletFailed,
	//withdrawToWalletReset,
	withdrawToWalletSuccess,
	hideResultIsSuccessPopup,
	hideResultIsFailurePopup,
	resetIsJCAccountErrors,
	isJCAccountStart,
	isJCAccountFailed,
	isJCAccountSuccess,
} = withdrawSlice.actions;

export default withdrawSlice.reducer;

export const fetchTransferByPhone = (...args) => async (dispatch) => {
	try {
		dispatch(transferByPhoneStart());
		const { data } = await transferByPhone(...args);
		switch (data.errorCode) {
			case 1: {
				// NotSuccessful
				dispatch(transferByPhoneFailed(data));
				break;
			}
			case 2: {
				// Need verification
				dispatch(transferByPhoneCodeRequest(data.verificationType));
				break;
			}
			case 3: {
				// Wrong verification code
				dispatch(transferByPhoneWrongCode());
				break;
			}
			default: {
				dispatch(transferByPhoneSuccess(data));
			}
		}
	} catch (err) {
		dispatch(showServerError());
		console.error(err);
	}
};

export const fetchWithdrawToWallet = (query) => async (dispatch) => {
	try {
		dispatch(withdrawToWalletStart());
		const { data } = await makePayment(query);
		switch (data.errorCode) {
			case 1: {
				// NotSuccessful
				dispatch(withdrawToWalletFailed(data));
				break;
			}
			case 2: {
				// Need verification
				dispatch(withdrawToWalletCodeRequest(data.verificationType));
				break;
			}
			case 3: {
				// Wrong verification code
				dispatch(withdrawToWalletWrongCode());
				break;
			}
			default: {
				dispatch(withdrawToWalletSuccess(data));
			}
		}
	} catch (err) {
		dispatch(showServerError());
		console.error(err);
	}
};

export const fetchIsJCAccount = (walletAddress, phoneNumber) => async (dispatch) => {
	dispatch(isJCAccountStart());
	try {
		const { data } = await isJCAccount(walletAddress, phoneNumber);
		if (data.errorCode) {
			return dispatch(isJCAccountFailed(data.errors));
		}
		if (!data.response && !data.errorCode) {
			return dispatch(isJCAccountFailed([{ value: 'User not found' }]));
		}
		dispatch(isJCAccountSuccess());
	} catch (err) {
		console.error(err);
	}
};
