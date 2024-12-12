import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./messageInput";
import { TiMessages } from "react-icons/ti";
import { useConversation } from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
  const { authUser } = useAuthContext();
  const { setSelectedConversation, selectedConversation } = useConversation();
  useEffect(() => {
    return () => {
      setSelectedConversation(null);
    };
  }, []);
  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className=" bg-slate-500 flex justify-between px-4 py-2 mb-2">
            <div className="w-full">
              <span className="label-text">To : </span>
              <span className="text-gray-900 font-bold">
                {selectedConversation.fullName}
              </span>
            </div>
            <div className="flex w-full justify-end">
              <span className="label-text text-white font-bold">
                {" "}
                {authUser?.fullName.toUpperCase()}{" "}
              </span>
            </div>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl  text-gray-200 font-semibold flex flex-col items-center">
        <p className="">Wel Come ✋ {authUser?.fullName.toUpperCase()} 🏵️</p>
        <p className="">Select a chat to start chat</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
