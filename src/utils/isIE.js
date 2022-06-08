export default function isIE() {
  return !!(/*@cc_on!@*/false || !!document.documentMode)
}
