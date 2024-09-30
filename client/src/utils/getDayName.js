export function getDayName(dayIndex, abbreviatedDayName) {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return abbreviatedDayName
    ? weekdays[dayIndex].slice(0, 3)
    : weekdays[dayIndex];
}
