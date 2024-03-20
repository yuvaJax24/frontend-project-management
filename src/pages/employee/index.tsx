/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeDetails = () => {
  const navigate = useNavigate();
  const [employeeDetail, setEmployeeDetail] = useState<any>([]);
  const loginInfo = JSON.parse(localStorage.getItem("employeeInfo") as string);

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = () => {
    axios({
      url: "http://localhost:3000/employee",
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

  const handleTableAction = (
    type: "edit" | "delete",
    employeeObjId: string
  ) => {
    if (type === "edit") {
      navigate("/employee/edit", { state: employeeObjId });
    } else {
      axios({
        url: "http://localhost:3000/employee/" + employeeObjId,
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + loginInfo?.accessTokken, //the token is a variable which holds the token
        },
      })
        .then(() => {
          fetchEmployeeData();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div>
      <h1 className="mb-2">Employee</h1>
      <button onClick={() => navigate("/employee/create")}>Add Employee</button>
      <button
        className="ml-4"
        onClick={() => navigate("/employee/create/upload")}
      >
        Bulk Upload
      </button>
      <div className="mt-2">
        <table>
          <thead>
            <tr>
              <th>Employee name</th>
              <th>Employee Id</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Projects</th>
            </tr>
          </thead>
          <tbody>
            {employeeDetail?.map((data: any) => (
              <tr key={data?.id}>
                <td
                  className="cursor-pointer"
                  onClick={() => {
                    navigate("/employee/" + data?.id);
                  }}
                  align="center"
                  width={150}
                >
                  {data?.name}
                </td>
                <td align="center" width={100}>
                  {data?.employeeId}
                </td>
                <td align="center" width={200}>
                  {data?.email}
                </td>
                <td align="center" width={150}>
                  {data?.phoneNumber}
                </td>
                <td align="center" width={200}>
                  {data?.project
                    ?.map((project: any) => project?.name)
                    ?.join(", ") || "-"}
                </td>
                <td align="center" width={200}>
                  <button
                    className="py-1"
                    onClick={() => handleTableAction("edit", data?.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="ml-2 py-1"
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

export default EmployeeDetails;
