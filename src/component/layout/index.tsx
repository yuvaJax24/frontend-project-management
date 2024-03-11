/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate } from "react-router-dom";
import { menu } from "./menuList";

const MainLayout = ({ children }: { children: any }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-start w-full h-full">
      <div className="flex flex-col w-[200px] h-full">
        {menu?.map((item) => (
          <div
            key={item?.name}
            className="p-2 flex items-center justify-center w-full"
            onClick={() => navigate(item?.path)}
          >
            {item?.name}
          </div>
        ))}
      </div>
      <div className="flex flex-col w-full h-full">
        <div className="flex p-2 items-center justify-between w-full h-4">
          OZZ
        </div>
        <div className="flex flex-col w-full h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
