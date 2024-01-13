"use client";
import { useState, useEffect, useRef, useReducer } from "react";
import { format } from "path";
import { useDispatch, useSelector } from "react-redux";
import {
  setFreeTime,
  setBreakTime,
  setPomodoro,
} from "../../lib/redux/timeSlice";
import { validateTime } from "../../lib/timeUtils";
export default function Time() {
  const dispatch = useDispatch();
  const { freeTime, breakTime, pomodoro } = useSelector((state) => state.time);

  // Reminder: useRef will NOT cause re-render -> combine with useState to rerender when value changes
  // const prevFreeTime = useRef();
  // const prevBreakTime = useRef();

  // gọi hàm initTE() để khởi tạo Timepicker
  useEffect(() => {
    const _initTE = async () => {
      const use = (await import("tw-elements")).initTE;
      const { Timepicker } = await import("tw-elements");
      use({ Timepicker });
    };
    _initTE();
  }, []);
  // useEffect(() => {
  //   prevFreeTime.current = freeTime;
  //   prevBreakTime.current = breakTime;
  // }, [freeTime, breakTime]);

  const handleFreeTimeChange = (event) => {
    dispatch(setFreeTime(validateTime(event.target.value)));
  };

  const handleBreakTimeChange = (event) => {
    // console.log(validateTime(event.target.value));

    dispatch(setBreakTime(validateTime(event.target.value)));
  };

  return (
    <>
      <section className=" flex flex-col gap-5 lg:flex-row justify-between  my-5 md:max-w-[80%] m-auto">
        <div className="flex flex-row justify-between lg:flex-col items-center sm:w-[85%] md:w-full lg:w-2/5 sm:m-auto text-center text-2xl font-bold rounded-lg ">
          <p className="text-lg md:text-xl lg:text-3xl font-extrabold m-2 md:mb-4">
            FREETIME
          </p>
          <div className="relative lg:w-full">
            <input
              type="text"
              value={freeTime}
              className={`peer 
          min-h-[auto] w-[180px] md:w-full 
          rounded 
          bg-transparent 
          px-3 py-[0.35rem] leading-[1.6]
          outline-none transition-all duration-200 ease-linear 
          focus:placeholder:opacity-100  
          data-[te-input-state-active]:placeholder:opacity-100 border-2  ${
            freeTime !== "" ? " border-primary-400" : " border-primary"
          }`}
              data-te-toggle="timepicker-just-input"
              id="timepickerFreetime"
              onChange={handleFreeTimeChange}
              maxLength={5}
            />
            <label
              htmlFor="timepickerFreetime"
              className={`absolute text-base md:text-xl left-3 top-0 mb-0 max-w-[90%] hover:cursor-text origin-[0_0] truncate pt-4 md:pt-[0.7rem] leading-[1.5] text-neutral-500 transition-all duration-200 ease-out ${
                freeTime !== ""
                  ? "-translate-y-[1.1rem] scale-[0.7] text-primary peer-data-[te-input-state-active]:-translate-y-[1.1rem] peer-data-[te-input-state-active]:scale-[0.8] bg-[#f5f8ff] "
                  : ""
              }`}
            >
              Your Freetime
            </label>
          </div>
        </div>
        <div className="flex flex-row justify-between lg:flex-col items-center sm:w-[85%] md:w-full lg:w-2/5 sm:m-auto text-center text-2xl font-bold rounded-lg">
          <p className="text-lg md:text-xl lg:text-3xl font-extrabold m-2 md:mb-4">
            BREAKTIME
          </p>
          <div className="relative lg:w-full">
            <input
              type="text"
              value={breakTime}
              className={`peer 
          min-h-[auto] w-[180px] md:w-full  
          rounded  
          bg-transparent 
          px-3 py-[0.35rem] leading-[1.6]
          outline-none transition-all duration-200 ease-linear 
          focus:placeholder:opacity-100  
          data-[te-input-state-active]:placeholder:opacity-100 border-2 border-primary ${
            breakTime !== "" ? " border-primary-400" : " border-primary"
          }`}
              data-te-toggle="timepicker-just-input"
              id="timepickerBreaktime"
              onChange={handleBreakTimeChange}
              maxLength={5}
            />
            <label
              htmlFor="timepickerBreaktime"
              className={`absolute text-base md:text-xl left-3 top-0 mb-0 max-w-[90%] hover:cursor-text origin-[0_0] truncate pt-4 md:pt-[0.7rem] leading-[1.5] text-neutral-500 transition-all duration-200 ease-out ${
                breakTime !== ""
                  ? "-translate-y-[1.1rem] scale-[0.7] text-primary peer-data-[te-input-state-active]:-translate-y-[1.1rem] peer-data-[te-input-state-active]:scale-[0.8] bg-[#f5f8ff] "
                  : ""
              }`}
            >
              Your Breaktime
            </label>
          </div>
        </div>
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
