/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";

const CreateProject = ({ individualProjectData }: any) => {
  const navigate = useNavigate();
  const [employeeList, setEmployeeList] = useState<any>([]);
  const [projectDetail, setProjectDetail] = useState<any>({
    name: "",
    description: "",
    employeeId: [],
  });
  const loginInfo = JSON.parse(localStorage.getItem("employeeInfo") as string);
  const handleSave = () => {
    const payload = {
      name: projectDetail?.name,
      description: projectDetail?.description,
      employeeId: projectDetail?.employeeId,
    };
    axios({
      url: individualProjectData?.id
        ? `${BASE_URL}/project/${individualProjectData?.id}`
        : `${BASE_URL}/project`,
      method: individualProjectData?.id ? "PATCH" : "POST",
      data: payload,
      headers: {
        Authorization: "Bearer " + loginInfo?.accessTokken, //the token is a variable which holds the token
      },
    })
      .then((res: any) => {
        if (res) {
          navigate("/project");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const fetchEmployeeData = () => {
    axios({
      url: `${BASE_URL}/employee`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + loginInfo?.accessTokken, //the token is a variable which holds the token
      },
    })
      .then((res: any) => {
        setEmployeeList(res?.data?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    fetchEmployeeData();
  }, []);
  useEffect(() => {
    if (individualProjectData) {
      setProjectDetail(individualProjectData);
    }
  }, [individualProjectData]);
  return (
    <div className="flex flex-col gap-2">
      <p>Project</p>
      <input
        type="text"
        name="name"
        placeholder="Enter project name"
        value={projectDetail?.name}
        onChange={(event: any) =>
          setProjectDetail({ ...projectDetail, name: event?.target?.value })
        }
      />
      <p>Description</p>
      <input
        type="text"
        placeholder="Enter project description"
        name="description"
        value={projectDetail?.description}
        onChange={(event: any) =>
          setProjectDetail({
            ...projectDetail,
            description: event?.target?.value,
          })
        }
      />
      <p>Employee</p>
      <select
        value={projectDetail?.employeeId}
        onChange={(event) => {
          if (!projectDetail?.employeeId?.includes(event?.target?.value)) {
            setProjectDetail({
              ...projectDetail,
              employeeId: [...projectDetail.employeeId, event?.target?.value],
            });
          }
        }}
      >
        {employeeList?.map((emp: any) => (
          <option key={emp?.id} value={emp?.id}>
            {emp?.name}
          </option>
        ))}
      </select>
      <button onClick={handleSave}>
        {individualProjectData?.id ? "Update" : "Add"}
      </button>
    </div>
  );
};

export default CreateProject;
