export default function createContainerFromServerErrorsArray(arr) {
  if (!Array.isArray(arr) || !arr.length) return {};

  let result = {};

  arr.forEach(item => {
    result[item['key']] = item['value'];
  })

  return result;
}
