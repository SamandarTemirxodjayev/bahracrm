const mongoose = require("mongoose");

const fridgeSchema = new mongoose.Schema({
  text: {
    type: String
  },
  user: {
    type: String
  },
  date: {
    type: String
  },
  time: {
    type: String
  },
});
const Fridge = mongoose.model("chat", fridgeSchema);

module.exports = Fridge;