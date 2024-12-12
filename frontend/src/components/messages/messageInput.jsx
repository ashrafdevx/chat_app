import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import { useMessage } from "../../hooks/useSendMessage";

const MessageInput = () => {
  const { loading, sendMessage } = useMessage();
  const [message, setMessage] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message) {
      return;
    }
    await sendMessage(message);
    setMessage("");
  };
  return (
    <div className="px-4 my-3">
      <form onSubmit={handleSendMessage}>
        <div className="w-full relative">
          <input
            className="border text-sm block rounded-lg w-full p-2 bg-gray-700 border-gray-600 text-white"
            placeholder="Send a message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button
            type="submit"
            className="absolute inset-y-0 end-0 flex items-center px-3"
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <BsSend />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
