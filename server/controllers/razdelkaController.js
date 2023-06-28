const Fridge = require("../models/Fridge");
const Global = require("../models/Globals");
const Users = require("../models/Users");
const History = require("../models/History");
const Record = require("../models/Records");

exports.getFridges = async (req, res) => {
  console.log("getFridges");
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level!== 6) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const fridges = await Fridge.find({}).populate("products.productId");
    return res.json(fridges);
  } catch (error) {
    console.log(error);
  }
};
exports.getProducts = async (req, res) => {
  console.log("getProducts");
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level!== 6) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const products = await Global.find({});
    return res.json(products);
  } catch (error) {
    console.log(error);
  }
};
exports.addGlobal = async (req, res) => {
  console.log("addGlobal Razdelka");
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level !== 6) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const { product, weight, fridge, date, time } = req.body;
    if (!product || !weight || !fridge || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const productId = await Global.findById(product);

    const newHistory = new History({
      userId: currentUser._id,
      do: {
        name: "Mahsulot Maydalandi",
        productId: product,
        weight: weight,
        fridge: fridge
      },
      time,
      date
    });
    await newHistory.save();

    const fridgeDocument = await Fridge.findById(fridge);
    const productFound = fridgeDocument.products.find(p => p.productId.toString() === product);

    if (productFound) {
      productFound.weight += weight;
    } else {
      fridgeDocument.products.push({ productId: product, weight: weight });
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
  console.log("historyalast20");
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level !== 6) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const history = await History.find({ userId: currentUser._id })
      .sort({ _id: -1 })
      .limit(50)
      .populate("userId")
      .populate("do.productId")
      .populate("do.fridge");
    return res.json(history);
  } catch (error) {
    console.log(error);
  }
};
exports.getGlobal = async (req, res) => {
  console.log("getGlobal");
  const { product, fridge, date, time, weight } = req.body;
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level !== 6) {
      return res.status(400).json({ message: "Not allowed" });
    }
    if (!product || !fridge || !date || !time || !weight) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const fridgeDocument = await Fridge.findById(fridge);
    const productFound = fridgeDocument?.products.find(p => p.productId.toString() === product);
    if (!productFound) {
      return res.status(400).json({ message: "Product not found" });
    }
    if (productFound.weight < weight) {
      return res.status(400).json({ message: "Not enough weight" });
    }
    let sum = productFound.weight - weight;
    fridgeDocument.products.at(fridgeDocument.products.indexOf(productFound)).weight = sum;
    await fridgeDocument.save();
    const productId = await Global.findById(product);

    const newHistory = new History({
      userId: currentUser._id,
      do: {
        name: "Mahsulot Olindi",
        productId: product,
        weight: weight,
        fridge: fridge
      },
      time,
      date
    });
    await newHistory.save();
    productId.weight -= weight;
    await productId.save();
    return res.json(fridgeDocument);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.getProduct = async (req, res) => {
  console.log("getProduct");
  const { id } = req.params;
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level!== 6) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const productFound = await Global.findById(id);
    return res.json(productFound);
  } catch (error) {
    console.log(error);
  }
};
exports.addRecord = async (req, res) => {
  console.log("addRecord");
  const { rows, musur, date, time, allweight } = req.body;
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level!== 6) {
      return res.status(400).json({ message: "Not allowed" });
    }
    if (!rows ||!musur ||!date ||!time) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newRecord = new Record({
      rows,
      musur,
      date,
      time,
      about: allweight,
      userId: currentUser._id
    });
    await newRecord.save();
    return res.json(newRecord);
  } catch (error) {
    console.log(error);
  }
};
