import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

//import router
import tourRoute from "./routes/toursRouter.js";
import userRoute from "./routes/usersRouter.js";
import authRoute from "./routes/authRouter.js";
import reviewRoute from "./routes/reviewsRouter.js";
import bookingRoute from "./routes/bookingsRouter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8088;
const corsOptions = {
  origin: true,
  credential: true,
};
//database connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true, // Ensure this line is present
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    console.log("Error connecting to MongoDB");
  }
};

//middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

//
app.use("/api/vs1/auth", authRoute);
app.use("/api/vs1/tours", tourRoute);
app.use("/api/vs1/users", userRoute);
app.use("/api/vs1/review", reviewRoute);
app.use("/api/vs1/booking", bookingRoute);

app.listen(port, () => {
  // Connect to MongoDB
  connect();
  console.log("server listening on port ", port);
});
