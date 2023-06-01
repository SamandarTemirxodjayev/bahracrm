const mongoose = require("mongoose");
require('dotenv').config();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Database connected");
  require("./web.js")
});