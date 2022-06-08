const initialState = {
	fetchingChangePIN: false,
	changePINCompleted: false,
	showChangePINVerificationCodePopup: false,
	verificationType: '',
	additionalVerificationSequence: false,
	fetchingChangePINConfirm: false,
	showChangePINIsWrongMsg: false,
	showChangePINFailedPopup: false,
	changePINSuccess: false,
	show500Msg: false,
};

export default function changePin(state = initialState, action) {
	switch (action.type) {
		case 'CHANGE_PIN_REQUEST':
			return { ...state, fetchingChangePIN: true };
		case 'CHANGE_PIN_REQUEST_COMPLETE':
			return { ...state, fetchingChangePIN: false, changePINCompleted: true };
		case 'CHANGE_PIN_VERIFICATION_TYPE':
			return {
				...state,
				showChangePINVerificationCodePopup: true,
				verificationType: action.payload,
				additionalVerificationSequence: state.verificationType && state.verificationType !== action.payload,
			};
		case 'CHANGE_PIN_CONFIRM_REQUEST':
			return { ...state, fetchingChangePINConfirm: true };
		case 'CHANGE_PIN_CONFIRM_REQUEST_COMPLETE':
			return {
				...state,
				fetchingChangePINConfirm: false,
				showChangePINVerificationCodePopup: state.additionalVerificationSequence,
			};
		case 'SHOW_CHANGE_PIN_FAILED_POPUP':
			return { ...state, showChangePINFailedPopup: true, showChangePINVerificationCodePopup: false };
		case 'HIDE_CHANGE_PIN_FAILED_POPUP':
			return { ...state, showChangePINFailedPopup: false };
		case 'SHOW_CHANGE_PIN_IS_WRONG_MSG':
			return { ...state, showChangePINIsWrongMsg: true, showChangePINVerificationCodePopup: false };
		case 'HIDE_CHANGE_PIN_IS_WRONG_MSG':
			return { ...state, showChangePINIsWrongMsg: false };
		case 'SHOW_ERROR500_MSG':
			return { ...state, show500Msg: true, showChangePINVerificationCodePopup: false };
		case 'HIDE_ERROR500_MSG':
			return { ...state, show500Msg: false };
		case 'CHANGE_PIN_SUCCESS':
			return {
				...state,
				changePINSuccess: true,
				showChangePINVerificationCodePopup: false,
			};
		case 'CHANGE_PIN_STATUS_RESET':
			return {
				...initialState,
			};
		default:
			return state;
	}
}
