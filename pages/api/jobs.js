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
  console.log(email);
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
// async function handlePut(req, res) {
//   const id = req.query.id;
//   const { name, description, time } = req.body;
//   await connectMongo();
//   await Job.findByIdAndUpdate(id, { name, description, time });
//   return NextResponse.json({ message: "Job updated" }, { status: 200 });
// }
async function handleDelete(req, res) {
  const id = req.query.id;
  await connectMongo();
  await Job.findByIdAndDelete(id);
  return res.json({ message: "Job deleted" }, { status: 200 });
}

export default handler;

// import { NextResponse } from "next/server";
// import connectMongo from "../../connectDB";
// import Job from "../../models/jobs";
// import User from "../../models/users";
// import nc from "next-connect";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../pages/api/auth/[...nextauth]";
// import { headers } from "next/headers"
// const handler = nc().use((req, res, next) => {
//   switch (req.method) {
//     case "POST":
//       handlePost(req, res);
//       break;
//     case "GET":
//       handleGet(req, res);
//       break;
//     // case "PUT":
//     //   handlePut(req, res);
//     //   break;
//     case "DELETE":
//       handleDelete(req, res);
//       break;
//     default:
//       NextResponse.error();
//       break;
//   }
// });

// async function handlePost(req, res) {
//   const { name, description, time } = req.body;
//   await connectMongo();

//   // Lấy session từ request
//   const session = await getServerSession(req, res, authOptions);
//   console.log(session);
//   // Kiểm tra xem đã có session hay chưa
//   if (!session) {
//     // Session không tồn tại, trả về lỗi Unauthorized
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   // Lấy email từ session
//   const email = session.user.email;

//   // Tìm người dùng bằng email
//   const user = await User.findOne({ email });

//   // Kiểm tra xem người dùng có tồn tại hay không
//   if (!user) {
//     // Người dùng không tồn tại, xử lý lỗi tại đây
//     return res.status(404).json({ error: "User not found" });
//   }

//   // Tạo công việc mới với userId của người dùng
//   await Job.create({ name, description, time, userId: user._id });

//   // Trả về phản hồi thành công
//   return res.status(201).json({ message: "Job Created" });
// }

// async function handleGet(req, res) {
//   await connectMongo();
//   const id = req.query.id;

//   if (id) {
//     // Truy vấn bản ghi cụ thể dựa trên id
//     const job = await Job.findById(id);
//     return res.json({ job });
//   } else {
//     // Truy vấn tất cả các bản ghi
//     const jobs = await Job.find();
//     return res.json({ jobs });
//   }
// }

// async function handleDelete(req, res) {
//   const id = req.query.id;
//   await connectMongo();
//   await Job.findByIdAndDelete(id);
//   return res.json({ message: "Job deleted" }, { status: 200 });
// }

// export default handler;
