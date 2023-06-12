const Chat = require("../models/Chat.js");

exports.getChats = async (req, res) => {
  try {
    const chats = await Chat.find().sort({ _id: -1 }).limit(20);
    chats.reverse();
    return res.json(chats);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving chats" });
  }
};


exports.putChats = async (req, res) => {
  console.log("putchats");
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: "text is required" });
  }
  const currentDate = new Date();

  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear().toString();

  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");

  const date = `${day}.${month}.${year}`;
  const time = `${hours}:${minutes}`;

  const newChat = new Chat({
    text,
    user: req.userId,
    date,
    time,
  });
  await newChat.save();
  return res.json({ message: "chat created" });
};
