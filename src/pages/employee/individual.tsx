/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../config";

const IndividualEmployee = () => {
  const param = useParams();
  const employeeObjId = param?.id;
  const [employeeDetail, setEmployeeDetail] = useState<any>([]);
  const loginInfo = JSON.parse(localStorage.getItem("employeeInfo") as string);

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = () => {
    axios({
      url: `${BASE_URL}/employee/${employeeObjId}`,
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
  return (
    <div>
      <p>
        <span>Employee Name:</span>
        <span>{employeeDetail?.name}</span>
      </p>
      <p>
        <span>Employee Id:</span>
        <span>{employeeDetail?.employeeId}</span>
      </p>
      <p>
        <span>Email:</span>
        <span>{employeeDetail?.email}</span>
      </p>
      <p>
        <span>Phone Number:</span>
        <span>{employeeDetail?.phoneNumber}</span>
      </p>
      <p>Project List</p>
      {employeeDetail?.project?.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>Project Description</th>
            </tr>
          </thead>
          <tbody>
            {employeeDetail?.project?.map((data: any) => (
              <tr key={data?.id}>
                <td align="center" width={150}>
                  {data?.name}
                </td>
                <td align="center" width={150}>
                  {data?.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Not assigned to any project</p>
      )}
    </div>
  );
};

export default IndividualEmployee;
