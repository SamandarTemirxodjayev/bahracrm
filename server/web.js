const express = require("express");
const router = require("./routes/router.js");
const adminRouter = require("./routes/admin.js");
const skladRouter = require("./routes/sklad.js");
const razdelkaRouter = require("./routes/razdelka.js");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1",router);
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/sklad",skladRouter);
app.use("/api/v1/razdelka",razdelkaRouter);

app.listen(7777, () => {
  console.log("Example app listening on port 7777!");
});
