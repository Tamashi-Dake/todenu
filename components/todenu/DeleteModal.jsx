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
import { BadgePlus, Trash, X } from "lucide-react";
import { getMinutes, validateTime } from "../../lib/timeUtils";
export default function DeleteModal({ open, handleDeleteOpen, id, name }) {
  // useEffect(() => {
  //   if (open) {
  //     setName();
  //   }
  // }, [open]);

  const removeTopic = async () => {
    const res = await fetch(`/api/jobs?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      handleDeleteOpen();
    }
  };
  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={handleDeleteOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <div
              className=" flex justify-between items-center
            "
            >
              <Typography variant="h4" color="blue-gray">
                Delete Task
              </Typography>
              <button className="close" onClick={handleDeleteOpen}>
                <X />
              </button>
            </div>
            <Typography color="blue-gray">
              Are you sure you want to delete this task?
              <p
                className="
              text-ellipsis overflow-hidden  
              "
              >
                {name}
              </p>
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              className="flex justify-center items-center gap-2 bg-red-400"
              onClick={removeTopic}
              fullWidth
            >
              <Trash />
              <span className="text-sm leading-3">Delete Task</span>
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
