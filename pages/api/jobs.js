import { NextResponse } from "next/server";
import connectMongo from "../../connectDB";
import Job from "../../models/jobs";
import User from "../../models/users";
import nc from "next-connect";
import { getSession } from "next-auth/react";
const handler = nc().use((req, res, next) => {
  switch (req.method) {
    case "POST":
      handlePost(req, res);
      break;
    case "GET":
      handleGet(req, res);
      break;
    // case "PUT":
    //   handlePut(req, res);
    //   break;
    case "DELETE":
      handleDelete(req, res);
      break;
    default:
      NextResponse.error();
      break;
  }
});

async function handlePost(req, res) {
  const { name, description, time, email } = req.body;
  // console.log(email);
  await connectMongo();
  await Job.create({ name, description, time, email });
  return res.status(201).json({ message: "Job Created" });
}

async function handleGet(req, res) {
  await connectMongo();
  const id = req.query.id;

  if (id) {
    // Truy vấn bản ghi cụ thể dựa trên id
    const job = await Job.findById(id);
    return res.json({ job });
  } else {
    // Truy vấn tất cả các bản ghi
    const jobs = await Job.find();
    return res.json({ jobs });
  }
}

async function handleDelete(req, res) {
  const id = req.query.id;
  await connectMongo();
  await Job.findByIdAndDelete(id);
  return res.json({ message: "Job deleted" }, { status: 200 });
}

export default handler;
