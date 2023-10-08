"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTodenu() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description) {
      alert("Title and description are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/jobs", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, description, time }),
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
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Todenu Title"
      />

      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Todenu Description"
      />

      <input
        onChange={(e) => setTime(e.target.value)}
        value={time}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Todenu Time"
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
