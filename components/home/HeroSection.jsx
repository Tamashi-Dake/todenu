"use client";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";

const MyComponent = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <section className="flex flex-col gap-5 md:gap-20 md:flex-row justify-center items-center  h-[450px] md:h-[80vh]   mx-auto">
      <div className="hero-text w-full lg:w-[500px] flex flex-col justify-center gap-4 md:gap-10 ">
        <h1 className="items-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center text-ellipsis overflow-hidden ">
          Manage Your Time & Tasks With{" "}
          <span className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            TODENU
          </span>
        </h1>
        <p className="text-center ">Maintain your workflow with ease</p>
      </div>
      <div className="hero-img w-full lg:w-[300px] relative h-[50%] flex items-center">
        <img
          src="https://i.pinimg.com/originals/2a/53/65/2a53651a35816f499270d8275fd5318f.gif"
          alt=""
          className="w-full mt-10 md:mt-0 h-[300px] md:h-[400px] object-cover object-center opacity-90 rounded-md"
        />
        <button
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white p-1 md:px-4 md:py-4 rounded-full"
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
    </section>
  );
};

export default MyComponent;
