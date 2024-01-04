import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { formatTime } from "../../lib/timeUtils";
import "react-tabs/style/react-tabs.css";

const styles = {
  tabs: "flex flex-wrap -mb-px justify-center",
  tab: "me-2 inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-white hover:bg-cyan-600",
  tabActive:
    "me-2 inline-block p-4  border-b-2 border-blue-600 rounded-t-lg  hover:text-white hover:bg-cyan-600 active-tabs",
  tabContent: "bg-slate-50 rounded-lg active-content",
};
const Menu = () => {
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

  const handleDragStart = (event, item) => {
    event.dataTransfer.setData("application/json", JSON.stringify(item));
  };

  const renderMenuItems = (jobs) =>
    jobs && jobs.length > 0 ? (
      jobs.map((item) =>
        (userEmail && item.email) || (!userEmail && !item.email) ? (
          <div
            draggable="true"
            onClick={() => console.log("clicked")}
            onDragStart={(event) => handleDragStart(event, item)}
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
    <div className="flex flex-col w-2/5 bg-[#cbc5b4] rounded-3xl text-center  text-sky-950 mx-auto max-h-[800px] min-h-[800px]">
      <h1 className="font-title text-5xl font-bold m-5">MENU</h1>

      <Tabs className={"grow m-5"}>
        <TabList className={"mb-0"}>
          <Tab>All</Tab>
          <Tab>Short</Tab>
          <Tab>Medium</Tab>
          <Tab>Long</Tab>
        </TabList>
        <div className="h-[600px] overflow-auto">
          <TabPanel>
            <div className="menu-wrapper  m-auto flex flex-col grow gap-4 p-5 bg-slate-50 rounded-lg active-content overflow-hidden">
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
            <div className="menu-wrapper  m-auto flex flex-col gap-4 p-5 bg-slate-50 rounded-lg">
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
