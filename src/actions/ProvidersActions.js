export const REQUEST_PROVIDERS = 'REQUEST_PROVIDERS'
export const RECEIVE_PROVIDERS = 'RECEIVE_PROVIDERS'
export const REQUEST_OPERATOR = 'REQUEST_OPERATOR'
export const RECEIVE_OPERATOR = 'RECEIVE_OPERATOR'
export const REQUEST_PROVIDER_BY_ID = 'REQUEST_PROVIDER_BY_ID'
export const RECEIVE_PROVIDER_BY_ID = 'RECEIVE_PROVIDER_BY_ID'
export const REQUEST_OPERATOR_FIELDS = 'REQUEST_OPERATOR_FIELDS'
export const RECEIVE_OPERATOR_FIELDS = 'RECEIVE_OPERATOR_FIELDS'


function requestOperator(){
  return {
    type: REQUEST_OPERATOR,
  }
}

function receiveOperator(json){
  return {
    type: RECEIVE_OPERATOR,
    operator: json
  }
}

function getOperatorById(id){
  return (dispatch) => {
    dispatch(requestOperator())
    return fetch(window.jcApi + '/api/Operator/' + id,
      {credentials: 'same-origin'}
    )
      .then(response => response.json())
      .then(json => dispatch(receiveOperator(json)))
  }
}

function requestOperatorFields(){
  return {
    type: REQUEST_OPERATOR_FIELDS,
  }
}

function receiveOperatorFields(json){
  return {
    type: RECEIVE_OPERATOR_FIELDS,
    operatorFields: json
  }
}

function getOperatorFields(id){
  return (dispatch) => {
    dispatch(requestOperatorFields())
    return fetch(window.jcApi + '/api/OperatorField/getOperatorFields?operatorId=' + id,
      {credentials: 'same-origin'}
    )
      .then(response => response.json())
      .then(json => dispatch(receiveOperatorFields(json)))
  }
}

function requestProviders() { 
  return {
    type: REQUEST_PROVIDERS,
  }
}

function receiveProviders(json) {
  return {
    type: RECEIVE_PROVIDERS,
    providers: json
  }
}

export function getProviders(paymentTypeId) {
  return (dispatch) => {
    dispatch(requestProviders())
    return fetch(window.jcApi + '/api/Menu/' + paymentTypeId,
      {credentials: 'same-origin'}
    )
      .then(response => response.json())
      .then(json => dispatch(receiveProviders(json)))
  }
}

function requestProviderById() { 
  return {
    type: REQUEST_PROVIDER_BY_ID,
  }
}

function receiveProviderById(json) {
  return {
    type: RECEIVE_PROVIDER_BY_ID,
    provider: json
  }
}

export function getProviderById(providerId) {
  return (dispatch) => {
    dispatch(requestProviderById())
    return fetch(window.jcApi + '/api/Menu/getById?id=' + providerId,
      {credentials: 'same-origin'}
    )
      .then(response => response.json())
      .then(json => {
        dispatch(receiveProviderById(json))
        dispatch(getOperatorById(json.operatorId))
        dispatch(getOperatorFields(json.operatorId))
      })
  }
}

export function removeOperator(){
  return{
    type: 'REMOVE_OPERATOR'
  }
}