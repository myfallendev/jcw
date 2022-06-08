export default function setFocus(field) {
  let ctrl = field;
  let start = ctrl.value.length;
  let end = start;

  if (ctrl.setSelectionRange) {
    ctrl.focus();
    ctrl.setSelectionRange(start, end);

  } else if (ctrl.createTextRange) {
    let range = ctrl.createTextRange();

    range.collapse(true);
    range.moveEnd('character', end);
    range.moveStart('character', start);
    range.select();
  }
}
