const initialState = {
  card_events: [],
  fetching: false
}

export default function card_events(state = initialState, action) {

  switch (action.type) {
    case 'REQUEST_CARD_EVENTS':
      return { ...state, fetching: true }

    case 'RECEIVE_CARD_EVENTS':
      return { ...state, card_events: action.card_events, fetching: false }

    default:
      return state;
  }

}