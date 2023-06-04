const mongoose = require("mongoose")

const globalSchema = new mongoose.Schema({
  login: {
    type: String
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