const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);
// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Database connected");
    require("./web.js");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });