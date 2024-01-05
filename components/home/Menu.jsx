import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { formatTime } from "../../lib/timeUtils";
import "react-tabs/style/react-tabs.css";
import { useDispatch, useSelector } from "react-redux";
import { setBillData } from "../../lib/redux/timeSlice";
import { toast } from "react-toastify";
const Menu = () => {
  const dispatch = useDispatch();
  const { billData } = useSelector((state) => state.time);
  const [menuData, setMenuData] = useState(null);
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch("/api/jobs");
        const data = await response.json();
        setMenuData(data.jobs);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenuData();
  }, []);

  const handleClick = (item) => {
    if (item) {
      const newItem = { ...item, key: Date.now() };
      const updatedData = [...billData, newItem];
      dispatch(setBillData(updatedData));
    }
    toast.success("Item added to Todo List!");
  };
  const handleDragStart = (event, item) => {
    event.dataTransfer.setData("application/json", JSON.stringify(item));
  };

  const renderMenuItems = (jobs) =>
    jobs && jobs.length > 0 ? (
      jobs.map((item) =>
        (userEmail && item.email) || (!userEmail && !item.email) ? (
          <div
            draggable="true"
            onDragStart={(event) => handleDragStart(event, item)}
            onClick={() => {
              handleClick(item);
            }}
            key={item._id}
            className="subMenu w-full grid grid-cols-2  m-auto border-dotted border-2 border-sky-950 p-3"
          >
            <h2 className=" text-left text-xl font-bold col-span-2 uppercase font-title">
              {item.name}
            </h2>
            <p className="text-left font-body">{item.description}</p>
            <p className="text-right font-body font-bold">
              {formatTime(item.time)}
            </p>
          </div>
        ) : null
      )
    ) : (
      <p>No jobs found.</p>
    );

  return (
    <div className="flex flex-col w-full lg:w-2/5 border-primary-400 border-2 bg-[#bdf9ffc7] rounded-3xl text-center  text-sky-950 mx-auto max-h-[800px] md:min-h-[800px] ">
      <h1 className=" text-5xl font-extrabold m-5 font-sans">MENU</h1>

      <Tabs className={"grow m-3"}>
        <TabList className={"flex mb-0"}>
          <Tab className={"grow p-1 hover:cursor-pointer"}>All</Tab>
          <Tab className={"grow p-1 hover:cursor-pointer"}>Short</Tab>
          <Tab className={"grow p-1 hover:cursor-pointer"}>Medium</Tab>
          <Tab className={"grow p-1 hover:cursor-pointer"}>Long</Tab>
        </TabList>
        <div className="md:h-[600px] overflow-auto styleScroll">
          <TabPanel>
            <div className="menu-wrapper  m-auto flex flex-col grow gap-4 p-5 bg-slate-50 rounded-b-sm active-content overflow-hidden">
              {renderMenuItems(
                menuData && menuData.filter((item) => userEmail === item.email)
              )}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="menu-wrapper  m-auto flex flex-col gap-4 p-5 bg-slate-50 rounded-lg">
              {renderMenuItems(
                menuData &&
                  menuData.filter((item) =>
                    userEmail === item.email ? item.time < 30 : null
                  )
              )}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="menu-wrapper  m-auto flex flex-col gap-4 p-5 bg-slate-50 rounded-lg">
              {renderMenuItems(
                menuData &&
                  menuData.filter((item) =>
                    userEmail === item.email
                      ? item.time > 30 && item.time <= 60
                      : null
                  )
              )}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="menu-wrapper  m-auto flex flex-col gap-4 p-5 bg-slate-50 rounded-b-lg rounded-l-lg">
              {renderMenuItems(
                menuData &&
                  menuData.filter((item) =>
                    userEmail === item.email ? item.time > 60 : null
                  )
              )}
            </div>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default Menu;
