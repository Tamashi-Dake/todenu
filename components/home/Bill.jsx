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
import { getSeconds, formatTime, formatSeconds } from "../../lib/timeUtils";
class MyPointerSensor extends PointerSensor {
  static activators = [
    {
      eventName: "onPointerDown",
      handler: ({ nativeEvent: event }) => {
        if (
          !event.isPrimary ||
          event.button !== 0 ||
          isInteractiveElement(event.target)
        ) {
          return false;
        }

        return true;
      },
    },
  ];
}

function isInteractiveElement(element) {
  const interactiveElements = [
    "button",
    "input",
    "textarea",
    "select",
    "option",
  ];

  if (interactiveElements.includes(element.tagName.toLowerCase())) {
    return true;
  }

  return false;
}
const Bill = () => {
  const dispatch = useDispatch();
  const { freeTime, breakTime, totalTime, billData, counter } = useSelector(
    (state) => state.time
  );
  const breaktime = getSeconds(breakTime) || 0;
  const freetime = getSeconds(freeTime) || 0;

  // can't make this work right now
  // const [isDragging, setIsDragging] = useState(false);
  const sensors = useSensors(
    useSensor(MyPointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDeleteItem = (itemId) => {
    const updatedBillData = billData.filter((item) => item.key !== itemId);
    dispatch(setBillData(updatedBillData));
    toast.success("Item deleted from Bill!", {
      icon: "🗑️",
    });
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
      toast.success("Item added to Bill!", {
        icon: "📝",
      });
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
    let newTotalTime =
      billData.reduce((acc, item) => {
        return acc + item.time;
      }, 0) * 60;
    billData.length >= 2
      ? (newTotalTime += breaktime * (billData.length - 1))
      : newTotalTime;
    dispatch(setTotalTime(newTotalTime));
  }, [billData, breakTime, freeTime, breaktime, freetime, totalTime]);

  const handleStart = () => {
    if (billData.length === 0) {
      toast.error("You don't have any task to do");
      return;
    }
    if (freetime === "") {
      toast.error("You must fill in Free time ");
      return;
    }
    if (breaktime === "" && billData.length > 1) {
      toast.error("You must fill in Break time ");
      return;
    }
    if (totalTime > freetime) {
      toast.error("Your Free time is less than your Total time");
      return;
    }

    if (freetime <= breaktime) {
      toast.error("Your Break time is more than your Free time");
      return;
    }

    dispatch(setCounter(!counter));
    // window.scrollTo(0, 0);
  };
  // const handleRandom = () => {};

  return (
    <div
      id="bill"
      className="flex flex-col w-full border-primary-400 border-2 bg-[#BDD7EE] rounded-3xl text-center  text-sky-950 ml-auto sm:h-auto max-h-[800px]  min-h-[800px]"
    >
      <h1 className="font-sans text-3xl font-extrabold m-5">BILL</h1>
      <span className="text-lg font-bold m-6"></span>

      <div
        className={
          "grow styleScroll bg-[#DEEBF7] overflow-auto flex flex-col gap-2 p-5 " +
          (billData.length > 0 ? " " : " justify-center")
        }
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
                  <div className="subMenu  min-w-full grid grid-cols-[2fr,1fr] border-dotted border-2 rounded-md border-sky-950 p-3 bg-[#F5F8FF]">
                    <h2
                      className="text-xl font-bold col-span uppercase font-title text-left text-ellipsis overflow-hidden whitespace-nowrap"
                      onClick={() => console.log("clicked")}
                    >
                      {item.name}
                    </h2>
                    <p className="text-right font-body font-bold">
                      {formatTime(item.time)}
                    </p>
                    <p className="my-auto text-left font-body text-ellipsis overflow-hidden whitespace-nowrap">
                      {item.description}
                    </p>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white  max-h-10 font-bold py-2 px-4 rounded w-[100px] ml-auto"
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
          <p className="">Drop Todenus from Menu in here</p>
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
          {formatSeconds(totalTime)}
        </p>
      </div>

      <div id="checkout" className=" flex justify-between m-5 text-gray-50">
        <button
          className="grow bg-cyan-500 p-5 rounded-lg"
          onClick={handleStart}
        >
          Checkout
        </button>
        {/* <button className="bg-blue-500 p-5 rounded-lg" onClick={handleRandom}>
          Randomize
        </button> */}
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
    touchAction: "none",
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.children}
    </div>
  );
};

export default Bill;
