const mongoose = require("mongoose")

const globalSchema = new mongoose.Schema({
  name: {
    type: String
  }
});
const Global = mongoose.model('global', globalSchema);

module.exports = Global