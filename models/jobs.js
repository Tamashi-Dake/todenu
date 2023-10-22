import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema({
  name: { type: String },
  description: { type: String },
  time: { type: Number },
  email: { type: String },
});

let Job;
// if model exists, use it, else create it
try {
  Job = mongoose.model("Job");
} catch {
  Job = mongoose.model("Job", jobSchema);
}

export default Job;
