import { timeToDecimal } from "./timeToDec";

export const diff = (start, end) => {
  start = start?.split(":");
  end = end?.split(":");
  if (Number(start[0]) > Number(end[0])) {
    var num = Number(start[0]);
    var countTo = Number(end[0]);
    var count = 0;
    for (var i = 1; num != countTo; ) {
      num = num + i;
      if (num > 24) {
        num = 0;
      }
      count++;
    }
    var hours = count - 1;
    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
    if (startDate.getMinutes() > endDate.getMinutes()) {
      var hours = count - 2;
      var diff = 60 - (startDate.getMinutes() - endDate.getMinutes());
    } else {
      var diff = endDate.getMinutes() - startDate.getMinutes();
    }
    var minutes = diff;
  } else {
    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);
  }

  var returnValue =
    (hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes;

  //decemal value
  return timeToDecimal(returnValue);

  //times string
  // return returnValue;
};
