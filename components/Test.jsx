import { useEffect, useState } from "react";
import AddModal from "./todenu/AddModal";

export default function Example() {
  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0 bg-slate-400 m-auto">
      <AddModal />
    </div>
  );
}
