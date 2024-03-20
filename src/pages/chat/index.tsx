/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import socketIOClient, { Socket } from "socket.io-client";
import ConditionalRender from "../../component/conditionalRender";

const Chat = () => {
  const loginInfo = JSON.parse(localStorage.getItem("employeeInfo") as string);
  const [message, setMessage] = useState<string>();
  const [receivedMessage, setReceivedMessage] = useState<any[]>([]);
  const [employeeDetail, setEmployeeDetail] = useState<any>([]);
  const [socketDetail, setSocketDetail] = useState<Socket>();
  const [selectedEmployee, setSelectedEmployee] = useState<any>({});

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = () => {
    axios({
      url: "http://localhost:3000/employee",
      method: "GET",
      headers: {
        Authorization: "Bearer " + loginInfo?.accessTokken, //the token is a variable which holds the token
      },
    })
      .then((res: any) => {
        setEmployeeDetail(res?.data?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const socket = socketIOClient("http://localhost:3000");
    console.log("object2", socket);
    socket.on("connection", (_socket) => {
      console.log("object3", _socket);
    });
    setSocketDetail(socket);
  }, []);

  useEffect(() => {
    if (socketDetail) {
      socketDetail.on("send-message", (data: any) => {
        const message = [...receivedMessage];
        message.push(data);
        setReceivedMessage((prevState) => [...prevState, data]);
      });
    }
  }, [socketDetail]);

  console.log("object1", receivedMessage);
  return (
    <div className="flex items-start w-full h-full">
      <div className="flex flex-col w-[20%]">
        {employeeDetail?.map((emp: any) => (
          <button
            className={`"px-2 py-4 cursor-pointer border-none outline-none bg-transparent hover:bg-slate-50 text-left ${
              selectedEmployee?.id === emp?.id ? "bg-slate-50" : ""
            }`}
            onClick={() => {
              setSelectedEmployee(emp);
            }}
          >
            {emp?.name}
          </button>
        ))}
      </div>
      <ConditionalRender condition={!!selectedEmployee?.name}>
        <div className="flex flex-col gap-2 w-[80%]">
          <div className="flex gap-4 flex-col-reverse h-[calc(1vh*86)] bg-slate-50 p-4 overflow-y-auto">
            {receivedMessage?.map((message) => (
              <p className="p-4 bg-[#EDEDED] w-[250px] rounded-xl">
                {message?.message}
              </p>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              className="border-2 border-black w-1/2 p-1"
              name="message"
              placeholder="message"
              value={message}
              onChange={(event) => setMessage(event?.target?.value)}
            />
            <button
              onClick={() => {
                socketDetail?.emit("send-message", {
                  sender: loginInfo?.id,
                  message,
                });
                setMessage("");
              }}
            >
              Send
            </button>
          </div>
        </div>
      </ConditionalRender>
    </div>
  );
};

export default Chat;
