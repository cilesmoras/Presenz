import dayjs from "dayjs";
import moment from "moment";
import { diff } from "./getTimeDiff";
import { decimalToMins } from "./timeToDec";

const timeInValue = 0;
const timeOutValue = 1;

export const getLogsOfDay = (logs, date) => {
  let newLogs = logs.filter((item) => {
    return (
      moment(item.log_time).format("YYYY-MM-DD") ===
      moment(date).format("YYYY-MM-DD")
    );
  });

  const getLogs = (punchType, timeStart, timeEnd) => {
    let logsCopy = newLogs.filter((el) => {
      return (
        el.punch_type === punchType &&
        moment(el.log_time).format("HH:mm") >= timeStart &&
        moment(el.log_time).format("HH:mm") <= timeEnd
      );
    });

    if (logsCopy.length === 0) return "";
    return new Date(Math.max(...logsCopy.map((m) => new Date(m.log_time))));
  };

  const undertimeOfDay = () => {
    let timeCredit = 0;
    let underTime = 0;
    let InMrng = Number(dayjs(morningIn).format("HHmm"));
    let OutMrng = Number(dayjs(morningOut).format("HHmm"));
    let InAftrnn = Number(dayjs(afternoonIn).format("HHmm"));
    let OutAftrnn = Number(dayjs(afternoonOut).format("HHmm"));

    if (InMrng >= 700 && InMrng < 800) {
      let diffs = diff(dayjs(morningIn).format("HH:mm"), "8:00");
      timeCredit = timeCredit + diffs;
    }

    if (InMrng <= 700) {
      timeCredit = timeCredit + 1;
    }
    if (InMrng >= 800) {
      let diffs = diff("08:00", dayjs(morningIn).format("HH:mm"));
      underTime = underTime + diffs;
    }

    if (OutMrng <= 1200) {
      let diffs = diff(dayjs(morningOut).format("HH:mm"), "12:00");
      underTime = underTime + diffs;
    }

    if (InAftrnn >= 1300) {
      let diffs = diff(dayjs(afternoonIn).format("HH:mm"), "13:00");
      underTime = underTime + diffs;
    }

    if (OutAftrnn <= 1700) {
      let diffs = diff(dayjs(afternoonOut).format("HH:mm"), "17:00");
      underTime = underTime + diffs;
    }

    let returnVal = underTime - timeCredit;
    // if (returnVal < 0) returnVal = 0;
    return returnVal;
  };

  const morningIn = getLogs(timeInValue, "06:00", "12:00");
  const morningOut = getLogs(timeOutValue, "09:00", "13:00");
  const afternoonIn = getLogs(timeInValue, "12:00", "18:00");
  const afternoonOut = getLogs(timeOutValue, "13:00", "23:59");

  const computeUndertime = () => {
    const oneHour = "01:00";
    const morningIn24HrFormat = moment(morningIn).format("HH:mm");
    const afternoonOut24HrFormat = moment(afternoonOut).format("HH:mm");

    const renderedTime = decimalToMins(
      moment(`${date} ${afternoonOut24HrFormat}:00`).diff(
        moment(`${date} ${morningIn24HrFormat}:00`),
        "hour",
        "minute"
      )
    );

    // const splitTime = totalRenderTime.split(":");
    // const renderedTimeLess1Hour = parseFloat(splitTime[0]) - Number(1);
    // console.log(renderedTimeLess1Hour);

    return renderedTime;
    // return moment(`${date} ${totalRenderTime}`).subtract(
    //   moment(`${date} ${oneHour}`)
    // );
  };

  return [
    moment(morningIn).format("hh:mm"),
    moment(morningOut).format("hh:mm"),
    moment(afternoonIn).format("hh:mm"),
    moment(afternoonOut).format("hh:mm"),
    computeUndertime(),
  ];
};
