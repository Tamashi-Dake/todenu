const mongoose = require("mongoose");

async function connectMongo() {
  try {
    // dotenv dell hoạt động
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("CONNECTED");
  } catch (error) {
    console.log("Error");
    console.log(error);
  }
}

export default connectMongo;
