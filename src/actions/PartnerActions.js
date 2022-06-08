export const REQUEST_PARTNERS = 'REQUEST_PARTNERS'
function requestPartners() { 
  return {
    type: REQUEST_PARTNERS,
  }
}

export const RECEIVE_PARTNERS = 'RECEIVE_PARTNERS'
function receivePartners(json) {
  return {
    type: RECEIVE_PARTNERS,
    partners: json,
    receivedAt: Date.now()
  }
}

export function getPartners() {
  return (dispatch) => {
    dispatch(requestPartners())
    return fetch(window.jcApi + '/api/Partner?page=1&itemsPerPage=100',
       {credentials: 'same-origin'})
      .then(response => response.json())
      .then(json => dispatch(receivePartners(json)))
  }
}