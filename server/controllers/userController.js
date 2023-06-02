exports.index = (req, res) => { //create a new controller
  const login = req.userId // User login not ID
  res.json({ message: 'Hello World!' }); // send message in json format
}
exports.getinfo = (req, res) => {
  res.json({ message: 'Hello World!' });
}