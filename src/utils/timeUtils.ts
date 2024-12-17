/**
 * Formats a time as HH:MM
 * @param {number} hour - The hour of the day (0-23)
 * @param {number} minute - The minute of the hour (0-59)
 * @returns {string} The formatted time as HH:MM
 */
export const formatTime = (hour: number, minute: number): string => {
  const h = hour < 10 ? `0${hour}` : `${hour}`;
  const m = minute < 10 ? `0${minute}` : `${minute}`;

  return `${h}:${m}`;
};
