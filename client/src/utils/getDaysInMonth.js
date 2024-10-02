export function getDaysInMonth(year, month, range) {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  if (range === 1) return days;
  if (range === 2) return days.slice(0, 15);
  if (range === 3) return days.slice(15, 31);
}
