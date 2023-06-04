const Fridge = require("../models/Fridge");
const Global = require("../models/Globals");
const Users = require("../models/Users");
const History = require("../models/History");

exports.getFridges = async (req, res) => {
  console.log('getFridges');
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level!== 5) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const fridges = await Fridge.find({}).populate("products.productId");;
    return res.json(fridges);
  } catch (error) {
    console.log(error);
  }
}
exports.getProducts = async (req, res) => {
  console.log('getProducts');
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level!== 5) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const products = await Global.find({});
    return res.json(products);
  } catch (error) {
    console.log(error);
  }
}
exports.addGlobal = async (req, res) => {
  console.log('addGlobal');
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level !== 5) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const { product, companyName, weight, fridge, date, time } = req.body;
    if (!product || !companyName || !weight || !fridge || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const productId = await Global.findById(product);
    const fridgeId = await Fridge.findById(fridge);
    let text = `Qabul ${productId.name} ${companyName} ${weight}kg ${fridgeId.name}`;

    const newHistory = new History({
      login: req.userId,
      name: text,
      time,
      date
    });
    await newHistory.save();

    const fridgeDocument = await Fridge.findById(fridge);
    const productFound = fridgeDocument.products.find(p => p.productId.toString() === product);

    if (productFound) {
      // Product with the given ID exists, update the weight
      productFound.weight += weight; // Add the desired number to the existing weight
    } else {
      // Product with the given ID does not exist, create a new one
      fridgeDocument.products.push({ productId: product, weight: weight }); // Create a new product object
    }

    await fridgeDocument.save();
    productId.weight += weight;
    await productId.save();

    return res.status(200).json({ message: "Global added" });
  } catch (error) {
    console.log(error);
  }
};
exports.historyalast20 = async (req, res) => {
  console.log('historyalast20');
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level !== 5) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const history = await History.find({ login: req.userId })
      .sort({ _id: -1 }) // Sort in descending order based on _id field
      .limit(20); // Limit the result to 20 documents
    return res.json(history);
  } catch (error) {
    console.log(error);
  }
};
