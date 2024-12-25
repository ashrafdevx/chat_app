import { create } from "zustand";

export const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [], // Initialize as an empty array
  sentMessage: (newMessages) =>
    set(() => ({ messages: Array.isArray(newMessages) ? newMessages : [] })), // Ensure it's always an array
}));

// import { create } from "zustand";

// export const useConversation = create((set) => ({
//   selectedConversation: null,
//   setSelectedConversation: (selectedConversation) =>
//     set({ selectedConversation }),
//   messages: [],
//   sentMessage: (messages) => set(messages),
// }));
