import ErrorHandler from "../utils/errorhandler.js";
import { catchAsynError } from "../middleware/catchAsyncError.js";
import User from "../models/userModel.js";
import sendToken from "../utils/jwtToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import cloudinary from "cloudinary";

// register the user
export const registerUser = catchAsynError(async (req, res, next) => {
 
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "Avtars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body; //we are fetching these data from the user
  const user = await User.create({
    // since we have fetched the data at very first that is why we are passing object here
    name,
    email,
    password,
    avtar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 201, res);
});
//login the user

export const loginUser = catchAsynError(async (req, res, next) => {
  const { email, password } = req.body; //taking email and password from the user to login

  //checking that wether email and password both  are taken or not
  if (!email || !password) {
    return next(new ErrorHandler("Please enter Email and Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  // this is done because in user Model we have marked the password select false;

  if (!user) {
    return next(new ErrorHandler("Invalid email or password ", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  // if entered password is wrong
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password ", 401));
  }

  // password is correct
  sendToken(user, 200, res);
});

//logout the user
export const logOut = catchAsynError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()), //taking the token from cookie and expiring it now
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "PRODUCTION" ? "none" : "lax",
    secure: process.env.NODE_ENV === "PRODUCTION" ? true : false,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

//Forgot password

export const ForgotPassword = catchAsynError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  //Get  ResetPasswordToken
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is:-\n\n ${resetPasswordUrl}\n\n If you have not 
  requested this email ,then please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email send to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

//Reset password

export const ResetPassword = catchAsynError(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256") //this is an algorithm
    .update(req.params.token)
    .digest("hex");
  //req.params.token-accessing token from body

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset password token is Invalid  or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not matched", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  // since , user has changed the password therefore user will be logged in here

  sendToken(user, 200, res);
});

// Get user details

export const getUserDetail = catchAsynError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    succes: true,
    user,
  });
});

// Update User password

export const updatePassword = catchAsynError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  // if entered password is wrong
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect ", 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match ", 400));
  }

  //updating the password

  user.password = req.body.newPassword;
  await user.save();

  // password is correct
  sendToken(user, 200, res);
});

//Update user profile
export const updateProfile = catchAsynError(async (req, res, next) => {
  //creating new object
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // // we will add cloudaniary later
  // const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
  //   new: true,
  //   runValidators: true,
  //   useFindAndModify: false,
  // });

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avtar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "Avtars",
      width: 150,
      crop: "scale",
    });

    newUserData.avtar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// creating some admin routes so that if admin wants to access some information than he can access

//Get all users -- ADMIN
export const GetAllUsers = catchAsynError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});


//Get a single user
export const GetSingleUser = catchAsynError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not exists with id ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//Update role of the user --Admin
export const updateUserRole = catchAsynError(async (req, res, next) => {
  //creating new object
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    //req.params.id - with help of this we take id or any data from route .
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});
//Delete user --Admin
export const deleteUser = catchAsynError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  const imageId = user.avtar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
