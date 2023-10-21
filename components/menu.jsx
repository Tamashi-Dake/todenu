import { useEffect, useState } from "react";

const Menu = () => {
  const [menuData, setMenuData] = useState(null);

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

  return (
    <div className="col-span-4 w-5/6 h-full bg-[#cbc5b4] rounded-3xl text-center  text-sky-950 m-auto">
      <h1 className="font-title text-5xl font-bold m-8">MENU</h1>

      <div className="border-b-2 border-sky-950 mx-2"></div>
      <div className="menu-wrapper flex flex-col gap-4 p-5">
        {menuData && menuData.length > 0 ? (
          menuData.map((item) => (
            <div
              draggable="true"
              onDragStart={(event) => handleDragStart(event, item)}
              key={item._id}
              className="subMenu min-w-full grid grid-cols-2 border-dotted border-2 border-sky-950 p-3"
            >
              <h2 className="text-xl font-bold col-span-2 uppercase font-title">
                {item.name}
              </h2>
              <p className="text-left font-body">{item.description}</p>
              <p className="text-right font-body font-bold">
                {item.time} minutes
              </p>
            </div>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default Menu;
