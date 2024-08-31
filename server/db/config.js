const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/MERN", () => {
  console.log("mongoose connected");
});
