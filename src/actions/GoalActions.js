export const OPEN_GOAL_POPUP = 'OPEN_GOAL_POPUP'
export const CLOSE_GOAL_POPUP = 'CLOSE_GOAL_POPUP'
export const CHANGE_GOAL_ACCOUNT_LIST_STATUS = 'CHANGE_GOAL_ACCOUNT_LIST_STATUS'
export const CHANGE_GOAL_CURRENT_ACCOUNT = 'CHANGE_GOAL_CURRENT_ACCOUNT'
export const REQUEST_GOAL_CREATION = 'REQUEST_GOAL_CREATION'
export const COMPLETE_GOAL_CREATION = 'COMPLETE_GOAL_CREATION'
export const REQUEST_GOALS = 'REQUEST_GOALS'
export const RECEIVE_GOALS = 'RECEIVE_GOALS'
export const GOAL_CREATION_ERROR = 'GOAL_CREATION_ERROR'
export const CLEAR_GOAL_ERRORS = 'CLEAR_GOAL_ERRORS'

export function openGoalPopup(){
  return{
    type: OPEN_GOAL_POPUP
  }
}

export function closeGoalPopup(){
  return{
    type: CLOSE_GOAL_POPUP
  }
}

export function changeAccountListStatus(accountListOpened){
  return{
    type: CHANGE_GOAL_ACCOUNT_LIST_STATUS,
    accountListOpened: accountListOpened
  }
}

export function changeCurrentAccount(account){
  return{
    type: CHANGE_GOAL_CURRENT_ACCOUNT,
    account: account
  }
}

function requestGoalCreation() { 
  return {
    type: REQUEST_GOAL_CREATION
  }
}

function completeGoalCreation(json) {
  return {
    type: COMPLETE_GOAL_CREATION
  }
}

function goalCreationError(){
  return{
    type: GOAL_CREATION_ERROR
  }
}

export function createGoal(name, sum, accountId) {
  return (dispatch) => {
    dispatch(requestGoalCreation())
    return fetch(window.jcApi + '/api/Goal',
      { method: 'POST',
        credentials: 'same-origin',
          headers: {
          'Accept': 'application/json;',
          'Content-Type': 'application/json-patch+json'
        },
        body: JSON.stringify({'name': name, 'endDate': new Date(), 'amount': sum, 'accountId': accountId})
      })
      .then(response => response.json())
      .then(json => {
        if (json.errorCode === 0){ 
          dispatch(completeGoalCreation(json))
        } else {
          dispatch(goalCreationError(json))
        }
      })
  }
}

function requestGoals(){
  return{
    type: REQUEST_GOALS
  }
}

function receiveGoals(json){
  return{
    type: RECEIVE_GOALS,
    goals: json
  }
}

export function getGoals() {
  return (dispatch) => {
    dispatch(requestGoals())
    return fetch(window.jcApi + '/api/Goal?page=1&itemsPerPage=100',
      {
        credentials: 'same-origin',
      })
      .then(response => response.json())
      .then(json => dispatch(receiveGoals(json)))
  }
}

export function clearGoalErrors(){
  return{
    type: CLEAR_GOAL_ERRORS
  }
}