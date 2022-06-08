export const REQUEST_ACCOUNT_EVENTS = 'REQUEST_ACCOUNT_EVENTS'
function requestAccountEvents() { 
  return {
    type: REQUEST_ACCOUNT_EVENTS,
  }
}

export const RECEIVE_ACCOUNT_EVENTS = 'RECEIVE_ACCOUNT_EVENTS'
function receiveAccountEvents(json) {
  return {
    type: RECEIVE_ACCOUNT_EVENTS,
    account_events: json.account_events,
    receivedAt: Date.now()
  }
}

export function getAccountEvents() {
  return (dispatch) => {
    dispatch(requestAccountEvents())
    return fetch('https://data.egov.kz/datasets/getdata?index=valutalar_bagamdary4&version=v224&page=1&count=5&text=USD&column=id&order=ascending')
      .then(response => response.json())
      .then(json => dispatch(receiveAccountEvents(json)))
  }
}