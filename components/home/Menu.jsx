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
  const [isDraging, setIsDraging] = useState(false);
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
    toast.success("Item added to Todo List!", {
      icon: "📝",
    });
  };
  const handleDragStart = (event, item) => {
    setIsDraging(true);
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
            // onDragEnd={() => {              setIsDraging(false);            }}
            key={item._id}
            className={
              "subMenu  w-full grid grid-cols-[1fr,0.7fr] border-dotted border-2 border-sky-950 h-[6rem] bg-white rounded-md p-3 hover:cursor-pointer"
              // + (isDraging ? " draging" : "")
            }
          >
            <h2 className="h-[2rem] text-left text-xl font-bold col-span-2 uppercase font-title text-ellipsis overflow-hidden whitespace-nowrap">
              {item.name}
            </h2>
            <p className="text-left font-body text-ellipsis overflow-hidden whitespace-nowrap">
              {item.description}
            </p>
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
    <div className="flex flex-col w-full  border-primary-400 border-2 bg-[#BDD7EE] rounded-3xl text-center  text-sky-950  max-h-[800px] md:min-h-[800px] ">
      <h1 className=" text-5xl font-extrabold m-5 font-sans">MENU</h1>

      <Tabs className={"grow m-3"}>
        <TabList className={"flex mb-0"}>
          <Tab
            className={"grow p-1 hover:cursor-pointer md:text-xl text-base "}
          >
            All
          </Tab>
          <Tab
            className={"grow p-1 hover:cursor-pointer md:text-xl text-base "}
          >
            Short
          </Tab>
          <Tab
            className={"grow p-1 hover:cursor-pointer md:text-xl text-base "}
          >
            Medium
          </Tab>
          <Tab
            className={"grow p-1 hover:cursor-pointer md:text-xl text-base "}
          >
            Long
          </Tab>
        </TabList>
        <div className="md:h-[600px] h-[500px] overflow-auto styleScroll">
          <TabPanel>
            <div className="menu-wrapper m-auto flex flex-col grow gap-2 p-5 bg-[#DEEBF7] rounded-b-sm active-content overflow-hidden">
              {renderMenuItems(
                menuData && menuData.filter((item) => userEmail === item.email)
              )}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="menu-wrapper  m-auto flex flex-col grow gap-2 p-5 bg-[#DEEBF7] rounded-b-sm active-content overflow-hidden">
              {renderMenuItems(
                menuData &&
                  menuData.filter((item) =>
                    userEmail === item.email ? item.time < 30 : null
                  )
              )}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="menu-wrapper m-auto flex flex-col grow gap-2 p-5 bg-[#DEEBF7] rounded-b-sm active-content overflow-hidden">
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
            <div className="menu-wrapper  m-auto flex flex-col grow gap-2 p-5 bg-[#DEEBF7] rounded-b-sm active-content overflow-hidden">
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
