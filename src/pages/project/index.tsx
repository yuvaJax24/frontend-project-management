/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const [projectDetail, setProjectDetail] = useState<any>([]);
  const loginInfo = JSON.parse(localStorage.getItem("employeeInfo") as string);

  useEffect(() => {
    fetchProjectData();
  }, []);

  const fetchProjectData = () => {
    axios({
      url: "http://localhost:3000/project",
      method: "GET",
      headers: {
        Authorization: "Bearer " + loginInfo?.accessTokken, //the token is a variable which holds the token
      },
    })
      .then((res: any) => {
        setProjectDetail(res?.data?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleTableAction = (type: "edit" | "delete", projectObjId: string) => {
    if (type === "edit") {
      navigate("/project/edit", { state: projectObjId });
    } else {
      axios({
        url: "http://localhost:3000/project/" + projectObjId,
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + loginInfo?.accessTokken, //the token is a variable which holds the token
        },
      })
        .then(() => {
          fetchProjectData();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  return (
    <div>
      <p>Project</p>
      <button onClick={() => navigate("/project/create")}>Add Project</button>
      <div>
        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>Description</th>
              <th>Employee</th>
            </tr>
          </thead>
          <tbody>
            {projectDetail?.map((data: any) => (
              <tr key={data?.id}>
                <td
                  onClick={() => {
                    navigate("/project/" + data?.id);
                  }}
                  align="center"
                  width={100}
                >
                  {data?.name}
                </td>
                <td align="center" width={100}>
                  {data?.description}
                </td>
                <td align="center" width={100}>
                  {data?.employee?.map((emp: any) => emp?.name)?.join(", ")}
                </td>
                <td align="center" width={100}>
                  <button onClick={() => handleTableAction("edit", data?.id)}>
                    Edit
                  </button>
                  <button onClick={() => handleTableAction("delete", data?.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectDetails;
