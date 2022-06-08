const initialState = {
  account_events: [],
  fetching: false
}

export default function account_events(state = initialState, action) {

  switch (action.type) {
    case 'REQUEST_ACCOUNT_EVENTS':
      return { ...state, fetching: true }

    case 'RECEIVE_ACCOUNT_EVENTS':
      return { ...state, account_events: action.account_events, fetching: false }

    default:
      return state;
  }

}