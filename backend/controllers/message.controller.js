import Conversation from "../models/conversation.model.js";
import Message from "../models/messages.modal.js";
import { getRecieverSocketID, io } from "../socket/socket.js";
// Send Message Controller
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

    // Notify receiver
    const recieverSocketId = getRecieverSocketID(recieverId);
    if (recieverSocketId) {
      io?.to(recieverSocketId).emit("newMessage", newMessage);
      console.log("Message sent to receiver:", newMessage);
    }

    // Notify sender (to update their own UI)
    const senderSocketId = getRecieverSocketID(senderId);
    if (senderSocketId) {
      io?.to(senderSocketId).emit("newMessage", newMessage);
      console.log("Message sent to sender:", newMessage);
    }

    return res.status(200).json({
      status: 200,
      message: message,
      conversation,
    });
  } catch (error) {
    console.log("Message Controller:", error.message);
    res.status(500).json({ status: 500, error: error.message });
  }
};

// Get Messages Controller
export const getMessages = async (req, res) => {
  try {
    const userToChatWith = req.params.id;
    const loggedInUser = req.user._id;
    const messages = await Conversation.findOne({
      paticipants: { $all: [loggedInUser, userToChatWith] },
    }).populate("messages");
    if (!messages) {
      return res.status(404).send("No messages found.");
    }
    res.status(200).json(messages);
  } catch (error) {
    console.log("Get Messages Controller:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// export const sendMessage = async (req, res) => {
//   try {
//     const { id: recieverId } = req.params;
//     const { message } = req.body;

//     const senderId = req.user?._id;

//     let conversation = await Conversation.findOne({
//       paticipants: { $all: [senderId, recieverId] },
//     });
//     if (!conversation) {
//       conversation = await Conversation.create({
//         paticipants: [senderId, recieverId],
//         messages: [],
//       });
//     }
//     const newMessage = new Message({ senderId, recieverId, message });

//     conversation.messages.push(newMessage._id);
//     await newMessage.save();
//     await conversation.save();
//     const recieverSocketId = getRecieverSocketID(recieverId);
//     if (recieverSocketId) {
//       io?.to(recieverSocketId).emit("newMessage", newMessage);
//       console.log("newMessage sent from bank", newMessage);
//     }
//     return res
//       .status(200)
//       .json({ status: 200, message: "Message sent succesflly", conversation });
//   } catch (error) {
//     console.log("Message Controller :", error.message);
//     res.status(500).json({ status: 500, error: error.message });
//   }
// };

// export const getMessages = async (req, res) => {
//   try {
//     const userToChatWith = req.params.id;
//     const loggedInUser = req.user;
//     const messages = await Conversation.findOne({
//       paticipants: { $all: [loggedInUser, userToChatWith] },
//     }).populate("messages");
//     if (!messages) {
//       return;
//     }
//     res.status(200).send(messages);
//     console.log("contrlloer all mesage with new onw ", messages);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//     console.log("Get MEssage Controller : ", error.message);
//   }
// };
