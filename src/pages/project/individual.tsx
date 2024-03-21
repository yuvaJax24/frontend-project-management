/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../config";

const IndividualProject = () => {
  const param = useParams();
  const projectObjId = param?.id;
  const [projectDetail, setProjectDetail] = useState<any>([]);
  const loginInfo = JSON.parse(localStorage.getItem("employeeInfo") as string);

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = () => {
    axios({
      url: `${BASE_URL}/project/${projectObjId}`,
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
  return (
    <div>
      <p>Project Name:</p>
      <p>{projectDetail?.name}</p>
      <p>Project Descrption:</p>
      <p>{projectDetail?.description}</p>
      <p>Employee</p>
      {projectDetail?.employee?.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>Project Description</th>
            </tr>
          </thead>
          <tbody>
            {projectDetail?.employee?.map((data: any) => (
              <tr key={data?.id}>
                <td align="center" width={150}>
                  {data?.name}
                </td>
                <td align="center" width={150}>
                  {data?.employeeId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Not assigned to any employee</p>
      )}
    </div>
  );
};

export default IndividualProject;
