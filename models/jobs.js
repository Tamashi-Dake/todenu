import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema({
  name: { type: String },
  description: { type: String },
  time: { type: Number },
});

let Job;
try {
  Job = mongoose.model("Job");
} catch {
  Job = mongoose.model("Job", jobSchema);
}

export default Job;
