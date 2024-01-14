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
    <div className="grid md:grid-cols-2 gap-5 gap-x-20 py-16 pt-5 px-5  md:max-h-[1000px] mt-5 mx-auto md:max-w-[90%] lg:max-w-[80%] ">
      <div className="hero-text  flex flex-col justify-center gap-4 md:gap-14 ">
        <h1 className="flex flex-col justify-center  text-5xl lg:text-6xl font-bold text-center md:text-left text-ellipsis overflow-hidden gap-4 ">
          <span className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            TODENU
          </span>
          <div className="hero-info h-28 md:h-auto">
            <p>Manage Your</p>
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed once, initially
                "Time",
                2500,
                "Tasks",
                2500,
                "Progress",
                2500,
                "Workflow",
                3500,
              ]}
              speed={20}
              style={{ fontSize: "1em", lineHeight: "1.3" }}
              repeat={Infinity}
            />
          </div>
        </h1>
        <p className="text-center md:text-left text-xl pt-2 tracking-tight md:tracking-wider">
          Enjoy the tasks you choose for the time you have.
        </p>

        <div className="heroBtns flex justify-evenly md:justify-start gap-8 items-center">
          <Link
            href="#tutorial"
            className="
          bg-blue-400  text-white px-4 py-4 rounded-md font-semibold text-sm md:text-base tranform hover:-translate-y-1 hover:shadow-xl transition duration-500 ease-in-out
          "
          >
            How does it work?
          </Link>
          <div className="btnPlayWrapper relative">
            <button
              className="heroBtn  bg-blue-500 text-white p-4 rounded-full tranform hover:rotate-[360deg] hover:scale-110 transition duration-500 ease-in-out"
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
              {/* <span className="
              hidden md:inline-block">Play Video
              </span> */}
            </button>
          </div>
        </div>
      </div>
      <div className="hero-img w-full relative  flex items-center">
        <img
          src="https://i.pinimg.com/originals/2a/53/65/2a53651a35816f499270d8275fd5318f.gif"
          alt=""
          className="w-full mt-10 md:mt-0 h-[300px] md:h-[500px] object-cover object-center opacity-90 rounded-md"
        />
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
      {/* scroll down animation */}
      <motion.div
        className="col-span-2 h-10 rounded-full cursor-pointer hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.5, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 15, 15, 0], opacity: [1, 0, 0, 0] }}
          // whileHover={{ scale: 1.1, opacity: 1 }}
          transition={{ repeat: 7, duration: 3, ease: "easeInOut" }}
        >
          <Link href="#playground" title="Scroll to see more">
            <Mouse size={30} className="mx-auto" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MyComponent;
