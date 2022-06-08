import axiosWrapper from '../utils/axiosWrapper';

function requestShortMessages() {
  return {
    type: 'REQUEST_SHORT_MESSAGES',
  }
}

function receiveShortMessages(json) {
  return {
    type: 'RECEIVE_SHORT_MESSAGES',
    messages: json,
    receivedAt: Date.now()
  }
}

export function getShortMessages(type) {
  return (dispatch) => {
    dispatch(requestShortMessages())
    return axiosWrapper('/api/ShortMessage?type=' + type + '&page=1&itemsperpage=100',
      {credentials: 'same-origin'})
      //.then(response => response.json())
      .then(response => dispatch(receiveShortMessages(response.data)))
  }
}

export function removeShortMessages(){
  return {
    type: 'REMOVE_SHORT_MESSAGES',
  }
}