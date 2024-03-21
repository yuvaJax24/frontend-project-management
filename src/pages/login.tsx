/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

const Login = () => {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const handleLogin = () => {
    axios({
      url: `${BASE_URL}/login`,
      method: "POST",
      data: loginDetails,
    })
      .then((res: any) => {
        if (res) {
          localStorage.setItem(
            "employeeInfo",
            JSON.stringify(res?.data?.response)
          );
          navigate("/employee");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="w-full h-full flex flex-col gap-2 justify-center items-center">
      <input
        type="text"
        name="email"
        placeholder="Email ID"
        value={loginDetails?.email}
        onChange={(event) => {
          setLoginDetails({ ...loginDetails, email: event?.target?.value });
        }}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={loginDetails?.password}
        onChange={(event) => {
          setLoginDetails({ ...loginDetails, password: event?.target?.value });
        }}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
