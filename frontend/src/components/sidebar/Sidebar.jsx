import React from "react";
import SearchInputFiled from "./SearchInputFiled";
import Conversations from "./cnversations";
import Logout from "./Logout";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <SearchInputFiled />
      <div className="divider px-2" />
      <Conversations />
      <Logout />
    </div>
  );
};

export default Sidebar;
