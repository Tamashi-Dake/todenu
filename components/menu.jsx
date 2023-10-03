const Menu = () => {
  const menuData = {
    Breakfast: ["Breakfast Burrito", "Breakfast Sandwich", "Breakfast Bowl"],
    Lunch: ["Lunch Burrito", "Lunch Sandwich", "Lunch Bowl"],
    Dinner: ["Dinner Burrito", "Dinner Sandwich", "Dinner Bowl"],
  };
  return (
    <div className="md:col-span-3 sm:col-span-1 min-w-[90%] bg-white border border-gray-200 rounded-lg shadow text-center m-8">
      <h1 className="text-5xl font-bold m-8">Menu</h1>
      <div className="menu-wapper flex justify-around gap-4">
        {Object.entries(menuData).map(([category, items]) => (
          <div className="subMenu" key={category}>
            <h2 className="text-xl font-bold">{category}</h2>
            <ul>
              {items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
