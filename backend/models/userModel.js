import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxlength: [30, "Name cannot exceed 30 character"],
    minlength: [4, "Name should have more than 4 character"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [8, "Password should be greater than 8 character"],
    select: false,
  },
  avtar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt:{
    type:Date,
    default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
//here before saving the password to database we are adding hash to password .
userSchema.pre("save", async function (next) {
  //applying check that if hash is already created of password than don't create it .
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);//saving password in db
});

//JWT TOKEN
//creating token so that user will we logged in after register
userSchema.methods.getJWTToken = function () {
  // jwt.sign(payload, secretOrPrivateKey, [options, callback])
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    // process.env.JWT_SECRET** THIS IS THE SECRET KEY
    expiresIn: process.env.JWT_EXPIRE,
    //THE TOKEN WILL EXPIRES IN THE TIME WE WILL SET HERE AND AFTER THAT THE USER WILL BE AUTOMATICALLY LOGGED OUT
  });
};

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);

  // bcrypt.compare will automatically compare the enteredPassword with the hashed password
  // this.password is the password from userSchema
};

//Reset password 
userSchema.methods.getResetPasswordToken = function () {
  //Generating token
  const resetToken = crypto.randomBytes(20).toString("hex");//this will generate token of random 20 bytes

  //Hashing and adding resetPassword token to user schema
  this.resetPasswordToken = crypto
    .createHash("sha256")//this is an algorithm
    .update(resetToken)
    .digest("hex");


    this.resetPasswordExpire = Date.now()+ 15*60*1000;

    return resetToken;
};

const User = mongoose.model("User", userSchema);
export default User;
