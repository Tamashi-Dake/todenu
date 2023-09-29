import Image from "next/image";
import { useState } from "react";
import { inputTime } from "../components/styled";
export default function Home() {
  const [filterHour, setFilterHour] = useState();
  const [filterMinute, setFilterMinute] = useState();
  // const [value, setValue] = useState();

  const handleHourChange = (event) => {
    const hour = event.target.value;
    if (hour >= 0 && hour <= 24) {
      setFilterHour(parseInt(hour));
      hour == 0 ? setFilterHour(0) : {};
    }
  };

  const handleMinuteChange = (event) => {
    const minute = event.target.value;
    if (minute >= 0 && minute <= 60) {
      setFilterMinute(parseInt(minute));
      minute == 0 ? setFilterMinute(0) : {};
    }
  };
  // const handleChange = (event) => {
  //   setValue(parseInt(event.target.value));
  // };
  // const filteredTasks = tasks.filter((task) => {
  //   const totalMinutes = filterHour * 60 + filterMinute;
  //   return task.completionTime < totalMinutes;
  // });
  return (
    <>
      <main className="">
        <section
          id="input-time"
          className="m-auto text-center text-2xl font-bold"
        >
          <h2>How many time do you have left</h2>
          <div id="time" className="">
            <input
              style={inputTime}
              type="text"
              value={filterHour}
              onChange={handleHourChange}
              placeholder="00"
              className="text-center"
              maxLength={2}
            />
            <span>:</span>
            <input
              style={inputTime}
              type="text"
              maxLength={2}
              value={filterMinute}
              onChange={handleMinuteChange}
              placeholder="00"
              className="text-center"
            />
            {/* <input
              type="number"
              value={value}
              onChange={handleChange}
              placeholder="test"
            /> */}
          </div>
        </section>
      </main>
    </>
  );
}
// i think this is bad practice, but i don't know what best practice is
// set static title
Home.title = "Home";
