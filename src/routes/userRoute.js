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
    response.status(400).send("something went wrong while saving data...");
  }
});

userRouter.get("/user/getUsers", userAuth, async (request, response) => {
  try {
    response.json({
      data: request.user,
      message: "user data fetched successfully...",
    });
  } catch (error) {
    response.status(400).send("something went wrong while fetching data...");
  }
});

userRouter.delete("/user/deleteUser", userAuth, async (request, response) => {
  try {
    const userId = request.user._id;
    if (userId) {
      await User.findByIdAndDelete({ _id: userId });
      response.json({ message: "user data deleted successfully..." });
    } else {
      throw new Error("Id not found...");
    }
  } catch (error) {
    response.status(400).send("something went wrong while deleting data...");
  }
});

userRouter.patch("/user/updateUser", userAuth, async (request, response) => {
  try {
    const actualUserData = request.user;
    const newUserData = request.body;
    await User.findByIdAndUpdate({ _id: actualUserData._id }, newUserData);
    response.json({ message: "user data updated successfully..." });
  } catch (error) {
    response.status(400).send("something went wrong while updating data...");
  }
});

module.exports = userRouter;
