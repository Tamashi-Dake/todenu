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
    <div className="  min-w-[30%] max-w-[45%] bg-[#cbc5b4] rounded-3xl text-center m-8 text-sky-950">
      <h1 className="font-title text-5xl font-bold m-8">MENU</h1>

      <div className="border-b-2 border-sky-950 mx-2"></div>
      <div className="menu-wrapper grid grid-cols-2 gap-4 p-5">
        {menuData && menuData.length > 0 ? (
          menuData.map((item) => (
            <div
              key={item._id}
              className="subMenu m-auto min-w-full grid grid-cols-2"
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
