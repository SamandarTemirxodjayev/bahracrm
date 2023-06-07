const mongoose = require("mongoose")

const globalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String
  },
  time: {
    type: String
  },
  date: {
    type: String
  }
});
const Global = mongoose.model('history', globalSchema);

module.exports = Global