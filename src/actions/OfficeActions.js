export const REQUEST_OFFICES = 'REQUEST_OFFICES'
export const RECEIVE_OFFICES = 'RECEIVE_OFFICES'

function requestOffices() { 
  return {
    type: REQUEST_OFFICES,
  }
}

function receiveOffices(json) {
  return {
    type: RECEIVE_OFFICES,
    offices: json,
    receivedAt: Date.now()
  }
}

export function getOffices() {
  return (dispatch) => {
    dispatch(requestOffices())
    return fetch(window.jcApi + '/api/Office?page=1&itemsperpage=100',
      {credentials: 'same-origin'})
      .then(response => response.json())
      .then(json => dispatch(receiveOffices(json)))
  }
}