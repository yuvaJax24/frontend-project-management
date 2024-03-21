/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import socketIOClient, { Socket } from "socket.io-client";
import ConditionalRender from "../../component/conditionalRender";
import { BASE_URL } from "../../config";

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
      url: `${BASE_URL}/employee`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + loginInfo?.accessTokken, //the token is a variable which holds the token
      },
    })
      .then((res: any) => {
        setEmployeeDetail(
          res?.data?.data?.filter((data: any) => data?.id !== loginInfo?.id)
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const socket = socketIOClient(BASE_URL);
    console.log("object2", socket);
    socket.on("connection", (_socket) => {
      console.log("object3", _socket);
      _socket.join(loginInfo?.id);
    });
    setSocketDetail(socket);
  }, []);

  useEffect(() => {
    if (socketDetail) {
      socketDetail.on("send-message", (data: any) => {
        const message = {
          ...data,
          isSender: data?.sender === loginInfo?.id,
        };
        setReceivedMessage((prevState) => [...prevState, message]);
      });
    }
  }, [socketDetail, loginInfo?.id]);

  console.log("object1", receivedMessage, loginInfo);
  return (
    <div className="flex items-start w-full h-full">
      <div className="flex flex-col w-[20%]">
        <h1 className="mb-2">Employees</h1>
        {employeeDetail?.map((emp: any) => (
          <button
            className={`px-2 py-4 text-base w-full cursor-pointer border-none rounded-tr-none rounded-br-none outline-none bg-transparent hover:bg-slate-50 text-left ${
              selectedEmployee?.id === emp?.id ? "!bg-slate-50" : ""
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
          <div className="flex gap-4 flex-col justify-end h-[calc(1vh*86)] bg-slate-50 p-4 overflow-y-auto rounded">
            {receivedMessage?.map((message) => (
              <p
                className={`p-4 bg-[#EDEDED] w-[250px] rounded-xl ${
                  !message?.isSender ? "self-end" : ""
                }`}
              >
                {message?.message}
              </p>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              className="w-1/2"
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
      <ConditionalRender condition={!selectedEmployee?.name}>
        <div className="flex w-full h-[calc(1vh*86)] bg-slate-50 p-4 items-center justify-center font-normal text-lg opacity-70 rounded">
          Chat Session
        </div>
      </ConditionalRender>
    </div>
  );
};

export default Chat;
