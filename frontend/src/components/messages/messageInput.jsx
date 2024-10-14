import React from "react";
import { BsSend } from "react-icons/bs";

const MessageInput = () => {
  return (
    <div className="px-4 my-3">
      <div className="w-full relative">
        <input
          className="border text-sm block rounded-lg w-full p-2 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center px-3"
        >
          <BsSend />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
