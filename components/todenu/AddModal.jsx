"use client";
import React, { use, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Textarea,
} from "@material-tailwind/react";
import { BadgePlus, X } from "lucide-react";
import { getMinutes, validateTime } from "../../lib/timeUtils";
import { get } from "http";

export default function AddModal({ open, handleAddOpen, session }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  useEffect(() => {
    if (open) {
      setName("");
      setDescription("");
      setTime("");
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !time) {
      // toast.error("Please fill all fields");
      alert("Please fill all fields");
      return;
    }
    if (getMinutes(time) == 0) {
      alert("Time must be greater than 0");
      return;
    }
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          time: getMinutes(time),
          email: session?.user?.email,
        }),
      });
      if (res.ok) {
        handleAddOpen();
      } else {
        throw new Error("Failed to create a todenu");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={handleAddOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <div
              className=" flex justify-between items-center
            "
            >
              <Typography variant="h4" color="blue-gray">
                Add Todenu
              </Typography>
              <button className="close" onClick={handleAddOpen}>
                <X />
              </button>
            </div>

            {/* <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Start creating your task list now.
            </Typography> */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Typography className="-mb-2" variant="h6">
                Task Name
              </Typography>
              <Input
                value={name}
                label="Name"
                size="lg"
                maxLength={80}
                onChange={(e) => setName(e.target.value)}
              />
              <Typography className="-mb-2" variant="h6">
                Task Description
              </Typography>
              <Textarea
                value={description}
                label="Description"
                size="lg"
                maxLength={150}
                onChange={(e) => setDescription(e.target.value)}
              />

              <Typography className="-mb-2" variant="h6">
                Time required
              </Typography>
              <Input
                value={time}
                label="Hour:Minute"
                size="lg"
                onChange={(e) => {
                  setTime(validateTime(e.target.value));
                }}
                maxLength={5}
              />
            </form>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              className="flex justify-center items-center gap-2 bg-blue-600"
              onClick={handleSubmit}
              fullWidth
            >
              <BadgePlus />
              <span className="text-sm leading-3">Add Task</span>
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
