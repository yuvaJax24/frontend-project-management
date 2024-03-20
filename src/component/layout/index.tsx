/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate } from "react-router-dom";
import { menu } from "./menuList";

const MainLayout = ({ children }: { children: any }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-start w-full h-full">
      <div className="flex flex-col w-[200px] h-full bg-slate-400">
        {menu?.map((item) => (
          <div
            key={item?.name}
            className="p-2 flex items-center justify-center w-full cursor-pointer hover:bg-white"
            onClick={() => navigate(item?.path)}
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
