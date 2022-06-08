const initialState = {
  banks: [],
  fetching: false
}

export default function banks(state = initialState, action) {

  switch (action.type) {
    case 'REQUEST_BANKS':
      return { ...state, fetching: true }

    case 'RECEIVE_BANKS':
      return { ...state, banks: action.banks, fetching: false }

    default:
      return state;
  }
  
}