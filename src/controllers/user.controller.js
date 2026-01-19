import { asyncHandler } from "../utils/ayncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.models.js";

const registerUser = asyncHandler(async (req, res) => {
  // get data from frontend/postman.
  const { username, email, password, firstname, lastname } = req.body;

  // validation- not empty
  if (
    [username, email, password, firstname, lastname].some((field) => {
      field?.trim() === "";
    })
  ) {
    throw new ApiError(400, "All fields are mandatory");
  }

  // check if user already exists: username and email
  const userExists = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (userExists)
    throw new ApiError(409, "User with this email or username already exists");

  // create user object- create entry in db
  const user = await User.create({
    username,
    email,
    password,
    firstname,
    lastname,
  });

  // check for user creation
  const createdUser = await User.findById(user._id).select(
    "-password, -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registering user");
  }
  // remove password and refresh token field from response'

  // return response res.
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Created Successfully"));
});

export { registerUser };
