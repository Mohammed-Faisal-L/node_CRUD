const express = require("express");
const { dbConnect } = require("./config/mongooseConnection");
const userRouter = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:3000", // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"], // optional
  credentials: true, // Include cookies if needed
}));

app.use("/", authRoute);
app.use("/", userRouter);

dbConnect()
  .then(() => {
    app.listen("8888", () => {
      console.log("port 8888 is up and running...");
    });
    console.log("db connection successfull...");
  })
  .catch((error) => {
    console.log(error);
  });
