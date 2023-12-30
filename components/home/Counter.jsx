import { setCounter } from "../../lib/redux/timeSlice";
import { useDispatch, useSelector } from "react-redux";

const Counter = ({ counter }) => {
  const dispatch = useDispatch();

  const handleStop = () => {
    dispatch(setCounter(!counter));
  };
  const handleReset = () => {};
  return (
    <>
      <div className="bg-emerald-600 w-full h-[700px]"></div>
      <div className="flex justify-between items-center w-1/2">
        <button className="bg-orange-500 p-5 rounded-lg" onClick={handleStop}>
          Stop
        </button>
        <button className="bg-blue-500 p-5 rounded-lg" onClick={handleReset}>
          Reset
        </button>
      </div>
    </>
  );
};

export default Counter;
