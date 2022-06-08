const currentSelectedCalculators = localStorage.getItem('selectedCalculators')
const currentCurrency = localStorage.getItem('currency')
const initialState = {
  calculators:[],
  selectedCalculators: (currentSelectedCalculators !== undefined && currentSelectedCalculators !== "undefined" && currentSelectedCalculators) ? JSON.parse(currentSelectedCalculators) : [],
  fetching: false,
  currency: (currentCurrency !== undefined && currentCurrency !== "undefined" && currentCurrency) ? currentCurrency : 643,
  creditSum: 250000,
  creditPeriod: 6,
  rate: 0,
  useCreditSum : true,
  useCreditPeriod: true,
  monthText: "месяцев"
}

export default function calculator(state = initialState, action) {

  switch (action.type) {
    case 'CHANGE_CURRENCY':
      localStorage.setItem('currency', JSON.stringify(action.currency))
      return { ...state, currency: action.currency }

    case 'CHANGE_CREDIT_SUM':
      return { ...state, creditSum: action.sum }

    case 'CHANGE_RATE':
      return { ...state, rate: action.rate }

    case 'CHANGE_CREDIT_PERIOD':
      return { ...state, creditPeriod: action.period, monthText: action.monthText }

    case 'REQUEST_CALCULATORS':
      return{ ...state, fetching: true }

    case 'RECEIVE_CALCULATORS':
      localStorage.setItem('selectedCalculators', JSON.stringify(action.calculators))
      return{ ...state, calculators: action.calculators, selectedCalculators: action.calculators, fetching: false }

    case 'UPDATE_SELECTED_CALC_LIST':
      localStorage.setItem('selectedCalculators', JSON.stringify(action.selectedCalculators))
      return{ ...state, selectedCalculators: action.selectedCalculators }  

    case 'CHANGE_CREDIT_PERIOD_FILTER':
      return{ ...state, useCreditPeriod: action.useCreditPeriod }  

    case 'CHANGE_CREDIT_SUM_FILTER':
      return{ ...state, useCreditSum: action.useCreditSum }  

    default:
      return state;
  }

}