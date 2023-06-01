const jwt = require("jsonwebtoken");
const passwordGenerator = require('../functions/userFunctions.js');
const Users = require("../models/Users.js");

exports.login = async (req, res) => {
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
    return res.status(500).json({ message: "Internal server error" });
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
  
    if (user_level === 1) {
      loginPrefix = "admin_";
    } else if (user_level === 2) {
      loginPrefix = "pm_";
    } else if (user_level === 3) {
      loginPrefix = "user_";
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
}
exports.userinfo = async (req, res) => {
  try {
    const user = await Users.findOne({ login: req.userId });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}