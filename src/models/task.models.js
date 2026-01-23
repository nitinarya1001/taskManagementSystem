import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      required: [true, "Task name is required"],
      type: String,
    },
    taskNotes: {
      type: String,
    },
    taskCompletion: {
      type: Boolean,
      default: false,
    },
    taskStatus: {
      type: String,
      enum: ["PENDING", "COMPLETED", "OVERDUE"],
      default: "PENDING",
    },
    taskDueDate: {
      type: Date,
    },
    taskOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
