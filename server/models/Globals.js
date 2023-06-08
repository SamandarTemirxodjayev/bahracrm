const mongoose = require("mongoose");

const globalSchema = new mongoose.Schema({
  name: {
    type: String
  },
  weight: {
    type: Number,
    default: 0
  }
});
const Global = mongoose.model("global", globalSchema);

module.exports = Global;