const express = require("express");
const authRoute = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

authRoute.post("/login", async (request, response) => {
  try {
    const { gmail, password } = request.body;
    const userGmail = await User.findOne({ gmail: gmail });
    if (!userGmail) {
      throw new Error("user doesn't exists...");
    }

    const isPassword = await bcrypt.compare(password, userGmail.password);
    if (isPassword) {
      const token = jwt.sign({ id: userGmail._id }, "Akash@123");
      response.cookie("token", token).send("Logged in successfully...");
    } else {
      response.send("something went wrong...");
    }
  } catch (error) {
    response.status(400).send("something went wrong while login... ", error);
  }
});

module.exports = authRoute;
