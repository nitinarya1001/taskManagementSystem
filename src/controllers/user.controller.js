import { asyncHandler } from "../utils/ayncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.models.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (err) {
    console.log(err);
    throw new ApiError(
      500,
      "something went wrong while generating access and refresh tokens!"
    );
  }
};

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
    .json(new ApiResponse(200, "User Created Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  // TODO:
  // 1. accept data from front end,
  // 2. find the user based on the data recieved
  // 3. check password
  //    a. if found and password is correct generate an access and refresh jwt for the client and send it
  //        - send cookies
  //    b. if not found send "User not found" or "wrong email or password" message

  const { email, username, password } = req.body;

  if (!email && !username) {
    throw new ApiError(400, "UserName or Email reqired");
  }
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    throw new ApiError(404, "User Does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid User credentials!");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  console.log(loggedInUser);
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, "user logged in successfully!"));
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const updatePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if (!oldPassword || !newPassword || !confirmPassword) {
    throw new ApiError(401, "All fields are required");
  }
  if (newPassword !== confirmPassword) {
    throw new ApiError(401, "passwords do not match!");
  }
  const user = await User.findById(req.user?._id);
  if (user.isPasswordCorrect(oldPassword)) user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, "Password changed succesfully"));
});

export { registerUser, loginUser, logoutUser, updatePassword };
