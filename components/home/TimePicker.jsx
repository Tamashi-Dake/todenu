"use client";
import { useState, useEffect, useRef, useReducer } from "react";
import { format } from "path";
import { useDispatch, useSelector } from "react-redux";
import { setFreeTime, setBreakTime } from "../../lib/redux/timeSlice";
export default function Time() {
  const dispatch = useDispatch();
  const { freeTime, breakTime } = useSelector((state) => state.time);
  const [freeTimeInput, setFreeTimeInput] = useState(freeTime);
  const [breakTimeInput, setBreakTimeInput] = useState(breakTime);
  console.log(freeTime, breakTime);

  // Reminder: useRef will NOT cause re-render -> combine with useState to rerender when value changes
  const prevFreeTime = useRef("00:00");
  const prevBreakTime = useRef("00:00");

  // gọi hàm initTE() để khởi tạo Timepicker
  useEffect(() => {
    const _initTE = async () => {
      const use = (await import("tw-elements")).initTE;
      const { Timepicker } = await import("tw-elements");
      use({ Timepicker });
    };
    _initTE();
  }, []);

  // Update the previous freeTime and breakTime values when they change
  useEffect(() => {
    prevFreeTime.current = freeTime;
    prevBreakTime.current = breakTime;
  }, [freeTime, breakTime]);

  const handleFreeTimeChange = (event) => {
    if (event.target.value < breakTime) {
      alert("Your Breaktime can't be more than your Freetime");
      dispatch(setFreeTime(prevFreeTime.current));
      setFreeTimeInput(freeTime);
    } else dispatch(setFreeTime(event.target.value));
  };

  const handleBreakTimeChange = (event) => {
    if (freeTime !== "" && event.target.value > freeTime) {
      alert("Your Breaktime can't be more than your Freetime");
      dispatch(setBreakTime(prevBreakTime.current));
      setBreakTimeInput(breakTime);
    } else dispatch(setBreakTime(event.target.value));
  };

  // const formatTime = (time) => {
  //   const [hours, minutes] = time.split(":");
  //   return `${formatHours(hours)} ${formatMinutes(minutes)}`;
  // };
  // const formatHours = (hours) => {
  //   if (hours === "00") return "";
  //   return hours < 2 ? `${hours} hour` : `${hours} hours`;
  // };
  // const formatMinutes = (minutes) => {
  //   if (minutes === "00") return "";
  //   return minutes < 2 ? `${minutes} minute` : `${minutes} minutes`;
  // };

  return (
    <>
      <section className=" flex flex-col gap-5 sm:flex-row justify-between m-auto my-5">
        <div className="bg-neutral-100 m-auto text-center text-2xl font-bold rounded-lg">
          <h2>Your Freetime</h2>
          <div
            className="relative"
            data-te-with-icon="false"
            data-te-timepicker-init
            data-te-input-wrapper-init
            id="timepicker-just-input"
            data-te-format24="true"
            onSelect={handleFreeTimeChange}
          >
            <input
              type="text"
              value={freeTimeInput ? freeTimeInput : freeTime}
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
              readOnly
            />
            <label
              htmlFor="timepickerFreetime"
              className={`absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out ${
                freeTime !== ""
                  ? "-translate-y-[0.9rem] scale-[0.8] text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8]"
                  : ""
              }`}
            >
              Select a time
            </label>
          </div>
        </div>
        <div className="bg-neutral-100 m-auto text-center text-2xl font-bold rounded-lg">
          <h2>Your Breaktime</h2>
          <div
            className="relative"
            data-te-with-icon="false"
            data-te-timepicker-init
            data-te-input-wrapper-init
            id="timepicker-just-input"
            data-te-format24="true"
            onSelect={handleBreakTimeChange}
          >
            <input
              type="text"
              value={breakTimeInput ? breakTimeInput : breakTime}
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
              readOnly
            />
            <label
              htmlFor="timepickerBreaktime"
              className={`absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out ${
                breakTime !== ""
                  ? "-translate-y-[0.9rem] scale-[0.8] text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8]"
                  : ""
              }`}
            >
              Select a time
            </label>
          </div>
        </div>
      </section>
    </>
  );
}
