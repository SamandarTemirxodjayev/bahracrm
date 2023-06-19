const mongoose = require("mongoose");

const globalSchema = new mongoose.Schema({
  rows: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    fridge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fridge",
      required: true,
    },
    sum: {
      type: Number,
      required: true,
    },
  }],
  musur: {
    type: String
  },
  date: {
    type: String
  },
  time: {
    type: String
  }
});
const Record = mongoose.model("record", globalSchema);

module.exports = Record;