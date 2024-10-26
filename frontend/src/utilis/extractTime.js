export const extractTime = (dataString) => {
  const date = new Date(dataString);

  const hour = padZero(date.getHours());
  const minute = padZero(date.getMinutes());
  return `${hour}:${minute}`;
};

const padZero = (Number) => {
  return Number.toString().padStart(2, "0");
};
