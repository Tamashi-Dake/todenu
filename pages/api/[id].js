import connectMongo from "../../connectDB";
import Job from "../../models/jobs";
import { NextResponse } from "next/server";
import nc from "next-connect";

const handler = nc().use((req, res, next) => {
  switch (req.method) {
    case "PUT":
      handlePut(req, res);
      break;
    case "GET":
      handleGet(req, res);
      break;
    default:
      next();
      break;
  }
});

async function handlePut(req, res) {
  try {
    const { id } = req.query;
    const { name, description, time } = req.body;
    await connectMongo();
    await Job.findByIdAndUpdate(id, {
      name: name,
      description: description,
      time: time,
    });
    return res.json({ message: "Job updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to update job" });
  }
}
async function handleGet(req, res) {
  await connectMongo();
  const id = req.query.id;
  // Truy vấn bản ghi cụ thể dựa trên id
  const job = await Job.findById(id);
  return res.json({ job });
}

export default handler;
