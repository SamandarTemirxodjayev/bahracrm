const express = require("express");
const router = require("./routes/router");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1",router);

app.listen(7777, () => {
  console.log("Example app listening on port 7777!");
});
