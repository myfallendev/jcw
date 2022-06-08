let prev = '';

const validateAmount = function(e, accuracy = "8") {
    if (e.target.value === '') {
        prev = '';
        return false;
    }
    if (e.target.value === '00') {
        e.target.value = '0.0';
        return false;
    }
    // let pattern = /(?=.*\d)^\$?(([0-9]\d{0,8}([,\\.]\d{0,8})*)|0)?(\.\d{1,2})?$/;
    let pattern = new RegExp("(?=.*\\d)^\\$?(([0-9]\\d{0,8}([,\\.]\\d{0," + accuracy + "})*)|0)?(\\.\\d{1,2})?$");

    e.target.value = e.target.value.replace(/[,]/g, '.');
    e.target.value = e.target.value.replace(/^0+\B/g, '');

    e.target.value = (e.target.value.length === 1 && e.target.value === '.') ? '0.' : e.target.value;
    if (e.target.value.length) {
        if (pattern.test(e.target.value) && e.target.value.split('.').length <= 2) {
            prev = e.target.value;
        } else {
            e.target.value = prev;
        }
    }
    return false;
};

export default validateAmount;