import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    recieverId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
