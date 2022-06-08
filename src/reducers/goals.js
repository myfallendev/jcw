const initialState = {
  goals: [],
  showGoalPopup: false,
  accountListOpened: false,
  currentAccount: {},
  goalCreationComplete: false,
  fetchingGoalCreation: false,
  fetchingGoals: false,
  showError: false
}

export default function goals(state = initialState, action) {

  switch (action.type) {
    case 'OPEN_GOAL_POPUP':
      return { ...state, showGoalPopup: true }

    case 'CLOSE_GOAL_POPUP':
      return { ...state, showGoalPopup: false, goalCreationComplete: false, currentAccount: {}}

    case 'CHANGE_GOAL_ACCOUNT_LIST_STATUS':
      return { ...state, accountListOpened: action.accountListOpened }

    case 'CHANGE_GOAL_CURRENT_ACCOUNT':
      return { ...state, currentAccount: action.account }

    case 'REQUEST_GOAL_CREATION':
      return { ...state, fetchingGoalCreation: true }

    case 'COMPLETE_GOAL_CREATION':
      return { ...state, fetchingGoalCreation: false, goalCreationComplete: true, showError: false }

    case 'REQUEST_GOALS':
      return { ...state, fetchingGoals: true }

    case 'RECEIVE_GOALS':
      return { ...state, fetchingGoals: false, goals: action.goals }

    case 'GOAL_CREATION_ERROR':
      return { ...state, showError: true }

    case 'CLEAR_GOAL_ERRORS':
      return { ...state, showError: false }
    default:
      return state;
  }

}