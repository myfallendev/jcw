const initialState = {
  partners: [],
  fetching: false
}

export default function partners(state = initialState, action) {

  switch (action.type) {
    case 'REQUEST_PARTNERS':
      return { ...state, fetching: true }

    case 'RECEIVE_PARTNERS':
      return { ...state, partners: action.partners, fetching: false }

    default:
      return state;
  }
  
}