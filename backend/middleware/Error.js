import ErrorHandler from "../utils/errorhandler.js";

export const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server error";

  //wrong mongo db id error{when id is wrong}
  if (err.name === "CastError") {
    const message = `Resourse not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Moongoose dublicate key errors
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    // ${Object.keys(err.keyValue)} this will see accordingly that what is duplicate
    err = new ErrorHandler(message, 400);
  }
  //Wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Json web token is Invalid , Try again`;
    err = new ErrorHandler(message, 400);
  }
  //jwt expire error
  if (err.name === "TokenExpiredError") {
    const message = `Json web token is Expired, Try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
   // message: err.stack ,this will tell us which type of error is this,and where exactly the error is coming .
  });
};
