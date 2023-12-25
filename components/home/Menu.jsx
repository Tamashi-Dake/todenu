import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Menu = () => {
  const [menuData, setMenuData] = useState(null);
  const { data: session } = useSession();
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

    const defaultTab = document.querySelector("#default-tab");
    defaultTab.click();
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
            onDragStart={(event) => handleDragStart(event, item)}
            key={item._id}
            className="subMenu min-w-full grid grid-cols-2 border-dotted border-2 border-sky-950 p-3"
          >
            <h2 className=" text-left text-xl font-bold col-span-2 uppercase font-title">
              {item.name}
            </h2>
            <p className="text-left font-body">{item.description}</p>
            <p className="text-right font-body font-bold">
              {item.time} minutes
            </p>
          </div>
        ) : null
      )
    ) : (
      <p>No jobs found.</p>
    );

  return (
    <div className=" w-2/5 bg-[#cbc5b4] rounded-3xl text-center  text-sky-950 mx-auto min-h-[500px]">
      <h1 className="font-title text-5xl font-bold m-8">MENU</h1>

      <Tabs className="bg-[#cbc5b4] rounded-3xl">
        <TabsList className="">
          <TabsTrigger
            id="default-tab"
            value="shortTodenu"
            className="focus:bg-gray-50"
          >
            Short
          </TabsTrigger>
          <TabsTrigger value="mediumTodenu" className="focus:bg-gray-50">
            Medium
          </TabsTrigger>
          <TabsTrigger value="longTodenu" className="focus:bg-gray-50">
            Long
          </TabsTrigger>
        </TabsList>
        <div className="border-b-2 border-sky-950 mx-2"></div>

        <TabsContent value="shortTodenu">
          <div className="menu-wrapper flex flex-col gap-4 p-5">
            {renderMenuItems(
              menuData && menuData.filter((item) => item.time < 30)
            )}
          </div>
        </TabsContent>
        <TabsContent value="mediumTodenu">
          <div className="menu-wrapper flex flex-col gap-4 p-5">
            {renderMenuItems(
              menuData &&
                menuData.filter((item) => item.time > 30 && item.time <= 60)
            )}
          </div>
        </TabsContent>
        <TabsContent value="longTodenu">
          <div className="menu-wrapper flex flex-col gap-4 p-5">
            {renderMenuItems(
              menuData && menuData.filter((item) => item.time > 60)
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Menu;
