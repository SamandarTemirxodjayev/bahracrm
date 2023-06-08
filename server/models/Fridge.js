const mongoose = require("mongoose");

const fridgeSchema = new mongoose.Schema({
  name: {
    type: String
  },
  products: {
    type: [{
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "global"
      },
      weight: {
        type: Number,
        default: 0
      }
    }]
  }
});
const Fridge = mongoose.model("fridge", fridgeSchema);

module.exports = Fridge;