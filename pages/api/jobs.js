import { NextResponse } from "next/server";
import connectMongo from "../../connectDB";
import Job from "../../models/jobs";
import nc from "next-connect";

const handler = nc().use((req, res, next) => {
  switch (req.method) {
    case "POST":
      handlePost(req, res);
      break;
    case "GET":
      handleGet(req, res);
      break;
    case "PUT":
      handlePut(req, res);
      break;
    case "DELETE":
      handleDelete(req, res);
      break;
    default:
      NextResponse.error();
      break;
  }
});

async function handlePost(req, res) {
  const { name, description, time } = req.body;
  await connectMongo();
  await Job.create({ name, description, time });
  return res.json({ message: "Job Created" }, { status: 201 });
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
  // const jobs = await Job.find();
  // return res.json({ jobs });
}
async function handlePut(req, res) {
  const id = req.query.id;
  const { name, description, time } = req.body;
  await connectMongo();
  await Job.findByIdAndUpdate(id, { name, description, time });
  return NextResponse.json({ message: "Job updated" }, { status: 200 });
}
async function handleDelete(req, res) {
  const id = req.query.id;
  await connectMongo();
  await Job.findByIdAndDelete(id);
  return res.json({ message: "Job deleted" }, { status: 200 });
}

export default handler;
