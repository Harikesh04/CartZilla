import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload"; 
import dotenv from "dotenv";



import product from "./routes/productRoute.js";
import user from "./routes/userRoutes.js";
import order from "./routes/orderRoute.js";
import payment from "./routes/paymentRoute.js";
import { errorMiddleware } from "./middleware/Error.js";




app.use(express.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(fileUpload());


//config
dotenv.config({ path: "backend/config/config.env" });


//Importing routes
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

//Middleware for errors

app.use(errorMiddleware);

export default app;
