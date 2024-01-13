import { ChevronUp } from "lucide-react";
import React, { useState } from "react";

const FaqAccordion = () => {
  const [Faqs, setFaqs] = useState([
    {
      question: "How does Todenu work?",
      answer:
        "Todenu is a productivity app that helps you plan your day by creating a personalized workflow. You can add your tasks, set your free time and break times and Todenu will create a workflow for you.",
      open: false,
    },
    {
      question: "How do I use Todenu?",
      answer:
        "You can use Todenu by creating an account and logging in. You can add your tasks, set your free time and break times and Todenu will create a workflow for you.",
      open: false,
    },
    {
      question: "How much does Todenu cost?",
      answer:
        "Todenu is free to use. You can log in and start using it right away.",
      open: false,
    },
  ]);
  return (
    <div className="faq-accordion flex flex-col lg:flex-row justify-between  gap-4   rounded-lg md:max-w-[80%] m-auto">
      <div className="faqTitle pt-8 flex flex-col lg:max-w-[400px] gap-5 md:pl-4 ">
        <h2 className="text-2xl md:text-5xl popin font-extrabold text-cyan-500">
          FAQ
        </h2>
        <p className="poppins text-xl">
          Answers to some questions you might have.
        </p>
      </div>
      <div className="faqQuestions lg:pl-8 flex flex-col lg:w-[60%] gap-2 poppins ">
        {Faqs.map((faq, index) => (
          <div
            key={index}
            className={`faqQuestion bg-[#e8edf8] flex flex-col cursor-pointer transform origin-top shadow-sm gap-4 py-4 md:p-4 
            ${index === Faqs.length - 1 ? "" : "border-b-2 border-gray-300"}`}
            onClick={() => {
              const newFaqs = [...Faqs];
              newFaqs[index].open = !newFaqs[index].open;
              setFaqs(newFaqs);
            }}
          >
            <div className="flex justify-between items-center ">
              <h3 className="text-xl font-semibold">{faq.question}</h3>
              <button>
                <ChevronUp
                  size={24}
                  className={`${
                    faq.open ? "  rotate-180" : ""
                  } transform transition-all duration-300 text-cyan-500`}
                />
              </button>
            </div>
            <p
              className={`poppins  transition-all duration-300 ease-linear ${
                faq.open ? "h-full opacity-100" : "h-0 opacity-0 z-[-1]"
              }`}
            >
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqAccordion;
