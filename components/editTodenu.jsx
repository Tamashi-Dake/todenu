"use client";

import { useState } from "react";
import { useRouter } from "next/router"; // Sửa thành next/router thay vì next/navigation

export default function EditJobForm({ id: jobId, name, description, time }) {
  // Đổi tên biến id thành jobId để tránh trùng tên
  const router = useRouter();
  const { id } = router.query;
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newTime, setNewTime] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/${jobId}`, {
        // Sử dụng jobId thay vì id
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newName, newDescription, newTime }),
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

  return (
    <form className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewName(e.target.value)}
        value={newName}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Job Title"
      />

      <input
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Job Description"
      />
      <input
        onChange={(e) => setNewTime(e.target.value)}
        value={newTime}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Job Time"
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Update Job
      </button>
    </form>
  );
}
