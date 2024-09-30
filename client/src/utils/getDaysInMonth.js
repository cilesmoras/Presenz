export function getDaysInMonth(year, month) {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  // const numberOfDaysInMonth = await numberOfDaysInMonth(year, month);
  // for (let index = 1; index <= numberOfDaysInMonth; index++) {
  //   days.push(new Date(date));
  //   date.setUTCDate(date.getUTCDate() + 1);
  // }
  return days;
}
