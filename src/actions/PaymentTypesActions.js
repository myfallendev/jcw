import axiosWrapper from '../utils/axiosWrapper';
export const REQUEST_PAYMENT_TYPES = 'REQUEST_PAYMENT_TYPES'

function requestPaymentTypes() { 
  return {
    type: REQUEST_PAYMENT_TYPES
  }
}

export const RECEIVE_PAYMENT_TYPES = 'RECEIVE_PAYMENT_TYPES'
function receivePaymentTypes(json) {
  return {
    type: RECEIVE_PAYMENT_TYPES,
    payment_types: json,
    receivedAt: Date.now()
  }
}

export function getPaymentTypes() {
  return (dispatch) => {
    dispatch(requestPaymentTypes())
/*    return fetch(window.jcApi + '/api/Menu?page=1&itemsPerPage=1111',
    {method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }}
    )
    .then(response => response.json())
    .then(json => 
      dispatch(receivePaymentTypes(json)));*/

      return axiosWrapper('/api/Menu?page=1&itemsPerPage=1111',
          {
              method: 'GET',
              withCredentials: true,
              headers: {
                  'Accept': 'application/json;',
                  'Content-Type': 'application/json-patch+json',
                  'Access-Control-Allow-Origin': '*'
              }
          })
      //.then(response => response.json())
          .then(response => dispatch(receivePaymentTypes(response.data)));



  }
}