export const getCurrentDay = () => {
  const days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  return days[new Date().getDay()];
};