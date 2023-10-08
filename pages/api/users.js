import { NextResponse } from "next/server";
import connectMongo from "../../connectDB";
import User from "../../models/users";
import nc from "next-connect";

const handler = nc().use((req, res, next) => {
  switch (req.method) {
    case "POST":
      handlePost(req, res);
      break;
    case "GET":
      handleGet(req, res);
      break;
    default:
      NextResponse.error();
      break;
  }
});

async function handlePost(req, res) {
  const { name, email } = req.body;
  await connectMongo();
  await User.create({ name, email });
  return res.json({ message: "User Registered" }, { status: 201 });
}

async function handleGet(req, res) {
  await connectMongo();
  const id = req.query.id;

  if (id) {
    // Truy vấn bản ghi cụ thể dựa trên id
    const user = await User.findById(id);
    return res.json({ user });
  } else {
    // Truy vấn tất cả các bản ghi
    const users = await User.find();
    return res.json({ users });
  }
}

export default handler;
