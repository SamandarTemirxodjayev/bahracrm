const mongoose = require("mongoose");

const exportSchema = new mongoose.Schema({
  name: {
    type: String
  },
  type: {
    type: String
  }
});
const Company = mongoose.model("company", exportSchema);

module.exports = Company;