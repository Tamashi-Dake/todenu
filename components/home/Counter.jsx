import { setCounter } from "../../lib/redux/timeSlice";
import { useDispatch, useSelector } from "react-redux";

import { motion } from "framer-motion";

import { useState, useEffect, use } from "react";
import { setBillData } from "../../lib/redux/timeSlice";
import { get } from "http";
import { getSeconds, formatSeconds } from "../../lib/timeUtils";
import { Check, Pause, Play, Redo, RotateCw, Trash } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
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
  const [previousCountdown, setPreviousCountdown] = useState(null);
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
    if (previousCountdown !== null) {
      setCurrentCountdown(previousCountdown);
      setPreviousCountdown(null);
      return;
    }
    setCurrentCountdown(billData.length > 0 ? billData[0].time * 60 : null);
    // console.log(billData);
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
          handleDelete(0);
          setIsCurrentActive(false);
          setIsBreakActive(true);
          // Countdown hoàn thành, chuyển đến item tiếp theo
          setCurrentCountdown(billData[0].time * 60);
        } else {
          handleDelete(0);
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
  const handleDelete = (index) => {
    setPreviousCountdown(currentCountdown);
    const updatedBillData = billData.filter(
      (item, itemIndex) => itemIndex !== index
    );
    dispatch(setBillData(updatedBillData));
    if (billData.length === 1) {
      dispatch(setCounter(!counter));
    }
  };
  const handleFirstDelete = () => {
    const updatedBillData = billData.filter(
      (item, itemIndex) => itemIndex !== 0
    );
    console.log(updatedBillData);
    dispatch(setBillData(updatedBillData));
    if (billData.length === 1) {
      dispatch(setCounter(!counter));
    }
  };
  const handleStop = () => {
    dispatch(setCounter(!counter));
    setRemainingTotalTime(getSeconds(freeTime) || 0);
    setRemainingBreakTime(getSeconds(breakTime) || 0);
    setIsBreakActive(false);
    setIsCurrentActive(true);
    setCurrentCountdown(billData[0].time * 60);
    // window.scrollTo(0, 0);
  };

  const handleSkip = () => {
    if (isBreakActive) {
      // Nếu đang nghỉ thì bỏ qua nghỉ
      setIsBreakActive(false);
      setIsCurrentActive(true);
      setRemainingBreakTime(getSeconds(breakTime));
      return;
    }
    handleFirstDelete();

    if (billData.length > 1) {
      setCurrentCountdown(billData[0].time * 60);
      toast.success("Skipped!");
    } else {
      toast.success("You've finished your works");
      handleStop();
    }
  };
  return (
    <>
      <div className="flex flex-col-reverse justify-center items-center md:h-[600px] lg:max-w-[80%] m-auto bg-[#8ccce2] rounded-t-md overflow-x-hidden styleScroll ">
        <div
          className={
            "flex flex-col w-full lg:w-1/2 ml-5 items-center " +
            (isBreakActive ? " opacity-60 " : " opacity-100 ") +
            (billData.length > 7 ? " justify-start" : " justify-center")
          }
        >
          {billData.map((item, index) => (
            <motion.div
              key={index}
              className={`${
                index === 0 ? "md:w-[620px]  w-10/12" : "md:w-[600px] w-9/12 "
              } max-w-[650px] item-wrapper flex transition-all duration-100  ${
                index === 0 ? "h-[84px]" : "h-[90px] md:ml-8"
              } ease-linear`}
              whileHover={{
                x: index === 0 ? 0 : -10,
                height: index === 0 ? 150 : undefined,
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div
                className={`item flex w-full items-center justify-between p-2 md:p-5 ${
                  index === 0
                    ? "bg-white rounded-t-sm"
                    : "bg-[#F5F8FF] max-w-[800px] rounded-l-sm tranform translate-x-2"
                } z-20`}
              >
                <div className="text-black">
                  <h2
                    className={`${
                      index === 0
                        ? "text-xl leading-5"
                        : "text-base md:text-xl leading-4"
                    } font-bold max-w-[100px] md:max-w-[300px]  text-ellipsis overflow-hidden whitespace-nowrap`}
                  >
                    {item.name}
                  </h2>
                  <p
                    className={`${
                      index === 0 ? "h-8 pt-2" : " text-sm md:text-base h-10"
                    } max-w-[100px] md:max-w-[300px]  text-ellipsis overflow-hidden whitespace-nowrap text-gray-500`}
                  >
                    {item.description}
                  </p>
                </div>
                <div className="countdownTimer text-black text-base md:text-2xl font-semibold">
                  {formatSeconds(
                    index === 0 ? currentCountdown : item.time * 60
                  )}
                </div>
              </div>
              <div
                className={`flex justify-center items-center transition-all ease-linear z-10 p-4 ${
                  index === 0
                    ? "bg-white hidden lg:inline-flex "
                    : `bg-red-500  md:z-[-1] px-4 rounded-r-sm translate-x-2 ${
                        hoveredItems[index] ? "opacity-1 md:z-10" : "opacity-0"
                      }`
                }`}
                onClick={
                  index === 0
                    ? isBreakActive
                      ? null
                      : handlePauseClick
                    : isBreakActive
                    ? null
                    : () => handleDelete(index)
                }
              >
                {index === 0 ? (
                  isCurrentActive ? (
                    <Pause className="w-10 h-10 p-2 text-white bg-blue-500 font-size  rounded-full" />
                  ) : (
                    <Play
                      className="w-10 h-10 p-2 text-white bg-blue-500 font-size rounded-full"
                      onClick={isBreakActive ? null : handlePlayClick}
                    />
                  )
                ) : (
                  <Trash className="text-white font-size" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col justify-center items-center p-5 lg:w-1/2">
          <motion.div
            variants={animations}
            initial={isBreakActive ? "exit" : "initial"}
            animate={isBreakActive ? "exit" : "animate"}
            className={isBreakActive ? "hidden" : ""}
          >
            <div className="countdownTimer text-xl md:3xl text-white">
              Time remaining
            </div>
            <div className="countdownTimer text-5xl md:5xl text-white">
              {formatSeconds(remainingTotalTime)}
            </div>
          </motion.div>
          <motion.div
            variants={animationsBreak}
            initial={isBreakActive ? "initial" : "exit"}
            animate={isBreakActive ? "animate" : "ecit"}
            className={isBreakActive ? "" : "hidden"}
          >
            <div className="countdownTimer text-3xl text-green-500">
              Break time!
            </div>
            <div className="countdownTimer text-7xl text-green-600  lg:translate-x-[0px]">
              {formatSeconds(remainingBreakTime)}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex justify-around items-center bg-[#8ccce2] rounded-b-md p-6 lg:max-w-[80%] m-auto ">
        <button
          className="bg-teal-500 p-5 rounded-lg text-white sm:w-[100px]"
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
          className="bg-blue-500 p-5 rounded-lg text-white w-[100px]"
          onClick={handleSkip}
        >
          Skip
        </button>
      </div>
    </>
  );
};

export default Counter;
