const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);
<<<<<<< HEAD
// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGODB_URI, {
=======
mongoose.connect("mongodb://127.0.0.1:27017/crm?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.1", {
>>>>>>> 974d38d098deaff92f101da06e86aa37b6de829d
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