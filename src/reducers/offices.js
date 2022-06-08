const initialState = {
  offices: [],
  fetching: false
}

export default function offices(state = initialState, action) {

  switch (action.type) {
    case 'REQUEST_OFFICES':
      return { ...state, fetching: true }

    case 'RECEIVE_OFFICES':
      return { ...state, offices: action.offices, fetching: false }

    default:
      return state;
  }

}