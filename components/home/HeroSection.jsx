"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mouse } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
const buttonVariants = {
  animate: {
    scale: [1, 1.5, 1],
    opacity: [1, 0.5, 1],
    transition: {
      duration: 1,
      loop: Infinity,
    },
  },
};
const MyComponent = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="flex flex-col gap-5 md:gap-20 md:flex-row justify-around  items-center h-[450px] md:h-[80vh] md:max-h-[1000px] mt-5 mx-auto md:max-w-[80%] mb-4">
      {/* <motion.div
        className="absolute top-0 left-0 right-0 bottom-0 z-[-1]"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full transform rotate-180"
        >
          <path
            fill="#ffffff"
            fill-opacity="1"
            d="M0,192L48,192C96,192,192,192,288,181.3C384,171,480,149,576,154.7C672,160,768,192,864,186.7C960,181,1056,139,1152,144C1248,149,1344,203,1392,229.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </motion.div> */}
      <div className="hero-text w-full lg:w-[500px] flex flex-col justify-center gap-4 md:gap-14 ">
        <h1 className="flex flex-col justify-center  text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-ellipsis overflow-hidden gap-4">
          <span className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            TODENU
          </span>
          <div className="hero-info ">
            Easily Manage Your{" "}
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed once, initially
                "Time",
                2000,
                "Tasks",
                2000,
                "Progress",
                2000,
                "Workflow",
                3000,
              ]}
              speed={20}
              style={{ fontSize: "1em", lineHeight: "1.3" }}
              repeat={Infinity}
            />
          </div>
        </h1>
        <p className="text-center text-xl ml-4 pt-2 tracking-tight md:tracking-wider">
          Maintain your workflow with ease
        </p>

        <div className="heroBtns flex justify-around items-center">
          <Link
            href="#tutorial"
            className="
          bg-blue-400  text-white px-4 py-2 rounded-md font-semibold text-sm md:text-base"
          >
            How does it work?
          </Link>

          {/* scroll down animation */}
          <motion.div
            className=" w-10 h-10 rounded-full cursor-pointer hidden md:block"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Link href="#playground" title="Scroll to see more">
              <Mouse size={30} />
            </Link>
          </motion.div>
        </div>
      </div>
      <div className="hero-img w-full lg:w-[400px] relative h-[50%] flex items-center">
        <img
          src="https://i.pinimg.com/originals/2a/53/65/2a53651a35816f499270d8275fd5318f.gif"
          alt=""
          className="w-full mt-10 md:mt-0 h-[300px] md:h-[400px] object-cover object-center opacity-90 rounded-md"
        />
        <button
          className="heroBtn absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white p-1 md:px-4 md:py-4 rounded-full "
          onClick={() => setOpenModal(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline-block "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
        {/* <motion.button
          className="absolute overflow-hidden top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 after:inset-0 p-1 md:px-4 md:py-4 rounded-full bg-slate-50 after:bg-blue-500 after:opacity-50"
          variants={buttonVariants}
          initial="animate"
          animate="animate"
          onClick={() => setOpenModal(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline-block "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </motion.button> */}
      </div>
      {openModal ? (
        <div
          className="fixed inset-0 z-50 bg-[rgba(35,35,35,0.93)]"
          bis_skin_checked="1"
        >
          <div
            tabindex="-1"
            role="dialog"
            aria-label="Example Modal"
            aria-modal="true"
            className="absolute inset-0 border-none bg-transparent  p-0  flex items-center justify-center"
            bis_skin_checked="1"
            onClick={() => setOpenModal(false)}
          >
            <div
              class="modal-outer w-full text-center py-[40px] px-[15px]"
              bis_skin_checked="1"
            >
              <div
                class="close-btn absolute top-[30px] text-[30px] right-[30px] w-[44px] h-[44px] flex items-center justify-center cursor-pointer text-white "
                bis_skin_checked="1"
                onClick={() => setOpenModal(false)}
              >
                ×
              </div>
              <div class="modal-inner  w-auto max-w-full" bis_skin_checked="1">
                <div
                  class="md:w-full max-w-[70%] relative rounded mx-auto"
                  bis_skin_checked="1"
                >
                  <div class="fit-video" bis_skin_checked="1">
                    <iframe
                      width="100%"
                      height="100%"
                      className="shadow-[0_0_8px_rgba(0,0,0,0.06)]"
                      controls=""
                      src="https://www.youtube.com/embed/tjXMrIx1yWE?autoplay=0&muted=1&si=z5e5JT6x5MsFRGds"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen=""
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* <motion.div
        className="absolute bottom-0 left-0 right-0 z-[-1]"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        // transition={{ duration: 0.5 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full"
        >
          <path
            fill="#ffffff"
            fill-opacity="1"
            d="M0,192L48,192C96,192,192,192,288,181.3C384,171,480,149,576,154.7C672,160,768,192,864,186.7C960,181,1056,139,1152,144C1248,149,1344,203,1392,229.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </motion.div> */}
    </div>
  );
};

export default MyComponent;
