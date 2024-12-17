const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { userAuth } = require("../middleware/auth");
const userRouter = express.Router();

userRouter.post("/user/createUser", async (request, response) => {
  try {
    const { firstName, lastName, age, gmail, password } = request.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const userData = new User({
      firstName,
      lastName,
      age,
      gmail,
      password: hashPassword,
    });

    await userData.save();
    response.json({ message: "user data saved successfully..." });
  } catch (error) {
    response
      .status(400)
      .send("something went wrong while saving data... ", error);
  }
});

userRouter.get("/user/getUsers", userAuth, async (request, response) => {
  try {
    response.json({
      data: request.user,
      message: "user data fetched successfully...",
    });
  } catch (error) {
    response
      .status(400)
      .send("something went wrong while saving data... ", error);
  }
});

module.exports = userRouter;
