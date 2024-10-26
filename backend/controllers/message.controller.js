import Conversation from "../models/conversation.model.js";
import Message from "../models/messages.modal.js";

export const sendMessage = async (req, res) => {
  try {
    const { id: recieverId } = req.params;
    const { message } = req.body;

    const senderId = req.user?._id;

    let conversation = await Conversation.findOne({
      paticipants: { $all: [senderId, recieverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        paticipants: [senderId, recieverId],
        messages: [],
      });
    }
    const newMessage = new Message({ senderId, recieverId, message });

    conversation.messages.push(newMessage._id);
    await newMessage.save();
    await conversation.save();
    return res
      .status(200)
      .json({ status: 200, message: "Message sent succesflly", conversation });
  } catch (error) {
    console.log("Message Controller :", error.message);
    res.status(500).json({ status: 500, error: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const userToChatWith = req.params.id;
    const loggedInUser = req.user;
    const messages = await Conversation.findOne({
      paticipants: { $all: [loggedInUser, userToChatWith] },
    }).populate("messages");
    if (!messages) {
      return;
    }
    res.status(200).send(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Get MEssage Controller : ", error.message);
  }
};
