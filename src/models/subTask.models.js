import mongoose from "mongoose";

const subTaskSchema = new mongoose.Schema(
  {
    subTaskName: {
      required: [true, "Task name is required"],
      type: String,
    },
    subTaskNotes: {
      type: String,
    },
    subTaskCompletion: {
      type: Boolean,
      default: false,
    },
    superTask: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("SubTask", subTaskSchema);
