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
            </tr>
          </thead>
          <tbody>
            {projectDetail?.map((data: any) => (
              <tr key={data?.id}>
                <td>{data?.name}</td>
                <td>{data?.description}</td>
                <td>
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
