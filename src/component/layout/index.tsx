/* eslint-disable @typescript-eslint/no-explicit-any */

import { useLocation, useNavigate } from "react-router-dom";
import { menu } from "./menuList";
import { useState } from "react";

const MainLayout = ({ children }: { children: any }) => {
  const hideNavbar = ["/login"];
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("");
  return (
    <div className="flex items-start w-full h-full">
      <div
        className={`flex flex-col w-[200px] h-full bg-slate-400 p-2 ${
          hideNavbar?.includes(location.pathname) ? "hidden" : ""
        }`}
      >
        {menu?.map((item) => (
          <div
            key={item?.name}
            className={`p-2 mt-[2px] flex items-center justify-center w-full cursor-pointer hover:bg-white rounded-lg font-medium ${
              activeMenu === item?.name ? "bg-white" : ""
            }`}
            onClick={() => {
              setActiveMenu(item?.name);
              navigate(item?.path);
            }}
          >
            {item?.name}
          </div>
        ))}
      </div>
      <div className="flex flex-col w-full h-full">
        {/* <div className="flex p-2 items-center justify-between w-full h-4 bg-slate-200">
          OZZ
        </div> */}
        <div className="flex flex-col w-full h-full overflow-y-auto bg-[#EDEDED] p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
