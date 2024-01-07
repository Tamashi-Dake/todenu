"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import User from "../../models/users";
import { getMinutes, validateTime } from "../../lib/timeUtils";
import { toast } from "react-toastify";
export default function AddTodenu() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState();

  const { status, data: session } = useSession();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !time) {
      // toast.error("Please fill all fields");
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          time: getMinutes(time),
          email: session?.user?.email,
        }),
      });
      if (res.ok) {
        router.push("/todenu");
      } else {
        throw new Error("Failed to create a todenu");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-3xl text-black text-center break-all">
          Add Todenu
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-slate-500 px-2 py-2 mb-4"
              type="text"
              placeholder="Todenu Title"
              maxLength={80}
            />
            <label htmlFor="description" className="text-xl pt-2">
              Description
            </label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-slate-500 px-2 py-2 mb-4"
              type="text"
              placeholder="Todenu Description"
              maxLength={150}
            />
            <label htmlFor="time" className="text-xl pt-2">
              Time
            </label>
            <input
              value={time}
              onChange={(e) => {
                setTime(validateTime(e.target.value));
              }}
              className="border border-slate-500 px-2 py-2 mb-4"
              placeholder="Todenu Time (hour:minute)"
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-green-600 font-bold text-white py-3 px-6"
          >
            Add Todenu
          </button>
        </div>
      </form>
    </>
  );
}
