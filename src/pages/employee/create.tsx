/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";

const CreateEmployee = ({ individualEmployeeData }: any) => {
  const navigate = useNavigate();
  const loginInfo = JSON.parse(localStorage.getItem("employeeInfo") as string);
  const [projectList, setProjectList] = useState<any>([]);
  const [employeeDetail, setEmployeeDetail] = useState<any>({
    name: "",
    employeeId: "",
    email: "",
    password: "",
    phoneNumber: 0,
    role: "",
    projectId: [],
  });
  const handleSave = () => {
    const payload = {
      email: employeeDetail?.email,
      employeeId: employeeDetail?.employeeId,
      name: employeeDetail?.name,
      password: employeeDetail?.password,
      phoneNumber: employeeDetail?.phoneNumber,
      role: employeeDetail?.role,
      projectId: employeeDetail?.projectId,
    };
    axios({
      url: individualEmployeeData?.id
        ? `${BASE_URL}/employee/${individualEmployeeData?.id}`
        : `${BASE_URL}/employee`,
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
  const fetchProjectData = () => {
    axios({
      url: `${BASE_URL}/project`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + loginInfo?.accessTokken, //the token is a variable which holds the token
      },
    })
      .then((res: any) => {
        setProjectList(res?.data?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    fetchProjectData();
  }, []);
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
      <select
        value={employeeDetail?.role}
        onChange={(event) => {
          setEmployeeDetail({
            ...employeeDetail,
            role: event?.target?.value,
          });
        }}
      >
        {["admin", "user"]?.map((emp: any) => (
          <option key={emp} value={emp}>
            {emp}
          </option>
        ))}
      </select>
      <select
        value={employeeDetail?.role}
        onChange={(event) => {
          if (!employeeDetail?.projectId?.includes(event?.target?.value)) {
            setEmployeeDetail({
              ...employeeDetail,
              projectId: [...employeeDetail.projectId, event?.target?.value],
            });
          }
        }}
      >
        {projectList?.map((emp: any) => (
          <option key={emp?.id} value={emp?.id}>
            {emp?.name}
          </option>
        ))}
      </select>
      <button onClick={handleSave}>
        {individualEmployeeData?.id ? "Update" : "Add"}
      </button>
    </div>
  );
};

export default CreateEmployee;
