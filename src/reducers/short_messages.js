const initialState = {
	messages: [],
	fetching: false
}

export default function short_messages(state=initialState, action){
	switch(action.type){
		case 'REQUEST_SHORT_MESSAGES':
			return{ ...state, fetching: true}
		case 'RECEIVE_SHORT_MESSAGES':
			return { ...state, fetching: false, messages: action.messages}
		case 'REMOVE_SHORT_MESSAGES':
			return { ...state, messages: []}
		default:
			return state
	}
}