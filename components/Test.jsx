import { useEffect, useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [time, setTime] = useState("");
  const handleTimeChange = (event) => {
    const input = event.target.value;
    let formattedTime = input.replace(/[^0-9]/g, ""); // Loại bỏ tất cả các ký tự không phải số

    if (formattedTime.length > 2) {
      // Thêm dấu ":" sau 2 số đầu tiên
      formattedTime = formattedTime.slice(0, 2) + ":" + formattedTime.slice(2);
    }

    // Giới hạn độ dài chuỗi giờ:phút thành 5 ký tự
    formattedTime = formattedTime.slice(0, 5);

    // Cập nhật giá trị hiển thị của ô input
    setTime(formattedTime);
  };
  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0 bg-slate-400 m-auto">
      <input
        type="text"
        id="timepicker-just-input"
        value={time}
        onChange={handleTimeChange}
      />
    </div>
  );
}
