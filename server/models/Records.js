const mongoose = require("mongoose");

const globalSchema = new mongoose.Schema({
  rows: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "global",
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    fridge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "fridge",
      required: true,
    },
    sum: {
      type: Number,
      required: true,
    },
  }],
  about:[{
    date:{
      type: String
    },
    fridge:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "fridge",
      required: true
    },
    product:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "global",
      required: true
    },
    time:{
      type: String
    },
    weight:{
      type: Number
    },
  }],
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
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