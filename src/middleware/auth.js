const jwt = require("jsonwebtoken");
const authRoute = require("../routes/authRoute");
const User = require("../models/user");

const userAuth =
  ("/user",
  async (request, response, next) => {
    try {
      const token = request.cookies;
      const userId = await jwt.verify(token.token, "Akash@123");
      if (!userId) {
        throw new Error("invalid credentials...");
      } else {
        const userInfo = await User.findOne({ _id: userId.id });
        request.user = userInfo;
        next();
      }
    } catch (error) {
      response.status(400).send("invalid credentials...");
    }
  });

module.exports = { userAuth };
