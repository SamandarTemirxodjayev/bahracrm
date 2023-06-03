const Users = require('../models/Users')
exports.realizatorInfo = async (req, res) => {
  login = req.userId
  const user = await Users.findOne({login})
  if(!user) return res.status(404).json({message: 'User not found'})
  if(user.user_level != 3){
    return res.json({"message": "You don't have permission"})
  }
  res.json({
    message: 'Realizator Info'
  })
}