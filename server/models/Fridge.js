const mongoose = require("mongoose")

const fridgeSchema = new mongoose.Schema({
  name: {
    type: String
  }
});
const Fridge = mongoose.model('fridge', fridgeSchema);

module.exports = Fridge