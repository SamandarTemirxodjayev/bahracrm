const jwt = require("jsonwebtoken");
const passwordGenerator = require("../functions/userFunctions.js");
const Users = require("../models/Users.js");
const Fridge = require("../models/Fridge.js");
const History = require("../models/History.js");
const Global = require("../models/Globals.js");
const Records = require("../models/Records.js");
const Company = require("../models/Company.js");


exports.login = async (req, res) => {
  console.log("login");
  const { login, password } = req.body;
  if(!login ||!password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  try {
    const user = await Users.findOne({ login });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ data: user.login }, "secret", { expiresIn: "12h" });
    res.json({ token });
  } catch (err) {
    return res.status(500).json({ message: "Error when find user" });
  }
};

exports.register = async (req, res) => {
  const { user_level, name, surname } = req.body;

  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level !== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }

    if (!user_level || !name || !surname) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    let loginPrefix = "";
  
    if (user_level == 1) {
      loginPrefix = "admin_";
    } else if (user_level == 2) {
      loginPrefix = "pm_";
    } else if (user_level == 3) {
      loginPrefix = "kassir_";
    } else if (user_level == 4) {
      loginPrefix = "realizator_";
    } else if (user_level == 5) {
      loginPrefix = "sklad_";
    } else if (user_level == 6) {
      loginPrefix = "razdelka_";
    }
  
    let isUnique = false;
    let randomLogin = "";
  
    while (!isUnique) {
      randomLogin = passwordGenerator.generator(10);
      try {
        const existingUser = await Users.findOne({ login: randomLogin });
        if (!existingUser) {
          isUnique = true;
        }
      } catch (err) {
        return res.status(500).json({ message: "Internal server error when finding login" });
      }
    }
  
    loginPrefix += randomLogin;
    const randomPassword = passwordGenerator.generator(10);
  
    const newUser = new Users({
      login: loginPrefix,
      password: randomPassword,
      user_level,
      name,
      surname
    });
  
    await newUser.save();

    return res.json({
      login: loginPrefix,
      password: randomPassword,
      user_level,
      name,
      surname
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error when saving user" });
  }
};
exports.userinfo = async (req, res) => {
  console.log("userinfo " + req.userId);
  try {
    const user = await Users.findOne({ login: req.userId });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.users = async (req, res) => {
  console.log("users");
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level !== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const users = await Users.find({});
    return res.json(users);
  } catch (error) {
    console.log(error);
  }
};
exports.user = async (req, res) => {
  console.log("user");
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level!== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const user = await Users.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};
exports.editUser = async (req, res) => {
  console.log("editUser");
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level!== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const user = await Users.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    user.user_level = req.body.user_level;
    user.name = req.body.name;
    user.surname = req.body.surname;
    await user.save();
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};
exports.deleteUser = async (req, res) => {
  console.log("deleteUser");
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level !== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const user = await Users.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    await Users.deleteOne({ _id: req.params.id }); // Updated line
    return res.json({ message: "User deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.createFridge = async (req, res) => {
  console.log("createFridge");
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level !== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const newFridge = new Fridge({
      name: req.body.name,
    });
  
    await newFridge.save();
    return res.json(newFridge);
  } catch (error) {
    console.log(error);
  }
};
exports.getFridges = async (req, res) => {
  console.log("getFridges");
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level!== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const fridges = await Fridge.find({}).populate("products.productId");
    return res.json(fridges);
  } catch (error) {
    console.log(error);
  }
};
exports.getFridgeId = async (req, res) => {
  console.log("getFridgeId");
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level!== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const fridge = await Fridge.findOne({ _id: req.params.id });
    if (!fridge) {
      return res.status(400).json({ message: "Fridge not found" });
    }
    return res.json(fridge);
  } catch (error) {
    console.log(error);
  }
};
exports.updateFridge = async (req, res) => {
  console.log("updateFridge");
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level!== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const fridge = await Fridge.findOne({ _id: req.params.id });
    if (!fridge) {
      return res.status(400).json({ message: "Fridge not found" });
    }
    fridge.name = req.body.name;
    await fridge.save();
    return res.json(fridge);
  } catch (error) {
    console.log(error);
  }
};
exports.deleteFridge = async (req, res) => {
  console.log("deleteFridge");
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level!== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const fridge = await Fridge.findOne({ _id: req.params.id });
    if (!fridge) {
      return res.status(400).json({ message: "Fridge not found" });
    }
    await Fridge.deleteOne({ _id: req.params.id }); // Updated line
    return res.json({ message: "Fridge deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.createProduct = async (req, res) => {
  console.log("createProduct");
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level!== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const newProduct = new Global({
      name: req.body.name,
    });
  
    await newProduct.save();
    return res.json(newProduct);
  } catch (error) {
    console.log(error);
  }
};
exports.getProducts = async (req, res) => {
  console.log("getProducts");
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level!== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const products = await Global.find({});
    return res.json(products);
  } catch (error) {
    console.log(error);
  }
};
exports.getProductId = async (req, res) => {
  console.log("getProductId");
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level!== 1 ) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const product = await Global.findOne({ _id: req.params.id });
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    return res.json(product);
  } catch (error) {
    console.log(error);
  }
};
exports.updateProductId = async (req, res) => {
  console.log("updateProductId");
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level!== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const product = await Global.findOne({ _id: req.params.id });
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    product.name = req.body.name;
    await product.save();
    return res.json(product);
  } catch (error) {
    console.log(error);
  }
};
exports.deleteProduct = async (req, res) => {
  console.log("deleteProduct");
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level!== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const product = await Global.findOne({ _id: req.params.id });
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    await Global.deleteOne({ _id: req.params.id }); // Updated line
    return res.json({ message: "Product deleted succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.historya = async (req, res) => {
  console.log("historya");
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level !== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const page = parseInt(req.query.page) || 1;
    const history = await History.find()
      .sort({ _id: -1 })
      .skip((page - 1) * 20)
      .limit(20)
      .populate("userId")
      .populate("company")
      .populate("do.productId")
      .populate("do.fridge");
    return res.json(history);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.lasthistory20 = async (req, res) => {
  console.log("lasthistory20");
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level !== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    
    const history = await History.find()
      .sort({ _id: -1 })
      .limit(20)
      .populate("userId")
      .populate("company")
      .populate("do.productId")
      .populate("do.fridge");
      
    return res.json(history);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.historywithid = async (req, res) => {
  console.log("historywithid");
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level!== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const history = await History.find({ userId: req.params.id })
      .populate("userId")
      .populate("userId")
      .populate("company")
      .populate("do.productId")
      .populate("do.fridge")
      .sort({ _id: -1 });
    if (!history) {
      return res.status(400).json({ message: "History not found" });
    }
    return res.json(history);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.getRecord = async (req, res) => {
  console.log("getRecord");
  const {id} = req.params;
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level!== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const records = await Records.findById(id);
    return res.json(records);
  } catch (error) {
    console.log(error);
  }
};
exports.getRecords = async (req, res) => {
  console.log("getRecords");
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level!== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const records = await Records.find().populate("rows.product").populate("rows.fridge").populate("about.product").populate("about.fridge").populate("userId");
    return res.json(records);
  } catch (error) {
    console.log(error);
  }
};
exports.addCompany = async (req, res) => {
  console.log("addCompany");
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level!== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const newCompany = new Company({
      name: req.body.name,
      type: req.body.type,
    });
  
    await newCompany.save();
    return res.json(newCompany);
  } catch (error) {
    console.log(error);
  }
};
exports.getCompany = async (req, res) => {
  console.log("getCompanies");
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level!== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const companies = await Company.find({});
    return res.json(companies);
  } catch (error) {
    console.log(error);
  }
};
exports.getCompanyById = async (req, res) => {
  console.log("getCompanyById");
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level!== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const importt = await Company.findOne({ _id: req.params.id });
    if (!importt) {
      return res.status(400).json({ message: "Company not found" });
    }
    return res.json(importt);
  } catch (error) {
    console.log(error);
  }
};
exports.deleteCompany = async (req, res) => {
  console.log("deleteCompany");
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level!== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const importt = await Company.findOne({ _id: req.params.id });
    if (!importt) {
      return res.status(400).json({ message: "Company not found" });
    }
    await Company.deleteOne({ _id: req.params.id }); // Updated line
    return res.json({ message: "Company deleted succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.updateCompany = async (req, res) => {
  console.log("updateCompany");
  try {
    const currentUser = await Users.findOne({ login: req.userId });
    if (!currentUser || currentUser.user_level!== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const importt = await Company.findOne({ _id: req.params.id });
    if (!importt) {
      return res.status(400).json({ message: "Company not found" });
    }
    importt.name = req.body.name;
    importt.type = req.body.type;
    await importt.save();
    return res.json(importt);
  } catch (error) {
    console.log(error);
  }
};