const Warehouse = require("../models/Warehouse.js");

exports.index = (req, res) => { //create a new controller
  const login = req.userId // User login not ID
  res.json({ message: 'Hello World!' }); // send message in json format
}
exports.userinfo = async (req, res) => {
  try {
    const user = await Warehouse.findOne({ login: req.userId });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}