import ErrorHandler from "../utils/errorhandler.js";
import { catchAsynError } from "./catchAsyncError.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const isAuthenticatedUser = catchAsynError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please login to access the resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  // this jwt.verify will verify the token is valid or not by the help of our secret key
  //the validation method returns a decode object that we stored the token in
  req.user = await User.findById(decodedData.id); //we are here searching the user by id taking
  //the id from decoded data.

  next();
});

export const authorisedRoles = (...roles) => {
  return (req, res, next) => {
    // roles.includes will check that does roles have req.user.role
    // since we are passing admin , that is why is admin than skip this and call next else return the error
    if (!roles.includes(req.user.role)) {
      //req.user.role will provide the role of the user
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed  to access the resourse`,
          403
        )
      ); 
    }
    next();
  };
};
