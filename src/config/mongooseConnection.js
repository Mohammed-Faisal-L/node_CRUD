const mongoose = require("mongoose");

const url =
  "mongodb+srv://mdfaisala334:wQCchGk0SnkBEKaI@newcluster.h4rvp.mongodb.net/crudProject";

const dbConnect = async () => {
  await mongoose.connect(url);
};

module.exports = { dbConnect };
