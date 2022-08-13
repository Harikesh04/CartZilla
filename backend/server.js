import app from "./app.js";
import dotenv from "dotenv";
import cloudinary  from "cloudinary";
import connectDatabase from "./config/database.js";

//handling uncaught Exception error 
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaught Exception error`);

  process.exit(1);//server getting off  
});

//config
if (process.env.NODE_ENV!=="PRODUCTION") {// WE WILL NOT NEED THIS IN PRODUCTION BECAUSE WE WILL UPLOAD IT THERE
  dotenv.config({ path: "backend/config/config.env" });// this is to tell config file to server.js
}


//contecting to db
connectDatabase();

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working at http://localhost:${process.env.PORT}`);
});


//Unhandled promise rejection

// here when unhandled promise rejection errror comes then we will put the server off and show
// user that server is down
process.on("unhandledRejection", (err) => {//unhandledRejection is the name of the event
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
}); 
