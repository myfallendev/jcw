export const CHANGE_CURRENCY = 'CHANGE_CURRENCY'
export const CHANGE_CREDIT_SUM = 'CHANGE_CREDIT_SUM'
export const CHANGE_CREDIT_PERIOD = 'CHANGE_CREDIT_PERIOD'
export const REQUEST_CALCULATORS = 'REQUEST_CALCULATORS'
export const RECEIVE_CALCULATORS = 'RECEIVE_CALCULATORS'
export const CHANGE_RATE = 'CHANGE_RATE'
export const UPDATE_SELECTED_CALC_LIST = 'UPDATE_SELECTED_CALC_LIST'
export const CHANGE_CREDIT_SUM_FILTER = 'CHANGE_CREDIT_SUM_FILTER'
export const CHANGE_CREDIT_PERIOD_FILTER = 'CHANGE_CREDIT_PERIOD_FILTER'

export function changeCurrency(currency) {
  return {
    type: CHANGE_CURRENCY,
    currency: currency,
    receivedAt: Date.now()
  }
}

export function changeCreditSum(sum) {
  return {
    type: CHANGE_CREDIT_SUM,
    sum: sum,
    receivedAt: Date.now()
  }
}
export function changeCreditPeriod(period) {
	const periodStrValue = period.toString();
	let monthText = "месяцев"

	if ((period < 10 || period > 20) && periodStrValue.slice(-1) === "1")
		monthText = "месяц"

	else if ((period < 10 || period > 20) && (periodStrValue.slice(-1) === "2" || periodStrValue.slice(-1) === "3" || periodStrValue.slice(-1) === "4"))
		monthText = "месяца"

	return {
	    type: CHANGE_CREDIT_PERIOD,
	    period: period,
	    monthText: monthText,
	    receivedAt: Date.now()
	}
}

export function changeRate(rate) {
	return {
	    type: CHANGE_RATE,
	    rate: rate,
	    receivedAt: Date.now()
	}
}

function requestCalculators(){
	return{
		type: REQUEST_CALCULATORS,
	    receivedAt: Date.now()
	}
}

function receiveCalculators(json){
	//eval(json[0].formula)
	for (var calc in json){
		json[calc]['selected'] = true
	}
	return{
		type: RECEIVE_CALCULATORS,
	    calculators: json,
	    receivedAt: Date.now()
	}
}

export function showCalculators(filterParams) {
	return (dispatch) => {
    dispatch(requestCalculators())
    return fetch(window.jcApi + '/api/Calc/getByParams',
      { method: 'POST',
      	credentials: 'same-origin',
      		headers: {
		    	'Accept': 'application/json;',
		    	'Content-Type': 'application/json-patch+json'
			},
			body: JSON.stringify(filterParams)
		}
    )
      .then(response => response.json())
      .then(json => dispatch(receiveCalculators(json)))
  }
}

export function updateSelectedCalcList(calcList) {
	return {
	    type: UPDATE_SELECTED_CALC_LIST,
	    selectedCalculators: calcList,
	    receivedAt: Date.now()
	}
}

export function changeCreditSumFilter (value) {
	return {
	    type: CHANGE_CREDIT_SUM_FILTER,
	    useCreditSum: value,
	    receivedAt: Date.now()
	}
}

export function changeCreditPeriodFilter (value) {
	return {
	    type: CHANGE_CREDIT_PERIOD_FILTER,
	    useCreditPeriod: value,
	    receivedAt: Date.now()
	}
}