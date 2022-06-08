import axiosWrapper from '../utils/axiosWrapper';

function requestQuestions(json) {
	return {
		type: 'REQUEST_QUESTIONS',
		questions: json,
	};
}

function receiveQuestions(json) {
	return {
		type: 'RECEIVE_QUESTIONS',
		questions: json,
	};
}

export function getQuestions() {
	return (dispatch) => {
		dispatch(requestQuestions());
		return fetch(window.jcApi + '/api/Faq?page=1&itemsPerPage=100', { credentials: 'same-origin' })
			.then((response) => response.json())
			.then((json) => dispatch(receiveQuestions(json)));
	};
}

function requestQuestionSending() {
	return {
		type: 'REQUEST_QUESTION_SENDING',
	};
}

function completeQuestionSending() {
	return {
		type: 'COMPLETE_QUESTION_SENDING',
	};
}

function questionSendingError(json) {
	return {
		type: 'QUESTION_SENDING_ERROR',
		error: json.errors,
	};
}

export function closeSendMessagePopup() {
	return {
		type: 'CLOSE_MESSAGE_POPUP',
	};
}

export function sendQuestion(title, text) {
	return (dispatch) => {
		dispatch(requestQuestionSending());
		return axiosWrapper('/api/SupportMessage', {
			method: 'POST',
			data: JSON.stringify({ name: title, text: text }),
		}).then((json) => {
			json.errorCode ? dispatch(questionSendingError(json)) : dispatch(completeQuestionSending());
		});
	};
}

export function resetQuestionSending() {
	return {
		type: 'RESET_QUESTION_SENDING',
	};
}
