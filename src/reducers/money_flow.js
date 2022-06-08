const initialState = {
  money_flow: [],
  fetching: false
}

export default function money_flow(state = initialState, action) {

  switch (action.type) {
    case 'REQUEST_MONEY_FLOW':
      return { ...state, fetching: true }

    case 'RECEIVE_MONEY_FLOW':   
      return { ...state, money_flow: action.money_flow, fetching: false}
    default:
      return state;
  }

}