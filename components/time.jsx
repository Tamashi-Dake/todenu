"use client";
import { useState, useEffect, useReducer } from "react";
import { inputTime, inputFilled } from "../style/component/Time";

export default function Time() {
  const [freeTime, setFreeTime] = useState("");
  const [breakTime, setBreakTime] = useState("");
  console.log(freeTime);
  const handleFreeTimeChange = (event) => {
    const time = event.target.value;
    setFreeTime(time);
  };

  const handleBreakTimeChange = (event) => {
    const time = event.target.value;
    setBreakTime(time);
  };

  useEffect(() => {
    const _initTE = async () => {
      const use = (await import("tw-elements")).initTE;
      const { Timepicker } = await import("tw-elements");
      use({ Timepicker });
    };
    _initTE();
  }, []);

  return (
    <>
      <section className="flex flex-col gap-5 sm:flex-row justify-between max-w-screen-lg m-auto ">
        <div className="m-auto text-center text-2xl font-bold">
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
              id="timepicker"
              readOnly
            />
            <label
              htmlFor="timepicker"
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
        <div className="m-auto text-center text-2xl font-bold">
          <h2>Breaktime</h2>
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
              id="timepicker"
              readOnly
            />
            <label
              htmlFor="timepicker"
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
      </section>
      <button className="bg-orange-500 p-5 rounded-lg">Checkout</button>
    </>
  );
}
