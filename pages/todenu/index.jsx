import { useEffect, useState } from "react";
import Link from "next/link";
import RemoveBtn from "../../components/DeleteJobBtn";
import { Edit, BadgePlus } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Todenu() {
  const { data: session, status } = useSession({ required: true });
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

  if (status === "authenticated") {
    return (
      <>
        <div className="flex items-center">
          <h1 className="font-title text-5xl font-bold m-8">Your Todenu</h1>
          <Link
            className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 h-max rounded flex gap-1 px-2 m-2"
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
              className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
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
          <p>No jobs found.</p>
        )}
      </>
    );
  } else if (status === "loading") {
    return <p>Loading...</p>;
  }
}
