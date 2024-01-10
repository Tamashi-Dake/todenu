import {
  AlarmClock,
  Badge,
  BadgeCheck,
  ShieldCheck,
  ShieldX,
} from "lucide-react";
import React from "react";

const WhyUs = () => {
  return (
    <div
      id="whyus"
      className=" flex flex-col  justify-between gap-4  pt-8 max-w-[80%] m-auto"
    >
      <h2 className="text-center text-5xl font-extrabold text-indigo-400">
        Why Todenu?
      </h2>
      <div className="reason grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col justify-center items-center gap-4 bg-[#e8eefd] rounded-md p-4">
          <AlarmClock size={100} color="#60a5fa" />
          <h5 className="text-xl font-bold text-gray-800">Save Time</h5>
          <p className="text-sm">
            No need to waste hours figuring out how to manage your time. Choose
            Todenu right away!
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 bg-[#e8eefd] rounded-md p-4">
          <ShieldCheck size={100} color="#60a5fa" />
          <h5 className="text-xl font-bold text-gray-800">Absolute Privacy</h5>
          <p className="text-sm">
            NO information about you or your tasks is collected. And i don't
            know how to do that anyway.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 bg-[#e8eefd] rounded-md p-4">
          <BadgeCheck size={100} color="#60a5fa" />
          <h5 className="text-xl font-bold text-gray-800">It's Simple</h5>
          <p className="text-sm">
            Fill the times, select your tasks, and there you have it! Your own
            timings schedule for a brand new day!
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
