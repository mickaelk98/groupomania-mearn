export const dateParser = (date) => {
  const options = {
    weekday: "long",
    day: "numeric",
    year: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  let timestamp;

  if (Number.isNaN(date)) {
    timestamp = Date.parse(date);
  } else {
    timestamp = date;
  }

  const newDate = new Date(timestamp).toLocaleDateString("fr-FR", options);

  return newDate;
};
