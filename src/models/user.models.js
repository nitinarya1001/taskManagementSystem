import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is Required"],
      unique: [true, "Username must be unique"],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: [true, "Email must be unique"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      minlength: 6,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
