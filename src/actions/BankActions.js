export const REQUEST_BANKS = 'REQUEST_BANKS'
function requestBanks() { 
  return {
    type: REQUEST_BANKS,
  }
}

export const RECEIVE_BANKS = 'RECEIVE_BANKS'
function receiveBanks(json) {
  return {
    type: RECEIVE_BANKS,
    banks: json,
    receivedAt: Date.now()
  }
}

export function getBanks() {
  return (dispatch) => {
    dispatch(requestBanks())
    return fetch(window.jcApi + '/api/Bank?page=1&itemsPerPage=100',
       {credentials: 'same-origin'})
      .then(response => response.json())
      .then(json => dispatch(receiveBanks(json)))
  }
}