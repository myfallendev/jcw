const FETCHING_TIMEOUT = 10000;

const fetchTimeoutWrapper = function(url, params) {
  return new Promise(function(resolve, reject) {
    const timeout = setTimeout(function () {
      reject(new Error('Request timed out'));
    }, FETCHING_TIMEOUT);

    fetch(window.jcApi + url, params)
    .then(response => {
      clearTimeout(timeout);
      resolve(response);
    })
    .catch(e => reject(e));
  })
}

export default fetchTimeoutWrapper;
