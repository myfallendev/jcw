import axiosWrapper from '../utils/axiosWrapper'
export const SELECT_AUTO_PAYMENT_REQUEST = 'SELECT_AUTO_PAYMENT_REQUEST'
export const SELECT_AUTO_PAYMENT_SUCCESS = 'SELECT_AUTO_PAYMENT_SUCCESS'
export const GET_AUTO_PAYMENTS_REQUEST = 'GET_AUTO_PAYMENTS_REQUEST'
export const GET_AUTO_PAYMENTS_SUCCESS = 'GET_AUTO_PAYMENTS_SUCCESS'
export const CLOSE_SUCCESS_POPUP = 'CLOSE_SUCCESS_POPUP'
export const CLOSE_ERROR_POPUP = 'CLOSE_ERROR_POPUP'
export const SELECT_AUTO_PAYMENT_ERROR = 'SELECT_AUTO_PAYMENT_ERROR'
export const REMOVE_AUTO_PAYMENT_REQUEST = 'REMOVE_AUTO_PAYMENT_REQUEST'
export const REMOVE_AUTO_PAYMENT_SUCCESS = 'REMOVE_AUTO_PAYMENT_SUCCESS'
export const GET_AUTO_PAYMENTS_ERROR = 'GET_AUTO_PAYMENTS_ERROR'
export const SHOW_REMOVE_AUTO_PAYMENT_POPUP = 'SHOW_REMOVE_AUTO_PAYMENT_POPUP'
export const CLOSE_REMOVE_AUTO_PAYMENT_POPUP = 'CLOSE_REMOVE_AUTO_PAYMENT_POPUP'

function getAutoPaymentsRequest() {
  return {
      type: GET_AUTO_PAYMENTS_REQUEST,
    }
}

function getAutoPaymentsSuccess(json) {
  for (var autoPayment in json){
    json[autoPayment]['params'] = JSON.parse("[" + json[autoPayment]['params'] + "]")
  }
  return {
      type: GET_AUTO_PAYMENTS_SUCCESS,
      autoPayments: json
    }
}

// function getAutoPaymentsError(json){
//   return{
//     type: GET_AUTO_PAYMENTS_ERROR,
//     errors: json.errors
//   }
// }

export function getAutoPayments() {
  return (dispatch) => {
    dispatch(getAutoPaymentsRequest());
    dispatch(getAutoPaymentsSuccess([]))
    // return axiosWrapper('/api/PaymentTemplate?page=1&itemsPerPage=100',
    // {method: 'GET',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   }}
    // )
    // //.then(response => response.json())
    // .then(response => {
    //   if (response.data.length === 1 && response.data[0].errorCode === 1){
    //     dispatch(getAutoPaymentsError(response.data))
    //   } else {
    //     dispatch(getAutoPaymentsSuccess(response.data))
    //   }
    // })
  }
}

function selectAutoPaymentRequest() {
  return {
      type: SELECT_AUTO_PAYMENT_REQUEST,
  }
}

function selectAutoPaymentSuccess() {
  return {
      type: SELECT_AUTO_PAYMENT_SUCCESS
  }
}

function selectAutoPaymentError(json){
  return{
    type: SELECT_AUTO_PAYMENT_ERROR,
    errors: json.errors
  }
}

export function selectAutoPayment(id, params, menuId){
  return (dispatch) => {
    dispatch(selectAutoPaymentRequest())
    return axiosWrapper('/api/PaymentTemplate',
    {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({'operatorId': id, 'params': params, 'menuId': menuId})
    })
    //.then(response => response.json())
    .then(response => {
      if (response.data.errorCode === 0){
        dispatch(selectAutoPaymentSuccess(response.data))
        dispatch(getAutoPayments())
      } else {
        dispatch(selectAutoPaymentError(response.data))
      }
    })
  }
}

export function saveParams(params){
  return{
    type: 'SAVE_PARAMS',
    params: params
  }
}

export function removeParams(){
  return{
    type: 'REMOVE_PARAMS'
  }
}

function removeAutoPaymentRequest(){
  return{
    type: REMOVE_AUTO_PAYMENT_REQUEST
  }
}

function removeAutoPaymentSuccess(id){
  return{
    type: REMOVE_AUTO_PAYMENT_SUCCESS,
    autoPaymentToRemove: id
  }
}

export function removeAutoPayment(id){
  return (dispatch) => {
    dispatch(removeAutoPaymentRequest())
    return axiosWrapper('/api/PaymentTemplate/' + id,
      {
        method: 'DELETE',
      })
      //.then(response => response.json())
      .then(response => dispatch(removeAutoPaymentSuccess(id)))
  }
}

export function closeSuccessPopup(){
  return {
      type: CLOSE_SUCCESS_POPUP
  }
}

export function closeErrorPopup(){
  return {
      type: CLOSE_ERROR_POPUP
  }
}


export function showRemoveAutoPaymentPopup(id){
  return{
    type: SHOW_REMOVE_AUTO_PAYMENT_POPUP,
    autoPaymentToRemove: id
  }
}

export function closeRemoveAutoPaymentPopup(){
  return{
    type: CLOSE_REMOVE_AUTO_PAYMENT_POPUP
  }
}