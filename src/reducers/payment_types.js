const initialState = {
  payment_types: [],
  fetching: false
}

export default function payment_types(state = initialState, action) {

  switch (action.type) {
    case 'REQUEST_PAYMENT_TYPES':
      return { ...state, fetching: true }

    case 'RECEIVE_PAYMENT_TYPES':
      return { ...state, payment_types: action.payment_types, fetching: false }

    default:
      return state;
  }

}