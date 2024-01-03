"use client";
import { useState, useEffect, useRef, useReducer } from "react";
import { format } from "path";
import { useDispatch, useSelector } from "react-redux";
import {
  setFreeTime,
  setBreakTime,
  setPomodoro,
} from "../../lib/redux/timeSlice";
export default function Time() {
  const dispatch = useDispatch();
  const { freeTime, breakTime, pomodoro } = useSelector((state) => state.time);

  // Reminder: useRef will NOT cause re-render -> combine with useState to rerender when value changes
  const prevFreeTime = useRef();
  const prevBreakTime = useRef();

  // gọi hàm initTE() để khởi tạo Timepicker
  useEffect(() => {
    const _initTE = async () => {
      const use = (await import("tw-elements")).initTE;
      const { Timepicker } = await import("tw-elements");
      use({ Timepicker });
    };
    _initTE();
  }, []);
  useEffect(() => {
    prevFreeTime.current = freeTime;
    prevBreakTime.current = breakTime;
  }, [freeTime, breakTime]);

  const handleFreeTimeChange = (event) => {
    dispatch(setFreeTime(formatTime(event.target.value)));
  };

  const handleBreakTimeChange = (event) => {
    dispatch(setBreakTime(formatTime(event.target.value)));
  };
  const formatTime = (input) => {
    let formattedTime = input.replace(/[^0-9]/g, ""); // Loại bỏ tất cả các ký tự không phải số
    if (formattedTime.length > 2) {
      // Thêm dấu ":" sau 2 số đầu tiên
      formattedTime = formattedTime.slice(0, 2) + ":" + formattedTime.slice(2);
    } else if (formattedTime.length > 5) {
      // Thêm dấu ":" sau 2 số tiếp theo
      formattedTime = formattedTime.slice(0, 5) + ":" + formattedTime.slice(5);
    }
    // Giới hạn độ dài chuỗi giờ:phút thành 5 ký tự
    formattedTime = formattedTime.slice(0, 7);
    return formattedTime;
  };
  return (
    <>
      <section className=" flex flex-col gap-5 sm:flex-row justify-between m-auto my-5">
        <div className="bg-neutral-100 m-auto text-center text-2xl font-bold rounded-lg">
          <h2>Your Freetime</h2>
          <div className="relative">
            <input
              type="text"
              value={freeTime}
              className="peer 
          min-h-[auto] w-full 
          rounded border-0 
          bg-transparent 
          px-3 py-[0.32rem] leading-[1.6]
          outline-none transition-all duration-200 ease-linear 
          focus:placeholder:opacity-100 
          data-[te-input-state-active]:placeholder:opacity-100"
              data-te-toggle="timepicker-just-input"
              id="timepickerFreetime"
              onChange={handleFreeTimeChange}
              maxLength={5}
            />
            <label
              htmlFor="timepickerFreetime"
              className={`absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out ${
                freeTime !== ""
                  ? "-translate-y-[0.9rem] scale-[0.8] text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8]"
                  : ""
              }`}
            >
              Type a time
            </label>
          </div>
        </div>
        {/* <div className="bg-neutral-100 m-auto text-center text-2xl font-bold rounded-lg">
          <h2>Your Breaktime</h2>
          <div className="relative">
            <input
              type="text"
              value={breakTime}
              className="peer 
          min-h-[auto] w-full 
          rounded border-0 
          bg-transparent 
          px-3 py-[0.32rem] leading-[1.6]
          outline-none transition-all duration-200 ease-linear 
          focus:placeholder:opacity-100 
          data-[te-input-state-active]:placeholder:opacity-100"
              data-te-toggle="timepicker-just-input"
              id="timepickerBreaktime"
              onChange={handleBreakTimeChange}
              maxLength={5}
            />
            <label
              htmlFor="timepickerBreaktime"
              className={`absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out ${
                breakTime !== ""
                  ? "-translate-y-[0.9rem] scale-[0.8] text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8]"
                  : ""
              }`}
            >
              Type a time
            </label>
          </div>
        </div> */}
        {/* <button
          onClick={() => {
            dispatch(setPomodoro(!pomodoro));
          }}
          className={
            "w-[180px] font-bold text-2xl rounded-lg p-5 m-auto transition-all duration-200 ease-linear text-neutral-100 " +
            (pomodoro
              ? "bg-orange-500 hover:bg-white hover:text-black"
              : "bg-primary hover:bg-white hover:text-black")
          }
          title={
            pomodoro
              ? "Take a 5 min break after 25 min working!"
              : "Only start breaktime when each Todenu is done!"
          }
        >
          {pomodoro ? "Pomodoro" : "Focus"}
        </button> */}
      </section>
    </>
  );
}
