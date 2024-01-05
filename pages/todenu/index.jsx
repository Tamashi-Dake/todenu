import { useEffect, useState } from "react";
import Link from "next/link";
import RemoveBtn from "../../components/todenu/DeleteJobBtn";
import { Edit, BadgePlus } from "lucide-react";
import { useSession } from "next-auth/react";
import ComboBox from "../../components/todenu/ComboBox";
import Search from "../../components/todenu/Search";

export default function Todenu() {
  const { data: session, status } = useSession({ required: true });
  const [menuData, setMenuData] = useState(null);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch("/api/jobs");
        const data = await response.json();
        // Lọc chỉ lấy các mục có email trùng khớp với email đang đăng nhập
        const filteredData = data.jobs.filter(
          (item) => item.email === session.user.email
        );
        setMenuData(filteredData);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenuData();
  }, [session]);

  if (status === "loading")
    return (
      <>
        <div className="skeleton mx-auto">
          <h1>Loading...</h1>
        </div>
      </>
    );
  return (
    <>
      <div className="flex justify-between mx-auto w-full xl:w-[50%] lg:w-[80%] md:w-[80%]">
        <div className="flex">
          <Search />
          <ComboBox />
        </div>

        <Link
          className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 h-max rounded flex gap-1 px-2 m-2"
          href="/todenu/addTodenu"
        >
          <BadgePlus />
          Add Todenu
        </Link>
      </div>

      {menuData && menuData.length > 0 ? (
        menuData.map((item) => (
          <div
            key={item._id}
            className="p-4 border w-full border-slate-300 my-3 mx-auto flex justify-between gap-5 items-start xl:w-[50%] lg:w-[80%] md:w-[80%]"
          >
            <div>
              <h2 className="font-bold text-2xl">{item.name}</h2>
              <div>{item.description}</div>
              <p className="text-right font-body font-bold">
                {item.time} minutes
              </p>
            </div>

            <div className="flex gap-2">
              <Link href={`/todenu/editTodenu/${item._id}`}>
                <Edit size={24} />
              </Link>
              <RemoveBtn id={item._id} />
            </div>
          </div>
        ))
      ) : (
        <p>No jobs found. Click Add Todenu to add some works</p>
      )}
    </>
  );
}
