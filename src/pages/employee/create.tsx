/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateEmployee = ({ individualEmployeeData }: any) => {
  const navigate = useNavigate();
  const [employeeDetail, setEmployeeDetail] = useState<any>({
    name: "",
    employeeId: "",
    email: "",
    password: "",
    phoneNumber: 0,
  });
  const handleSave = () => {
    const payload = {
      email: employeeDetail?.email,
      employeeId: employeeDetail?.employeeId,
      name: employeeDetail?.name,
      password: employeeDetail?.password,
      phoneNumber: employeeDetail?.phoneNumber,
    };
    const loginInfo = JSON.parse(
      localStorage.getItem("employeeInfo") as string
    );
    axios({
      url: individualEmployeeData?.id
        ? "http://localhost:3000/employee/" + individualEmployeeData?.id
        : "http://localhost:3000/employee",
      method: individualEmployeeData?.id ? "PATCH" : "POST",
      data: payload,
      headers: {
        Authorization: "Bearer " + loginInfo?.accessTokken, //the token is a variable which holds the token
      },
    })
      .then((res: any) => {
        if (res) {
          navigate("/employee");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    if (individualEmployeeData) {
      setEmployeeDetail(individualEmployeeData);
    }
  }, [individualEmployeeData]);
  return (
    <div className="flex flex-col gap-2">
      <p>Employee Name</p>
      <input
        type="text"
        name="name"
        placeholder="Enter Employee name"
        value={employeeDetail?.name}
        onChange={(event: any) =>
          setEmployeeDetail({ ...employeeDetail, name: event?.target?.value })
        }
      />
      <p>Employee Id</p>
      <input
        type="text"
        placeholder="Enter Employee Id"
        name="employeeId"
        value={employeeDetail?.employeeId}
        onChange={(event: any) =>
          setEmployeeDetail({
            ...employeeDetail,
            employeeId: event?.target?.value,
          })
        }
      />
      <p>Email</p>
      <input
        type="text"
        name="email"
        placeholder="Enter Email"
        value={employeeDetail?.email}
        onChange={(event: any) =>
          setEmployeeDetail({ ...employeeDetail, email: event?.target?.value })
        }
      />
      <p>Password</p>
      <input
        type="text"
        name="password"
        placeholder="Enter Password"
        value={employeeDetail?.password}
        onChange={(event: any) =>
          setEmployeeDetail({
            ...employeeDetail,
            password: event?.target?.value,
          })
        }
      />
      <p>Phone Number</p>
      <input
        type="text"
        name="phoneNumber"
        placeholder="Enter Phone Number"
        value={employeeDetail?.phoneNumber}
        onChange={(event: any) =>
          setEmployeeDetail({
            ...employeeDetail,
            phoneNumber: event?.target?.value,
          })
        }
      />
      <button onClick={handleSave}>
        {individualEmployeeData?.id ? "Update" : "Add"}
      </button>
    </div>
  );
};

export default CreateEmployee;
