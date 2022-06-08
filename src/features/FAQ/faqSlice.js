import { createSlice } from '@reduxjs/toolkit';
import { sendQuestion } from 'api/supportMessage';

const initialState = {
	questions: [],
	questionSendingSuccess: false,
	fetching: false,
	errors: [],
};

const faqSlice = createSlice({
	name: 'FAQ',
	initialState,
	reducers: {
		sendQuestionStart: (state) => {
			state.fetching = true;
			state.errors = [];
		},
		sendQuestionFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		sendQuestionSuccess: (state) => {
			state.fetching = false;
			state.questionSendingSuccess = true;
		},
		resetSendQuestion: (state) => {
			state.fetching = false;
			state.questionSendingSuccess = false;
			state.errors = [];
		},
	},
});

export default faqSlice.reducer;
const { sendQuestionStart, sendQuestionFailed, sendQuestionSuccess } = faqSlice.actions;
export const { resetSendQuestion } = faqSlice.actions;

export const fetchSendQuestion = (name, text) => async (dispatch) => {
	try {
		dispatch(sendQuestionStart());
		const { data } = await sendQuestion(name, text);
		if (data.errorCode) {
			return dispatch(sendQuestionFailed(data.errors));
		}
		dispatch(sendQuestionSuccess());
	} catch (err) {
		console.error(err);
	}
};
