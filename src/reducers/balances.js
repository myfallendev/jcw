const initialState = {
  balances: [],
  fetching: false
}

export default function balances(state = initialState, action) {

  switch (action.type) {

    case 'REQUEST_BALANCES':
      return { ...state, fetching: true }

    case 'RECEIVE_BALANCES':
      return { ...state, balances: action.balances, fetching: false }
    case 'RESET_BALANCES_DATA':
      return { ...initialState }

    default:
      return state;
  }

}