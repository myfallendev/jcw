export const REQUEST_CARD_EVENTS = 'REQUEST_CARD_EVENTS'
function requestCardEvents() { 
  return {
    type: REQUEST_CARD_EVENTS,
  }
}

export const RECEIVE_CARD_EVENTS = 'RECEIVE_CARD_EVENTS'
function receiveCardEvents(json) {
  return {
    type: RECEIVE_CARD_EVENTS,
    card_events: json.card_events,
    receivedAt: Date.now()
  }
}

export function getCardEvents() {
  return (dispatch) => {
    dispatch(requestCardEvents())
    return fetch('/card_events.json')
      .then(response => response.json())
      .then(json => dispatch(receiveCardEvents(json)))
  }
}