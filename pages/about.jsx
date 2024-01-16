import { useState } from "react";
import AnimateSection from "../components/AnimateSection";
import Email from "../components/about/Email";
const About = () => {
  const [isSent, setIsSent] = useState(false);

  const handleSent = () => {
    setIsSent(!isSent);
    console.log(isSent);
  };
  return (
    <>
      <AnimateSection>
        <div className="flex flex-col items-center justify-center mt-5 md:pt-5">
          <div className="flex flex-col-reverse md:flex-row justify-center items-center p-5 pb-0 ">
            <div className="md:w-[50%] md:h-96 overflow-hidden">
              <img
                src="https://i.imgur.com/PtcnmDg.jpeg"
                alt=""
                className="w-full h-full object-cover object-center overflow-clip hover:scale-110 transition duration-500 ease-in-out"
              />
            </div>
            <div className="flex flex-col md:w-[50%] max-w-[400px] p-5">
              <h1 className="text-4xl font-bold text-center">About TODENU</h1>
              <p className="mt-4 text-xl ">
                <span className="font-bold">TODENU</span> (aka{" "}
                <span className="font-bold">Code Menu</span>) is a website
                allowing you to create a task list for your limited freetime you
                have. Back when i just started learning programming, i was
                always confused about what to do next. I had a lot of ideas but
                i didn't know where to start. In the end, i learned that i just
                need to start moving forward no matter how small the step is.
              </p>
            </div>
          </div>
        </div>
      </AnimateSection>
      <AnimateSection>
        <div className="flex flex-col items-center justify-center ">
          <div className="flex flex-col-reverse md:flex-row-reverse justify-center items-center p-5 pt-0 ">
            <div className="md:w-[50%] md:h-96 overflow-hidden">
              <img
                src="
              /Untitled.png
            "
                alt=""
                className="w-full h-full object-cover object-center overflow-clip hover:scale-110 transition duration-500 ease-in-out"
              />
            </div>
            <div className="flex flex-col md:w-[50%] m-10 md:m-0">
              <h1 className="text-4xl font-bold text-center">Inspiration</h1>

              <p className="mt-4 text-xl  max-w-[400px] p-5">
                <span className="font-bold">TODENU</span> was inspired by Coding
                Menu from @bigboxSWE. I thought it was a really good idea to
                have a system to organize your time and tasks. So i decided to
                create my own version of it. Hope you will find this website
                useful.
              </p>
              <div className="techList flex "></div>
            </div>
          </div>
        </div>
      </AnimateSection>

      {/* contact me section */}
      <AnimateSection>
        {!isSent ? (
          <div
            id="contact"
            className="flex flex-col items-center justify-center py-5"
          >
            <Email isSent={isSent} handleSent={handleSent} />
          </div>
        ) : (
          <div
            id="contact"
            className="flex flex-col items-center justify-center py-5"
          >
            <h1 className="text-3xl font-bold text-center">
              Thank you for contacting me
            </h1>
            <p className="mt-4 text-xl text-center">
              I will get back to you as soon as possible
            </p>
          </div>
        )}
      </AnimateSection>
    </>
  );
};

About.title = "About";
export default About;
