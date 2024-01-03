export const getSeconds = (time) => {
  const [hours, minutes] = time.split(":");
  return parseInt(hours, 10) * 60 * 60 + parseInt(minutes, 10) * 60;
};
export const formatTime = (time) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${formatHours(hours)} ${formatMinutes(minutes)}`;
};
const formatHours = (hours) => {
  if (hours === 0) return "";
  return hours < 2 ? `${hours} hour` : `${hours} hours`;
};
const formatMinutes = (minutes) => {
  if (minutes === 0) return "";
  return minutes < 2 ? `${minutes} minute` : `${minutes} minutes`;
};
export const formatSeconds = (seconds) => {
  const hours = Math.floor(seconds / 60 / 60);
  const minutes = Math.floor((seconds / 60) % 60);
  const secondsLeft = seconds % 60;
  return `${parseInt(hours, 10)}:${parseInt(minutes, 10)}:${parseInt(
    secondsLeft,
    10
  )}`;
};
