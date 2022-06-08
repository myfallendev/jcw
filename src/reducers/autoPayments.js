const initialState = {
  autoPayments: [],
  fetchingAutoPayments: false,
  autoPaymentSelected: false,
  fetchingAutoPaymentSelection: false,
  showSuccessPopup: false,
  showErrorPopup: false,
  errors: [],
  autoPaymentToRemove: -1,
  showRemoveAutoPaymentPopup: false,
  showRemoveAutoPaymentSuccessPopup: false,
  autoPaymentParams: []
}

export default function autoPayments(state = initialState, action) {

  switch (action.type) {
    case 'GET_AUTO_PAYMENTS_REQUEST':
      return { ...state, fetchingAutoPayments: true}

    case 'GET_AUTO_PAYMENTS_SUCCESS':
      return { ...state, fetchingAutoPayments: false, autoPayments: action.autoPayments}

    case 'GET_AUTO_PAYMENTS_ERROR':
      return { ...state, fetchingAutoPayments: false, errors: action.errors}

    case 'SELECT_AUTO_PAYMENT_REQUEST':
      return { ...state, fetchingAutoPaymentSelection: true }

    case 'SELECT_AUTO_PAYMENT_SUCCESS':
      return { ...state, fetchingAutoPaymentSelection: false, showSuccessPopup: true }

    case 'SAVE_PARAMS':
      return { ...state, autoPaymentParams: action.params}

    case 'REMOVE_PARAMS':
      return { ...state, autoPaymentParams: []}

    case 'CLOSE_SUCCESS_POPUP':
      return { ...state, showSuccessPopup: false}

    case 'SELECT_AUTO_PAYMENT_ERROR':
      return { ...state, showErrorPopup: true, errors: action.errors}

    case 'CLOSE_ERROR_POPUP':
      return { ...state, showErrorPopup: false, errors: []}

    case 'SHOW_REMOVE_AUTO_PAYMENT_POPUP':
      return { ...state, showRemoveAutoPaymentPopup: true, autoPaymentToRemove: action.autoPaymentToRemove}

    case 'CLOSE_REMOVE_AUTO_PAYMENT_POPUP':
      return { ...state, showRemoveAutoPaymentPopup: false, showRemoveAutoPaymentSuccessPopup:false, autoPaymentToRemove: -1}

    case 'REMOVE_AUTO_PAYMENT_SUCCESS':
      return { ...state, autoPayments: state.autoPayments.filter(autoPayment => autoPayment.id !==  action.autoPaymentToRemove), showRemoveAutoPaymentPopup: false, showRemoveAutoPaymentSuccessPopup: true}

    default:
      return state;
  }

}