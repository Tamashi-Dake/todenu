"use client";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { set } from "date-fns";
import { Mail } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
const Email = ({ isSent, handleSent }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const emailRegex = /.*@.*\..*/;

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    // Handle form submission logic here
    setIsLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({ name, email, message }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      //   const data = await res.json();
      //   console.log(data);
      if (res.status === 200) {
        setName("");
        setEmail("");
        setMessage("");
        setIsLoading(false);
        handleSent();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
              className="bg-white"
              value={name}
              type="text"
              size="md"
              placeholder="Your name"
              onChange={handleNameChange}
            />
            <Typography className="" variant="h6">
              Your Email
            </Typography>
            <Input
              className="bg-white"
              type="email"
              size="md"
              placeholder="Your email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="flex flex-col gap-2 md:w-[50%]">
            <Typography className="" variant="h6">
              Your Message
            </Typography>
            <Textarea
              type="text"
              className="min-h-[158px] bg-white"
              placeholder="Your message"
              value={message}
              onChange={handleMessageChange}
            />
          </div>
        </form>
      </div>
      <div className=" flex flex-col items-center md:flex-row">
        <p className="md:w-[50%] text-gray-600">
          We are committed to protecting your privacy. We will never collect
          information about you without your explicit consent.
        </p>
        <Button
          className="flex m-2 w-full md:m-0 md:w-auto p-2 h-10 justify-center items-center gap-2 bg-blue-600 md:ml-auto"
          onClick={handleSubmit}
        >
          {isLoading ? (
            <div className="flex justify-center items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span className="text-sm leading-3">Sending</span>
            </div>
          ) : (
            <>
              <Mail size={20} />
              <span className="text-sm leading-3">Send</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Email;
