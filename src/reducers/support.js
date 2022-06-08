const initialState={
	questions: [],
	fetching: false,
	questionSendingComplete: false,
	questionSendingError: false,
	fetchingQuestionSending: false,
	error: {}
}

export default function support(state = initialState, action){
	switch(action.type){
		case 'REQUEST_QUESTIONS':
			return{ ...state, fetching: true, questionSendingError: false}
		case 'RECEIVE_QUESTIONS':
			return { ...state, fetching: false, questions: action.questions}
		case 'REQUEST_QUESTION_SENDING':
			return { ...state, fetchingQuestionSending: true}
		case 'COMPLETE_QUESTION_SENDING':
			return { ...state, questionSendingComplete: true, fetchingQuestionSending: false, showSendMessagePopup: true }
		case 'RESET_QUESTION_SENDING':
			return { ...state, questionSendingComplete: false, questionSendingError: false, fetchingQuestionSending: false}
		case 'QUESTION_SENDING_ERROR':
			return { ...state, fetching: false, questionSendingError: true, error: action.error, fetchingQuestionSending: false, showSendMessagePopup: true }
		case 'CLOSE_MESSAGE_POPUP':
			return { ...state, showSendMessagePopup: false }
		default:
			return state
	}
}
