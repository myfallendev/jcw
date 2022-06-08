const initialState = {
  providers: [],
  fetchingProvider: false,
  operator: {},
  fetchingOperator: false,
  currentProvider: {},
  fetchingCurrentProvider: false,
  operatorFields: [],
  fetchingOperatorFields: false
}

export default function providers(state = initialState, action) {

  switch (action.type) {
    case 'REQUEST_PROVIDERS':
      return { ...state, fetching: true }

    case 'RECEIVE_PROVIDERS':
      return { ...state, providers: action.providers, fetching: false }

    case 'REQUEST_OPERATOR':
      return { ...state, fetchingOperator: true }

    case 'RECEIVE_OPERATOR':
      return { ...state, fetchingOperator: false, operator: action.operator }

    case 'REQUEST_PROVIDER_BY_ID':
      return { ...state, fetchingCurrentProvider: true }

    case 'RECEIVE_PROVIDER_BY_ID':
      return { ...state, currentProvider: action.provider, fetchingCurrentProvider: false }

    case 'REQUEST_OPERATOR_FILEDS':
      return { ...state, fetchingOperatorFields: true }

    case 'RECEIVE_OPERATOR_FILEDS':
      return { ...state, fetchingOperatorFields: false, operatorFields: action.operatorFields }

    case 'REMOVE_OPERATOR':
      return { ...state, operator:{}}

    default:
      return state;
  }

}