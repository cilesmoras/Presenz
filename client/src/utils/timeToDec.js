export const timeToDecimal = (t) => {
  var arr = t?.split(":");
  var dec = parseInt((arr[1] / 6) * 10, 10);

  return parseFloat(parseInt(arr[0], 10) + "." + (dec < 10 ? "0" : "") + dec);
};

export const decimalToMins = (decimalTimeString) => {
  var decimalTime = decimalTimeString;
  decimalTime = decimalTime * 60 * 60;
  var hours = Math.floor(decimalTime / (60 * 60));
  decimalTime = decimalTime - hours * 60 * 60;
  var minutes = Math.floor(decimalTime / 60);
  decimalTime = decimalTime - minutes * 60;
  var seconds = Math.round(decimalTime);
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes;
};
