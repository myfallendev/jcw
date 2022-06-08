export const REQUEST_MONEY_FLOW = 'REQUEST_MONEY_FLOW'
function requestMoneyFlow() { 
  return {
    type: REQUEST_MONEY_FLOW,
  }
}

export const RECEIVE_MONEY_FLOW = 'RECEIVE_MONEY_FLOW'
function receiveMoneyFlow(json) {
  return {
    type: RECEIVE_MONEY_FLOW,
    money_flow: json.money_flow,
    receivedAt: Date.now()
  }
}

export function getMoneyFlow() {
  return (dispatch) => {
    dispatch(requestMoneyFlow())
    return fetch('money_flow.json')
      .then(response => response.json())
      .then(json => dispatch(receiveMoneyFlow(json)))
  }
}