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

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(secondsLeft).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export const validateTime = (input) => {
  let formattedTime = input.replace(/[^0-9]/g, ""); // Loại bỏ tất cả các ký tự không phải số
  if (formattedTime.length > 2) {
    // Thêm dấu ":" sau 2 số đầu tiên
    formattedTime = formattedTime.slice(0, 2) + ":" + formattedTime.slice(2);
  }
  // Giới hạn độ dài chuỗi giờ:phút thành 5 ký tự
  formattedTime = formattedTime.slice(0, 5);
  return formattedTime;
};
