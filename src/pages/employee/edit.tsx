/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CreateEmployee from "./create";

const EditEmployeeDetail = () => {
  const location = useLocation();
  const [employeeDetail, setEmployeeDetail] = useState<any>();
  const employeeObjId = location?.state;
  const loginInfo = JSON.parse(localStorage.getItem("employeeInfo") as string);

  useEffect(() => {
    axios({
      url: "http://localhost:3000/employee/" + employeeObjId,
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
  }, [employeeObjId]);

  return <CreateEmployee individualEmployeeData={employeeDetail} />;
};

export default EditEmployeeDetail;
