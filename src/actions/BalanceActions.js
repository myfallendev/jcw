import axiosWrapper from '../utils/axiosWrapper';

export const REQUEST_BALANCES = 'REQUEST_BALANCES'
export const RECEIVE_BALANCES = 'RECEIVE_BALANCES'

function requestBalances(){
  return{
    type: REQUEST_BALANCES
  }
}

function receiveBalances(json){
  return{
    type: RECEIVE_BALANCES,
    balances: json
  }
}

export function getBalances() {
  return (dispatch) => {
    dispatch(requestBalances())
    return axiosWrapper('/api/Balance?page=1&itemsPerPage=100',
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
      .then(response => dispatch(receiveBalances(response.data)));
  }
}