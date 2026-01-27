import { Task } from "../models/task.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/ayncHandler.js";

const createTask = asyncHandler(async (req, res) => {
  // Accept data from front-end
  const { taskName, taskNotes, taskDueDate } = req.body;
  // check if user is logged in
  const user = await User.findOne(req.user?._id);
  if (!user) {
    throw new ApiError(400, "Login to create new Tasks");
  }
  //create TASK document of the valid data
  const task = await Task.create({
    taskName,
    taskNotes,
    taskDueDate,
    taskOwner: user._id,
  });
  //check if data is stored in DB
  const createdTask = await Task.findById(task._id);
  if (!createdTask) {
    throw new ApiError(500, "Something went wrong while saving task in DB");
  }
  //send success response
  return res
    .status(200)
    .json(new ApiResponse(200, "task created successfully!"));
});

const retrieveTask = asyncHandler(async (req, res) => {
  // check if user is logged in
  const user = await User.findOne(req.user?._id);
  if (!user) {
    throw new ApiError(400, "Login to create new Tasks");
  }
  const tasks = await Task.find({ taskOwner: req.user?._id });
  return res
    .status(200)
    .json(new ApiResponse(200, tasks, "tasks retrieved successfully"));
});

const updateTask = asyncHandler(async (req, res) => {
  // check if user is logged in
  const user = await User.findOne(req.user?._id);
  if (!user) {
    throw new ApiError(400, "Login to create new Tasks");
  }
  const task = await Task.findOne(req.task?._id);
  if (!task) {
    throw new ApiError(400, "Task doesn't exist");
  }
  const { taskName, taskNotes, taskCompletion, taskDueDate } = req.body;

  if (taskName) task.taskName = taskName;

  if (taskNotes) task.taskNotes = taskNotes;

  if (taskCompletion) task.taskCompletion = taskCompletion;

  if (taskDueDate) task.taskDueDate = taskDueDate;

  task.save();
  return res
    .status(200)
    .json(new ApiResponse(200, `tasks modified successfully`));
});

const deleteTask = asyncHandler(async (req, res) => {
  // check if user is logged in
  const user = await User.findOne(req.user?._id);
  if (!user) {
    throw new ApiError(400, "Login to create new Tasks");
  }
  const task = await Task.findOne(req.task?._id);
  if (!task) {
    throw new ApiError(400, "Task doesn't exist");
  }
  await Task.deleteOne(task);
  return res
    .status(200)
    .json(new ApiResponse(200, `tasks deleted successfully`));
});

export { createTask, retrieveTask, updateTask, deleteTask };
