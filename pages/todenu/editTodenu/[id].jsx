import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getMinutes, validateTime, formatTime } from "../../../lib/timeUtils";
const getJobById = async (id) => {
  try {
    const res = await fetch(`/api/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch job");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default function EditJob() {
  const router = useRouter();
  const { id } = router.query;
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newTime, setNewTime] = useState(0);
  const previousLabel = newName;
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newName || !newDescription || !newTime) {
      // toast.error("Please fill all fields");
      alert("Please fill all fields");
      return;
    }
    try {
      const res = await fetch(`/api/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          newName,
          newDescription,
          newTime: getMinutes(newTime),
        }),
      });
      if (res.ok) {
        router.push("/todenu");
      } else {
        throw new Error("Failed to update a todenu");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      const { job } = await getJobById(id);
      const { name, description, time } = job;
      setNewName(name);
      setNewDescription(description);
      setNewTime(formatTime(time));
    };

    fetchJob();
  }, [id]);

  return (
    <>
      <div>
        <h1 className="text-3xl text-black text-center break-all">
          Update Todenu
        </h1>
      </div>
      <form onSubmit={handleSubmit} className=" mt-4">
        <div className="flex flex-col items-center">
          <div
            className="w-full grid grid-cols-[1fr,2fr] md:w-[80%] lg:w-[50%] md:grid-cols-[min-content,auto]  gap-4
        "
          >
            <label htmlFor="name" className="text-xl  pt-2">
              Name
            </label>
            <input
              name="name"
              onChange={(e) => setNewName(e.target.value)}
              value={newName}
              className="border border-slate-500 px-2 py-2 mb-4 "
              type="text"
              placeholder="Todenu Title"
              maxLength={80}
            />

            <label htmlFor="description" className="text-xl pt-2">
              Description
            </label>
            <input
              name="description"
              onChange={(e) => setNewDescription(e.target.value)}
              value={newDescription}
              className="border border-slate-500 px-2 py-2 mb-4"
              type="text"
              placeholder="Todenu Description"
              maxLength={150}
            />
            <label htmlFor="time" className="text-xl pt-2">
              Time
            </label>
            <input
              name="time"
              onChange={(e) => setNewTime(validateTime(e.target.value))}
              value={newTime}
              className="border border-slate-500 px-2 py-2 mb-4"
              placeholder="Todenu Time"
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button className="bg-green-600 font-bold text-white py-3 px-6 ">
            Update Todenu
          </button>
        </div>
      </form>
    </>
  );
}
