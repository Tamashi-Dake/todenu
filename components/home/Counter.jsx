import { setCounter } from "../../lib/redux/timeSlice";
import { useDispatch, useSelector } from "react-redux";

import { motion } from "framer-motion";

import { useState, useEffect, use } from "react";
import { setBillData } from "../../lib/redux/timeSlice";
import { get } from "http";
import { getSeconds, formatSeconds } from "../../lib/timeUtils";
import { Check, Pause, Play, Redo, RotateCw, Trash } from "lucide-react";
import { toast } from "react-toastify";
import { set } from "date-fns";
import is from "date-fns/locale/is";
import { useMediaQuery } from "react-responsive";

const Counter = () => {
  const dispatch = useDispatch();
  const { billData, counter, freeTime, breakTime } = useSelector(
    (state) => state.time
  );
  const [remainingTotalTime, setRemainingTotalTime] = useState(
    getSeconds(freeTime)
  );
  const [remainingBreakTime, setRemainingBreakTime] = useState(
    getSeconds(breakTime)
  );
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Điều kiện cho điện thoại di động
  const [hoveredItems, setHoveredItems] = useState([]);

  const [isBreakActive, setIsBreakActive] = useState(false);
  const [isCurrentActive, setIsCurrentActive] = useState(true);
  const [currentCountdown, setCurrentCountdown] = useState(
    billData.length > 0 ? billData[0].time * 60 : null
  );
  const animations = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };
  const animationsBreak = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };
  useEffect(() => {
    setCurrentCountdown(billData.length > 0 ? billData[0].time * 60 : null);
  }, [billData]);

  useEffect(() => {
    setRemainingTotalTime(getSeconds(freeTime));
    setRemainingBreakTime(getSeconds(breakTime));
  }, [freeTime, breakTime]);

  // Đếm ngược thời gian rảnh
  useEffect(() => {
    let intervalTotal;
    if (remainingTotalTime > 0 && counter) {
      intervalTotal = setInterval(() => {
        setRemainingTotalTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    if (remainingTotalTime === 0 && counter) {
      dispatch(setCounter(!counter));
      toast.success("You've working hard! But the time is up!");
    }
    // setCurrentCountdown(billData[0].time);
    return () => clearInterval(intervalTotal);
  }, [remainingTotalTime, freeTime, counter]);

  // Đếm ngược thời gian nghỉ
  useEffect(() => {
    let intervalBreak;
    if (counter)
      if (remainingBreakTime > 0 && isBreakActive) {
        intervalBreak = setInterval(() => {
          setRemainingBreakTime((prevTime) => prevTime - 1);
        }, 1000);
      } else if (remainingBreakTime === 0) {
        setIsBreakActive(false);
        setIsCurrentActive(true);
      }
    return () => clearInterval(intervalBreak);
  }, [remainingBreakTime, isBreakActive, counter]);

  // Đếm ngược thời gian của mỗi item
  useEffect(() => {
    let interval;
    if (counter) {
      if (currentCountdown > 0 && isCurrentActive) {
        interval = setInterval(() => {
          setCurrentCountdown((prevTime) => prevTime - 1);
        }, 1000);
      } else if (currentCountdown === 0) {
        if (billData.length > 1) {
          handleDelete(billData[0].key);
          setIsCurrentActive(false);
          setIsBreakActive(true);
          // Countdown hoàn thành, chuyển đến item tiếp theo
          setCurrentCountdown(billData[0].time * 60);
        } else {
          handleDelete(billData[0].key);
          toast.success("Well done! You've finished your works!");
          dispatch(setCounter(!counter));
        }
      }
      return () => clearInterval(interval);
    }
  }, [currentCountdown, isCurrentActive, breakTime, counter]);

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
      toast.success("You've finished your works");
    }
  };
  const handleStop = () => {
    dispatch(setCounter(!counter));
    setRemainingTotalTime(getSeconds(freeTime) || 0);
    setRemainingBreakTime(getSeconds(breakTime) || 0);
    setIsBreakActive(false);
    setIsCurrentActive(true);
    setCurrentCountdown(billData[0].time * 60);
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

      toast.success("You've finished your works");
      handleStop();
    }
  };
  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row  w-full lg:h-[600px] bg-[#8ccce2] rounded-t-md overflow-x-hidden styleScroll ">
        <div
          className={
            "flex flex-col w-full lg:w-1/2  items-center " +
            (isBreakActive ? "opacity-60 " : "opacity-100") +
            (billData.length > 7 ? " justify-start" : " justify-center")
          }
        >
          {billData.map((item, index) => (
            <>
              {index === 0 ? (
                <motion.div
                  key={item.id}
                  className="md:w-[620px] w-10/12 h-[150px] lg:w-4/5 item-wrapper flex flex-col transition-all mt-5 mr-[20px]  ease-linear  max-w-[800px] "
                  whileHover={{ height: "150px" }}
                  initial={isMobile ? { height: "150px" } : { height: "84px" }}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  // transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="item flex items-center justify-between p-4  bg-slate-200 rounded-t-sm z-20 ">
                    <div className="text-black">
                      <h2 className="text-xl font-bold">{item.name}</h2>
                      <p className="text-gray-500">{item.description}</p>
                    </div>
                    <div className="countdownTimer text-black text-2xl font-semibold">
                      {/* Countdown logic here */}
                      {formatSeconds(currentCountdown)}
                    </div>
                  </div>
                  <div
                    className={
                      "flex justify-around items-center rounded-b-sm p-[15px] transition-all duration-200 " +
                      (hoveredItems[index]
                        ? "opacity-1 bg-slate-200 z-10"
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
                        onClick={isBreakActive ? null : handlePlayClick}
                      />
                    )}
                    <Trash
                      className="w-10 h-10 p-2 text-white font-size bg-red-500 rounded-full"
                      onClick={
                        isBreakActive ? null : () => handleDelete(item.key)
                      }
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={item.id}
                  className="md:w-[620px] w-11/12 lg:w-5/6 max-w-[650px]   item-wrapper flex transition-all duration-100 h-[84px] ml-8  ease-linear "
                  whileHover={{ x: -10 }}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="item flex w-full items-center justify-between p-4  bg-slate-300 max-w-[800px] rounded-l-sm z-20 ">
                    <div className="text-black">
                      <h2 className="text-base md:text-xl font-bold">
                        {item.name}
                      </h2>
                      <p className="text-gray-500 text-sm md:text-base">
                        {item.description}
                      </p>
                    </div>
                    <div className="countdownTimer text-black text-base md:text-2xl font-semibold">
                      {/* Countdown logic here */}
                      {formatSeconds(item.time * 60)}
                    </div>
                  </div>
                  <div
                    className={
                      "flex justify-center items-center transition-all  ease-linear bg-red-500 z-10 md:z-[-1] px-4 rounded-r-sm" +
                      (hoveredItems[index] ? "opacity-1 md:z-10" : "opacity-0")
                    }
                    onClick={() => handleDelete(item.key)}
                  >
                    {/* <Check className="text-white font-size" /> */}
                    <Trash className="text-white font-size" />
                  </div>
                </motion.div>
              )}
            </>
          ))}
        </div>
        <div className="flex flex-col justify-center items-center p-5 lg:w-1/2">
          <motion.div
            variants={animations}
            initial={isBreakActive ? "exit" : "initial"}
            animate={isBreakActive ? "exit" : "animate"}
            className={isBreakActive ? "hidden" : ""}
          >
            <div className="countdownTimer text-3xl text-white">
              Time remaining
            </div>
            <div className="countdownTimer text-7xl md:5xl text-white">
              {formatSeconds(remainingTotalTime)}
            </div>
          </motion.div>
          <motion.div
            variants={animationsBreak}
            initial={isBreakActive ? "initial" : "exit"}
            animate={isBreakActive ? "animate" : "ecit"}
            className={isBreakActive ? "" : "hidden"}
          >
            <div className="countdownTimer text-3xl text-green-300">
              Break time!
            </div>
            <div className="countdownTimer text-7xl text-green-200 lg:translate-x-[0px]">
              {formatSeconds(remainingBreakTime)}
            </div>
          </motion.div>
        </div>
      </div>
      <div className="flex justify-around items-center bg-[#8ccce2] rounded-b-md p-6 ">
        <button
          className="bg-teal-500 p-5 rounded-lg text-white"
          onClick={handleStop}
        >
          Go back
        </button>
        {isCurrentActive ? (
          <Pause
            className="lg:opacity-0 opacity-1 w-10 h-10 p-2 text-black font-size bg-gray-50 rounded-full"
            onClick={handlePauseClick}
          />
        ) : (
          <Play
            className="lg:opacity-0 opacity-1  w-10 h-10 p-2 text-black font-size bg-gray-50 rounded-full"
            onClick={isBreakActive ? null : handlePlayClick}
          />
        )}
        <button
          className="bg-blue-500 p-5 rounded-lg text-white"
          onClick={handleSkip}
        >
          Skip
        </button>
      </div>
    </>
  );
};

export default Counter;
