import { setCounter } from "../../lib/redux/timeSlice";
import { useDispatch, useSelector } from "react-redux";

import { motion } from "framer-motion";

import { useState, useEffect, use } from "react";
import { setBillData } from "../../lib/redux/timeSlice";
import { get } from "http";
import { getSeconds, formatSeconds } from "../../lib/timeUtils";
import { Check, Pause, Play, Redo, RotateCw, Trash } from "lucide-react";
import { toast } from "react-toastify";

const Counter = () => {
  const dispatch = useDispatch();
  const { billData, counter, freeTime, breakTime } = useSelector(
    (state) => state.time
  );
  const breaktime = getSeconds(breakTime) || 0;
  const [remainingTotalTime, setRemainingTotalTime] = useState(
    getSeconds(freeTime)
  );

  const [hoveredItems, setHoveredItems] = useState([]);

  const [isBreakActive, setIsBreakActive] = useState(false);
  const [isCurrentActive, setIsCurrentActive] = useState(true);
  const [isCounterLoaded, setIsCounterLoaded] = useState(false);
  const [currentCountdown, setCurrentCountdown] = useState(
    billData.length > 0 ? billData[0].time * 60 : null
  );
  const animations = {
    initial: { opacity: 0, XMLHttpRequest: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };
  useEffect(() => {
    setCurrentCountdown(billData.length > 0 ? billData[0].time * 60 : null);
  }, [billData]);
  useEffect(() => {
    setRemainingTotalTime(getSeconds(freeTime));
  }, [freeTime]);
  // Đếm ngược thời gian rảnh
  useEffect(() => {
    console.log("remainingTotalTime", remainingTotalTime);
    console.log("freeTime", freeTime);
    let interval;
    if (remainingTotalTime > 0 && counter) {
      interval = setInterval(() => {
        setRemainingTotalTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    // setCurrentCountdown(billData[0].time);
    setIsCounterLoaded(true);
    return () => clearInterval(interval);
  }, [remainingTotalTime, freeTime, counter]);

  // Đếm ngược thời gian của mỗi item
  useEffect(() => {
    let interval;
    // console.log("currentCountdown", currentCountdown);
    // console.log(counter);
    // console.log("remainingTotalTime", remainingTotalTime);
    // console.log(getSeconds(freeTime));
    // console.log("freeTime", freeTime);
    if (counter) {
      if (currentCountdown > 0 && isCurrentActive) {
        interval = setInterval(() => {
          setCurrentCountdown((prevTime) => prevTime - 1);
        }, 1000);
      } else if (currentCountdown === 0) {
        if (billData.length > 1) {
          handleDelete(billData[0].key);
          // setIsCurrentActive(false);
          // setIsBreakActive(true);
          // Countdown hoàn thành, chuyển đến item tiếp theo
          setCurrentCountdown(billData[0].time * 60);
        } else {
          handleDelete(billData[0].key);
          toast.success("Finished!");
          dispatch(setCounter(!counter));
        }
      }
      return () => clearInterval(interval);
    }
  }, [currentCountdown, isCurrentActive, counter]);
  // useEffect(() => {
  //   if (isBreakActive) {
  //     let interval;
  //     if (breaktime > 0) {
  //       interval = setInterval(() => {
  //         setRemainingTotalTime((prevTime) => prevTime - 1);
  //       }, 1000);
  //     } else if (breaktime === 0) {
  //       setIsBreakActive(false);
  //       setIsCurrentActive(true);
  //       // Countdown hoàn thành, chuyển đến item tiếp theo
  //       if (billData.length > 0) {
  //         setCurrentCountdown(billData[0].time * 60);
  //       }
  //     }
  //     return () => clearInterval(interval);
  //   }
  // }, [isBreakActive]);
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
    setIsCurrentActive(!isCurrentActive);
    // setCurrentCountdownIndex(planCountdownIndex);
  };
  const handlePauseClick = () => {
    setIsCurrentActive(!isCurrentActive);
  };
  const handleDelete = (itemId) => {
    const updatedBillData = billData.filter((item) => item.key !== itemId);
    dispatch(setBillData(updatedBillData));
    if (billData.length === 1) {
      dispatch(setCounter(!counter));
    }
  };
  const handleStop = () => {
    dispatch(setCounter(!counter));
    setRemainingTotalTime(getSeconds(freeTime) || 0);
  };

  const handleSkip = () => {
    if (billData.length > 1) {
      // setIsCurrentActive(false);
      // setIsBreakActive(true);
      handleDelete(billData[0].key);
      setCurrentCountdown(billData[0].time * 60);
      toast.success("Skipped!");
    } else {
      handleDelete(billData[0].key);
      toast.success("Skipped!");
      dispatch(setCounter(!counter));
    }
  };
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row  w-full md:h-[700px] bg-[#cbc5b4] rounded-t-md">
        <div className="flex flex-col justify-center items-center md:w-3/4 ">
          <div className="flex flex-col justify-between w-full">
            {billData.map((item, index) => (
              <>
                {index === 0 ? (
                  <motion.div
                    key={item.id}
                    className="item-wrapper flex flex-col transition-all h-[84px] ml-8 mr-14 ease-linear rounded-sm"
                    whileHover={{ height: "150px" }}
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
                        {formatSeconds(currentCountdown)}
                      </div>
                    </div>
                    <div
                      className={
                        "flex justify-around items-center  p-[15px] transition-all " +
                        (hoveredItems[index]
                          ? "opacity-1 bg-slate-200"
                          : "opacity-0")
                      }
                    >
                      {/* <Check className="text-white font-size" /> */}
                      {isCurrentActive ? (
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
                      <Trash
                        className="w-10 h-10 p-2 text-white font-size bg-red-500 rounded-full"
                        onClick={() => handleDelete(item.key)}
                      />
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
                      <Trash
                        className="text-white font-size"
                        onClick={() => handleDelete(item.key)}
                      />
                    </div>
                  </motion.div>
                )}
              </>
            ))}
          </div>
        </div>
        <motion.div
          variants={animations}
          initial={isBreakActive ? "exit" : "initial"}
          animate={isBreakActive ? "exit" : "animate"}
          className="flex flex-col justify-center items-center md:w-1/2"
        >
          <div className="text-3xl text-white">Time remaining</div>
          <div className="text-9xl text-white">
            {formatSeconds(remainingTotalTime)}
          </div>
        </motion.div>
        {/* <motion.div
          variants={animations}
          initial={isBreakActive ? "initial" : "exit"}
          animate={isBreakActive ? "animate" : "exit"}
          className="flex flex-col justify-center items-center md:w-1/2"
        >
          <div className="text-3xl text-white">Break time!</div>
          <div className="text-9xl text-white">{formatSeconds(breaktime)}</div>
        </motion.div> */}
      </div>
      <div className="flex justify-around items-center bg-[#cbc5b4] rounded-b-md">
        <button className="bg-orange-500 p-5 rounded-lg" onClick={handleStop}>
          Go back
        </button>
        <button className="bg-blue-500 p-5 rounded-lg" onClick={handleSkip}>
          Skip
        </button>
      </div>
    </>
  );
};

export default Counter;
