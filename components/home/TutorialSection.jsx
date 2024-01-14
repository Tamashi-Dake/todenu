import React from "react";

const TutorialSection = () => {
  return (
    <div
      id="tutorial"
      className=" flex flex-col my-16 mx-5 lg:flex-row justify-between lg:items-start bg-[#dce5f9] gap-4 p-4 pt-8 rounded-lg md:max-w-[80%] md:mx-auto"
    >
      <div className="tutorialTitle flex flex-col lg:w-[50%] gap-5 md:pl-8 ">
        <h2 className="text-3xl md:text-4xl font-extrabold text-cyan-500">
          How Does it Work?
        </h2>
        <p className="poppins">Get your personalized workflow in 4 steps.</p>
      </div>
      <div className="tutorialSteps grid grid-cols-1 md:grid-cols-[0.5fr,0.5fr] gap-5 poppins lg:max-w-[60%] md:pl-4">
        <div className="flex flex-col gap-2 ">
          <h3 className="text-2xl  font-extrabold text-cyan-500">Step 1</h3>
          <p>
            Log in and start adding your tasks in Todenu. When you are done,
            head back to Home page.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl  font-extrabold text-cyan-500">Step 2</h3>
          <p>
            Fill in your free time and break times according to your own
            preferences. Just need to type 4 numbers for both hours and minutes
            and you are good to go.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl  font-extrabold text-cyan-500">Step 3</h3>
          <p>
            Select tasks from the Menu to add them to your workflow, reorder
            tasks in Bill by dragging them.
            <span className="opacity-0 hover:opacity-100 transition-all ease-in-out duration-1000">
              You can even drag tasks from the Menu to the Bill section.
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl  font-extrabold text-cyan-500">Step 4</h3>
          <p>
            Happy with the Bill? Press on “Checkout” and your workflow is ready
            just for you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TutorialSection;
