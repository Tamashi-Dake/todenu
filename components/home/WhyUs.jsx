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
      className=" flex flex-col  justify-between gap-4  pt-8 md:max-w-[80%] m-auto"
    >
      <h2 className="text-center text-5xl font-extrabold text-indigo-400">
        Why Todenu?
      </h2>
      <div className="reason grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col justify-start items-center gap-4 bg-[#e8eefd] rounded-md p-4 tranform hover:-translate-y-1 hover:shadow-xl transition duration-500 ease-in-out group">
          <AlarmClock
            size={100}
            className="text-[#60a5fa] group-hover:text-[#397fd6] tranform ease-linear transition duration-500"
          />
          <h5 className="text-xl font-bold text-gray-800 transition duration-500 group-hover:scale-110">
            Save Time
          </h5>
          <p className="text-sm poppins">
            No need to waste hours figuring out how to manage your time. Choose
            Todenu right away!
          </p>
        </div>
        <div className="flex flex-col justify-start items-center gap-4 bg-[#e8eefd] rounded-md p-4 tranform hover:-translate-y-1 hover:shadow-xl transition duration-500 ease-in-out group">
          <ShieldCheck
            size={100}
            className="text-[#60a5fa] group-hover:text-[#397fd6] tranform ease-linear transition duration-500"
          />
          <h5 className="text-xl font-bold text-gray-800 transition duration-500 group-hover:scale-110">
            Absolute Privacy
          </h5>
          <p className="text-sm poppins">
            NO information about you or your tasks is collected. Your data can
            only be accessed by you.
          </p>
        </div>
        <div className="flex flex-col justify-start items-center gap-4 bg-[#e8eefd] rounded-md p-4 tranform hover:-translate-y-1 hover:shadow-xl transition duration-500 ease-in-out group">
          <BadgeCheck
            size={100}
            className="text-[#60a5fa] group-hover:text-[#397fd6] tranform ease-linear transition duration-500"
          />
          <h5 className="text-xl font-bold text-gray-800 transition duration-500 group-hover:scale-110">
            It's Simple
          </h5>
          <p className="text-sm poppins">
            Fill the times, select your tasks, and there you have it! Your own
            timings schedule for a brand new day!
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
