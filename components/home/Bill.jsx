import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { format } from "path";
import { useDispatch, useSelector } from "react-redux";
import {
  setBillData,
  setCounter,
  setTotalTime,
} from "../../lib/redux/timeSlice";
import { get } from "http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getMinutes, formatTime } from "../../lib/timeUtils";
const Bill = () => {
  const dispatch = useDispatch();
  const { freeTime, breakTime, totalTime, billData } = useSelector(
    (state) => state.time
  );
  const breaktime = getMinutes(breakTime) || 0;
  const freetime = getMinutes(freeTime) || 0;

  // can't make this work right now
  // const [isDragging, setIsDragging] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDeleteItem = (itemId) => {
    const updatedBillData = billData.filter((item) => item.key !== itemId);
    dispatch(setBillData(updatedBillData));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("application/json");
    // Kiểm tra loại dữ liệu của dữ liệu kéo thả
    if (!data || typeof data !== "string") return;

    // Chuyển dữ liệu từ JSON sang Object
    const item = JSON.parse(data);
    if (item) {
      const newItem = { ...item, key: Date.now() };
      const updatedData = [...billData, newItem];
      dispatch(setBillData(updatedData));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragEnd = (event) => {
    // setIsDragging(false);
    const { active, over } = event;

    // Nếu phần tử được khác vị trí ban đầu
    if (active.id !== over.id) {
      const newBillData = [...billData];
      const draggedItem = newBillData.find((item) => item.key === active.id);
      const overIndex = newBillData.findIndex((item) => item.key === over.id);
      newBillData.splice(newBillData.indexOf(draggedItem), 1);
      newBillData.splice(overIndex, 0, draggedItem);

      dispatch(setBillData(newBillData));
    }
  };

  useEffect(() => {
    let newTotalTime = billData.reduce((acc, item) => {
      return acc + item.time;
    }, 0);
    billData.length >= 2
      ? (newTotalTime += breaktime * (billData.length - 1))
      : newTotalTime;
    dispatch(setTotalTime(newTotalTime));
    if (freetime >= 0 && breaktime >= 0) {
      if (freetime < breaktime) {
        toast.error("Your breaktime is more than your freetime");
      }
      if (totalTime > freetime) {
        toast.error("Your total time is less than your freetime");
      }
    }
  }, [billData, breaktime, freetime]);

  const handleStart = () => {
    dispatch(setCounter(true));
  };
  const handleRandom = () => {};

  return (
    <div
      id="bill"
      className="flex flex-col w-2/5 bg-[#cbc5b4] rounded-3xl text-center  text-sky-950 mx-auto sm:h-auto max-h-[800px]  min-h-[800px]"
    >
      <h1 className="font-title text-5xl font-bold m-5">Bill</h1>
      <div className="grid grid-cols-5 text-center font-extrabold text-2xl my-5">
        <span className="col-span-3">JOBS</span>
        <span className="col-span-2">Time</span>
      </div>
      <div className="border-b-2 border-sky-950 mx-2"></div>

      <div
        className="grow billContainer bg-slate-400 overflow-auto flex flex-col gap-1 p-2"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {billData.length > 0 ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={billData.map((item) => item.key)}>
              {billData.map((item, index) => (
                <SortableItem key={item.key} id={item.key} index={index}>
                  <div className="subMenu min-w-full grid grid-cols-2 border-dotted border-2 border-sky-950 p-3">
                    <h2 className="text-xl font-bold col-span uppercase font-title text-left">
                      {item.name}
                    </h2>
                    <p className="text-right font-body font-bold">
                      {item.time} minutes
                    </p>
                    <p className="text-left font-body">{item.description}</p>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-2/4 ml-auto"
                      onClick={() => handleDeleteItem(item.key)}
                    >
                      Delete
                    </button>
                  </div>
                </SortableItem>
              ))}
            </SortableContext>
          </DndContext>
        ) : (
          <p className="text-center">Drop Todenus from Menu in here</p>
        )}
      </div>
      <div
        id="total"
        className={
          "flex justify-between m-5 items-center text-3xl font-bold " +
          (totalTime === 0 ? "hidden" : "")
        }
      >
        <span className="">Total time</span>
        <p
          id="totalTime"
          className={
            totalTime > freetime && freeTime !== "" ? "text-red-500" : ""
          }
        >
          {formatTime(totalTime)}
        </p>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        limit={3}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div id="checkout" className=" flex justify-between m-5 text-gray-50">
        <button className="bg-orange-500 p-5 rounded-lg" onClick={handleStart}>
          Start
        </button>
        <button className="bg-blue-500 p-5 rounded-lg" onClick={handleRandom}>
          Randomize
        </button>
      </div>
    </div>
  );
};

const SortableItem = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props.id,
    data: {
      index: props.index,
    },
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : "",
    transition,
    opacity: isDragging ? 0.6 : 1,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.children}
    </div>
  );
};

export default Bill;
