export function getEventTime(event_date){
    var msec =  event_date.match(/Date\(([^\]]+)-/)[1];
    var date = new Date();
    date.setTime(msec);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes

}

export function parseDate(event_date, new_date){
    var today = new Date();
    var msec =  event_date.match(/Date\(([^\]]+)-/)[1];
    var current_date = new Date();
    current_date.setTime(msec);
    var year = current_date.getFullYear();
    var month = current_date.getMonth();
    var date = current_date.getDate();
    if (new_date !== undefined  && year ===  new_date.getFullYear() && month ===  new_date.getMonth() && date ===  new_date.getDate()){
      return false
    }
    if (year ===  today.getFullYear() && month ===  today.getMonth() && date ===  today.getDate()){
      return {'current_date': today, 'result_string': 'Today'};
    }
    month = month < 10 ? '0' + month : month;
    date = date < 10 ? '0' + date : date;
    return {'current_date': current_date, 'result_string': year + '-' + month + '-' + date}
}