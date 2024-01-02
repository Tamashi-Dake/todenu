import { setCounter } from "../../lib/redux/timeSlice";
import { useDispatch, useSelector } from "react-redux";

import { motion } from "framer-motion";

import { useState, useEffect } from "react";
import { get } from "http";
import { getMinutes, formatTime } from "../../lib/timeUtils";
import { Check, Pause, Play, Redo, RotateCw, Trash } from "lucide-react";
import { is, pl } from "date-fns/locale";
import { set } from "date-fns";

const Counter = () => {
  const dispatch = useDispatch();
  const { billData, counter, freeTime, breakTime } = useSelector(
    (state) => state.time
  );
  const breaktime = getMinutes(breakTime) || 0;
  const [remainingTotalTime, setRemainingTotalTime] = useState(
    getMinutes(freeTime) || 0
  );
  const [hoveredItems, setHoveredItems] = useState([]);
  const [currentCountdown, setCurrentCountdown] = useState();
  const [isActive, setIsActive] = useState(true);
  // const [planCountdownIndex, setPlanCountdownIndex] = useState(0);
  useEffect(() => {
    let interval;
    if (remainingTotalTime > 0 && counter) {
      interval = setInterval(() => {
        setRemainingTotalTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [remainingTotalTime, counter]);

  const handleMouseEnter = (index) => {
    setHoveredItems((prevHoveredItems) => {
      const newHoveredItems = [...prevHoveredItems];
      newHoveredItems[index] = true;
      return newHoveredItems;
    });
  };

  const handleMouseLeave = (index) => {
    setHoveredItems((prevHoveredItems) => {
      const newHoveredItems = [...prevHoveredItems];
      newHoveredItems[index] = false;
      return newHoveredItems;
    });
  };

  const handlePlayClick = () => {
    setIsActive(!isActive);
    // setCurrentCountdownIndex(planCountdownIndex);
  };
  const handlePauseClick = () => {
    setIsActive(!isActive);
  };

  const handleStop = () => {
    dispatch(setCounter(!counter));
    setRemainingTotalTime(getMinutes(freeTime) || 0);
  };

  const handleSkip = () => {
    console.log("reset");
  };

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row  w-full md:h-[700px]">
        <div className="flex flex-col justify-center items-center md:w-3/4 ">
          <div className="flex flex-col justify-between w-full">
            {billData.map((item, index) => (
              <>
                {index === 0 ? (
                  <motion.div
                    key={item.id}
                    className="item-wrapper flex flex-col transition-all h-[84px] ml-8 mr-14 ease-linear rounded-sm"
                    whileHover={{ height: "130px" }}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                    // transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="item flex items-center justify-between p-4  bg-slate-200 ">
                      <div className="text-black">
                        <h2 className="text-xl font-bold">{item.name}</h2>
                        <p className="text-gray-500">{item.description}</p>
                      </div>
                      <div className="text-black text-4xl font-bold">
                        {/* Countdown logic here */}
                        {item.time}
                      </div>
                    </div>
                    <div
                      className={
                        "flex justify-around items-center bg-slate-200 p-1 z-[-1]" +
                        (hoveredItems[index] ? "opacity-1" : "opacity-0")
                      }
                    >
                      {/* <Check className="text-white font-size" /> */}
                      <RotateCw className="w-10 h-10 p-2 text-white font-size bg-blue-500 rounded-full" />
                      {isActive ? (
                        <Pause
                          className="w-10 h-10 p-2 text-black font-size bg-gray-50 rounded-full"
                          onClick={handlePauseClick}
                        />
                      ) : (
                        <Play
                          className="w-10 h-10 p-2 text-black font-size bg-gray-50 rounded-full"
                          onClick={handlePlayClick}
                        />
                      )}
                      <Trash className="w-10 h-10 p-2 text-white font-size bg-red-500 rounded-full" />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={item.id}
                    className="item-wrapper flex transition-all h-[84px] ml-8 ease-linear rounded-sm"
                    whileHover={{ x: -10 }}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                    // transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="item flex w-full items-center justify-between p-4  bg-slate-300 ">
                      <div className="text-black">
                        <h2 className="text-xl font-bold">{item.name}</h2>
                        <p className="text-gray-500">{item.description}</p>
                      </div>
                      <div className="text-black text-4xl font-bold">
                        {/* Countdown logic here */}
                        {item.time}
                      </div>
                    </div>
                    <div
                      className={
                        "flex justify-center items-center transition-all duration-500 ease-linear bg-red-500 px-4 z-[-1] " +
                        (hoveredItems[index] ? "opacity-1" : "opacity-0")
                      }
                    >
                      {/* <Check className="text-white font-size" /> */}
                      <Trash className="text-white font-size" />
                    </div>
                  </motion.div>
                )}

                {index !== billData.length - 1 && (
                  <motion.div
                    key={item.id}
                    className="item flex items-center justify-between p-4 ml-8 mr-14 bg-slate-500 rounded-sm"
                  >
                    <div className="text-white">
                      <h2 className="text-xl font-bold">Breaktime</h2>
                    </div>
                    <div className="text-white text-4xl font-bold">
                      {breakTime}
                    </div>
                  </motion.div>
                )}
              </>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center md:w-1/2">
          <div className="text-3xl text-white">Time remaining</div>
          <div className="text-9xl text-white">{remainingTotalTime}</div>
        </div>
      </div>
      <div className="flex justify-around items-center ">
        <button className="bg-orange-500 p-5 rounded-lg" onClick={handleStop}>
          Stop
        </button>
        <button className="bg-blue-500 p-5 rounded-lg" onClick={handleSkip}>
          Skip
        </button>
      </div>
    </>
  );
};

export default Counter;
