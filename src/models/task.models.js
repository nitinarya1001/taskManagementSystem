import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
    },
    taskDescription: {
      type: String,
    },
    taskcompletion: {
      type: Boolean,
      default: false,
    },
    taskStatus: {
      type: String,
      enum: ["PENDING", "COMPLETED", "OVERDUE"],
    },
    taskduedate: {
      type: Date,
    },
    subTasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subTasks",
      },
    ],
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
