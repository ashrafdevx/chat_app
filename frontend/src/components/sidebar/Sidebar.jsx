import React from "react";
import SearchInputFiled from "./SearchInputFiled";
import Conversations from "./conversations";
import Logout from "./Logout";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 px-2 py-3 flex flex-col">
      <SearchInputFiled />
      <div className="divider px-2 text-white" />
      <Conversations />
      <Logout />
    </div>
  );
};

export default Sidebar;
