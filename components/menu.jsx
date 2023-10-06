import { useEffect, useState } from "react";

const Menu = () => {
  const [menuData, setMenuData] = useState(null);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/jobs");
        const data = await response.json();
        setMenuData(data.jobs);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenuData();
  }, []);

  return (
    <div className=" md:col-span-3 sm:col-span-1 min-w-[90%] bg-[#cbc5b4] rounded-3xl text-center m-8 ">
      <h1 className="text-5xl font-bold m-8">Menu</h1>
      <div className="menu-wrapper grid grid-cols-2 gap-4 p-5">
        {menuData && menuData.length > 0 ? (
          menuData.map((item) => (
            <div
              key={item._id}
              className="subMenu m-auto min-w-full grid grid-cols-2"
            >
              <h2 className="text-xl font-bold col-span-2 ">{item.name}</h2>
              <p className="text-left">{item.description}</p>
              <p className="text-right">{item.time} minutes</p>
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
