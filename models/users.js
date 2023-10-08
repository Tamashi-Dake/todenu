import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});
let User;
// if model exists, use it, else create it
try {
  User = mongoose.model("User");
} catch {
  User = mongoose.model("User", userSchema);
}

export default User;
