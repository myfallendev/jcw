const initialState = {
  visible: false,
  complete: false, 
  fetching: false
}

export default function card_to_card_payment(state = initialState, action) {

  switch (action.type) {
    case 'OPEN_CARD_TO_CARD_PAYMENT':
      return { ...state, visible: true }

    case 'REQUEST_CARD_TO_CARD_PAYMENT':
      return { ...state, fetching: true }

    case 'RECEIVE_CARD_TO_CARD_PAYMENT':
      return { ...state, complete: true, fetching: false }

    case 'CLOSE_CARD_TO_CARD_PAYMENT':
      return { ...state, visible: false, complete: false, fetching: false }

    default:
      return state;
  }

}