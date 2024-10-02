export const addTime = (_start, _end) => {
  var startTime = _start.split(":");
  var startHour = Number(startTime[0]);
  var startMin = Number(startTime[1]);
  var endTime = _end.split(":");
  var endHour = Number(endTime[0]);
  var endMin = Number(endTime[1]);

  var totalHour = startHour + endHour;
  var totalMin = startMin + endMin;
  if (totalMin >= 60) {
    totalMin = totalMin - 60;
    totalHour = totalHour + 1;
  }

  if (totalHour < 10 && totalHour >= 0) totalHour = "0" + totalHour;
  if (totalMin < 10 && totalMin >= 0) totalMin = "0" + totalMin;

  return totalHour + ":" + totalMin;
};

export const subtractTime = (_start, _end) => {
  var startTime = _start.split(":");
  var startHour = Number(startTime[0]);
  var startMin = Number(startTime[1]);
  var endTime = _end.split(":");
  var endHour = Number(endTime[0]);
  var endMin = Number(endTime[1]);

  if (startMin < endMin) {
    startHour = startHour - 1;
    startMin = startMin + 60;
  }
  var totalHour = startHour - endHour;
  var totalMin = startMin - endMin;

  if (totalHour < 10 && totalHour >= 0) totalHour = "0" + totalHour;
  if (totalMin < 10 && totalMin >= 0) totalMin = "0" + totalMin;
  return totalHour + ":" + totalMin;
};

export const containsNumbers = (str) => {
  return /\d/.test(str);
};
