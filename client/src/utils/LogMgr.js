import dayjs from "dayjs";
import moment from "moment";
import { addTime, subtractTime } from "./mathTime";

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

  let morningIn = getLogs(timeInValue, "06:00", "12:00");
  let morningOut = getLogs(timeOutValue, "09:00", "13:00");
  let afternoonIn = getLogs(timeInValue, "12:00", "18:00");
  let afternoonOut = getLogs(timeOutValue, "13:00", "23:59");

  let undertime = "00:00";
  let renderedTime = "00:00";

  let InMrng = Number(dayjs(morningIn).format("HHmm"));
  let OutMrng = Number(dayjs(morningOut).format("HHmm"));
  let InAftrnn = Number(dayjs(afternoonIn).format("HHmm"));
  let OutAftrnn = Number(dayjs(afternoonOut).format("HHmm"));

  const morningInAdjust = (morningIn, condition, setHour) => {
    if (InMrng < condition) {
      return moment(morningIn).set({ h: setHour, m: 0 });
    } else {
      return morningIn;
    }
  };

  const morningOutAdjust = (morningOut) => {
    if (OutMrng > 1200) {
      var adjustTime = moment(morningOut).set({ h: 12, m: 0 });
      return adjustTime;
    } else {
      return morningOut;
    }
  };

  const afternoonInAdjust = (afternoonIn) => {
    if (InAftrnn < 1300) {
      var adjustTime = moment(afternoonIn).set({ h: 13, m: 0 });
      return adjustTime;
    } else {
      return afternoonIn;
    }
  };

  const afternoonOutAdjust = (afternoonOut, operator, setHour) => {
    if (OutAftrnn > operator && OutAftrnn < 2359) {
      var afternoonOutAdjust = moment(afternoonOut).set({ h: setHour, m: 0 });
      return afternoonOutAdjust;
    } else {
      return afternoonOut;
    }
  };

  //complete logs
  if (
    morningIn.length != 0 &&
    morningOut.length != 0 &&
    afternoonIn.length != 0 &&
    afternoonOut.length != 0
  ) {
    if (OutMrng < 1200) {
      let timeDiff = subtractTime("12:00", moment(morningOut).format("HH:mm"));
      undertime = addTime(undertime, timeDiff);
    }
    if (InAftrnn > 1300) {
      let timeDiff = subtractTime(moment(afternoonIn).format("HH:mm"), "13:00");
      undertime = addTime(undertime, timeDiff);
    }
    let time = subtractTime(
      moment(afternoonOutAdjust(afternoonOut, 1800, 18)).format("HH:mm"),
      moment(morningInAdjust(morningIn, 700, 7)).format("HH:mm")
    );
    let totalTime = subtractTime(time, "1:00");
    let numb = Number(totalTime.match(/\d/g).join(""));
    if (numb > 800) {
      renderedTime = "08:00";
    } else {
      renderedTime = totalTime;
    }
  }

  //morning only
  if (
    morningIn.length != 0 &&
    morningOut.length != 0 &&
    (afternoonIn.length == 0 || afternoonOut.length == 0)
  ) {
    let a = moment(morningOutAdjust(morningOut)).format("HH:mm");
    let b = moment(morningInAdjust(morningIn, 800, 8)).format("HH:mm");
    renderedTime = subtractTime(a, b);
  }
  //afternoon only
  if (
    afternoonIn.length != 0 &&
    afternoonOut.length != 0 &&
    (morningIn.length == 0 || morningOut.length == 0)
  ) {
    let a = moment(afternoonOutAdjust(afternoonOut, 1700, 17)).format("HH:mm");
    let b = moment(afternoonInAdjust(afternoonIn)).format("HH:mm");
    renderedTime = subtractTime(a, b);
  }

  let totalUndertime = subtractTime("8:00", renderedTime);
  totalUndertime = addTime(totalUndertime, undertime);
  let totalHoursWork = subtractTime(renderedTime, undertime);
  return [
    morningIn ? moment(morningIn).format("hh:mm") : "",
    morningOut ? moment(morningOut).format("hh:mm") : "",
    afternoonIn ? moment(afternoonIn).format("hh:mm") : "",
    afternoonOut ? moment(afternoonOut).format("hh:mm") : "",
    totalUndertime,
    totalHoursWork,
  ];
};
