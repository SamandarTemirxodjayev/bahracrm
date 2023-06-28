const mongoose = require("mongoose");

const globalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  do: {
    name: {
      type: String,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "global",
    },
    weight: {
      type: Number,
    },
    fridge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "fridge",
    }
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "company",
    default: "649c9464b7923f6abc7d2637"
  },
  time: {
    type: String,
  },
  date: {
    type: String,
  },
});
const History = mongoose.model("history", globalSchema);

module.exports = History;
