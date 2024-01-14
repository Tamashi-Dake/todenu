import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import AnimateSection from "../components/AnimateSection";
import { Mail } from "lucide-react";
const About = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <>
      <AnimateSection>
        <div className="flex flex-col items-center justify-center mt-5 md:pt-5">
          <div className="flex flex-col-reverse md:flex-row justify-center items-center p-5 pb-0 ">
            <div className="md:w-[50%] md:h-96 overflow-hidden">
              <img
                src="
              /UI.jpg
            "
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
        <div
          id="contact"
          className="flex flex-col items-center justify-center py-5"
        >
          <div className="flex flex-col  p-5 gap-4 xl:max-w-[810px]">
            <div className="flex flex-col gap-4">
              <p className="m-4 text-xl text-center font-semibold ">
                If you have any questions, feel free to contact me
              </p>
              <form className="email flex flex-col md:flex-row  md:items-start gap-10">
                <div className="flex flex-col gap-5 md:w-[50%]">
                  <Typography className="" variant="h6">
                    Your Name
                  </Typography>
                  <Input
                    type="text"
                    color="lightBlue"
                    size="md"
                    outline={true}
                    placeholder="Your name"
                  />
                  <Typography className="" variant="h6">
                    Your Email
                  </Typography>
                  <Input
                    type="email"
                    color="lightBlue"
                    size="md"
                    outline={true}
                    placeholder="Your email"
                  />
                </div>
                <div className="flex flex-col gap-2 md:w-[50%]">
                  <Typography className="" variant="h6">
                    Your Message
                  </Typography>
                  <Textarea
                    type="text"
                    color="lightBlue"
                    outline={true}
                    className="min-h-40"
                    placeholder="Your message"
                  />
                </div>
              </form>
            </div>
            <div className=" flex flex-col md:flex-row">
              <p className="md:w-[50%] text-gray-600">
                We are committed to protecting your privacy. We will never
                collect information about you without your explicit consent.
              </p>
              <Button
                className="flex justify-center items-center gap-2 bg-blue-600 md:ml-auto"
                onClick={handleSubmit}
              >
                <Mail />
                <span className="text-sm leading-3">Send</span>
              </Button>
            </div>
          </div>
        </div>
      </AnimateSection>
    </>
  );
};

About.title = "About";
export default About;
