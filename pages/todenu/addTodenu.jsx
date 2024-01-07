"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import User from "../../models/users";
import { getMinutes, validateTime } from "../../lib/timeUtils";
export default function AddTodenu() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState();

  const { status, data: session } = useSession();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !time) {
      alert("All infomations are required.");
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Todenu Title"
      />

      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Todenu Description"
      />

      <input
        value={time}
        onChange={(e) => {
          setTime(validateTime(e.target.value));
        }}
        className="border border-slate-500 px-8 py-2"
        placeholder="Todenu Time (hour:minute)"
      />

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Todenu
      </button>
    </form>
  );
}
