/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const [projectDetail, setProjectDetail] = useState<any>([]);
  const loginInfo = JSON.parse(localStorage.getItem("employeeInfo") as string);

  useEffect(() => {
    fetchProjectData();
  }, []);

  const fetchProjectData = () => {
    axios({
      url: `${BASE_URL}/project`,
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
        url: `${BASE_URL}/project/${projectObjId}`,
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
      <h1 className="mb-2">Project</h1>
      <button onClick={() => navigate("/project/create")}>Add Project</button>
      <div className="mt-2">
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
                <td align="center" width={200}>
                  {data?.description}
                </td>
                <td align="center" width={200}>
                  {data?.employee?.map((emp: any) => emp?.name)?.join(", ")}
                </td>
                <td align="center" width={200}>
                  <button
                    className="py-1"
                    onClick={() => handleTableAction("edit", data?.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="ml-4 py-1"
                    onClick={() => handleTableAction("delete", data?.id)}
                  >
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
