import { createSlice } from '@reduxjs/toolkit';
import { changePin } from 'api/user';

const initialState = {
	//fetchingChangePIN: false,
	//changePINRequestSuccess: false,
	//showChangePINVerificationCodePopup: false,
	verificationType: '',
	//additionalVerificationSequence: false,
	//fetchingChangePINConfirm: false,
	pinIsWrong: false,
	//showChangePINFailedPopup: false,
	changePINSuccess: false,
	show500Msg: false,

	fetching: false,
	errors: [],
};

const changePinSlice = createSlice({
	name: 'CHANGE_PIN',
	initialState,
	reducers: {
		changePinStart: (state) => {
			state.fetching = true;
			state.errors = [];
			state.verificationType = '';
			state.show500Msg = false;
			state.pinIsWrong = false;
		},
		changePinFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		changePinWrongCode: (state) => {
			state.fetching = false;
			state.pinIsWrong = true;
		},
		changePinSuccess: (state) => {
			state.fetching = false;
			state.changePINSuccess = true;
		},
		changePinVerificationRequest: (state, action) => {
			state.fetching = false;
			state.verificationType = action.payload;
		},
		showServerError: (state) => {
			state.fetching = false;
			state.show500Msg = true;
		},
		resetChangePinState: () => initialState,
	},
});

export default changePinSlice.reducer;

export const {
	changePinStart,
	changePinFailed,
	changePinWrongCode,
	changePinSuccess,
	changePinVerificationRequest,
	showServerError,
	resetChangePinState,
} = changePinSlice.actions;

export const fetchChangePin = ({ ...args }) => async (dispatch) => {
	try {
		dispatch(changePinStart());
		const { data } = await changePin({ ...args });
		switch (data.errorCode) {
			case 1: {
				// NotSuccessful
				dispatch(changePinFailed(data));
				break;
			}
			case 2: {
				// Need verification
				dispatch(changePinVerificationRequest(data.verificationType));
				break;
			}
			case 3: {
				// Wrong verification code
				dispatch(changePinWrongCode());
				break;
			}
			default: {
				dispatch(changePinSuccess(data));
			}
		}
	} catch (err) {
		dispatch(showServerError());
		console.error(err);
	}
};
