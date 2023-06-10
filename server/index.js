const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);
// eslint-disable-next-line no-undef
mongoose.connect("mongodb://127.0.0.1:27017/crm?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.1", {
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