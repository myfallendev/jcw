export function copyNodeContentToClipboard(node) {
  let range = document.createRange();
  range.selectNode(node);
  window.getSelection().addRange(range);

  try {
    document.execCommand('copy');
    return true;

  } catch(err) {
    console.log('Unable to copy');
    return false;
  }
}
