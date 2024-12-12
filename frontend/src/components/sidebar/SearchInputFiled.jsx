import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useGetConversation } from "../../hooks/useGetConversation";
import { useConversation } from "../../zustand/useConversation";
import toast from "react-hot-toast";

const SearchInputFiled = () => {
  const [search, setsearch] = useState("");
  const { conversations } = useGetConversation();
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search?.length < 3)
      return toast.error("Search should greater then 3 character!!");
    const conversation = conversations.find((c) => {
      return c.fullName
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase());
    });

    if (conversation) {
      setSelectedConversation(conversation);
      setsearch("");
    } else {
      toast.error("No such user found!!");
    }
  };
  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setsearch(e.target.value)}
        className="border px-4 input input-bordered text-sm   w-full p-2 bg-gray-700 border-gray-600 text-gray-300 rounded-full"
      />
      <button type="submit" className="btn btn-circle bg-blue-500 text-white">
        <CiSearch className="w-5 h-5 outline-none" />
      </button>
    </form>
  );
};

export default SearchInputFiled;
