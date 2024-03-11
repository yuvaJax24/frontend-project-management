/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CreateProject from "./create";

const EditProjectDetail = () => {
  const location = useLocation();
  const [projectDetail, setProjectDetail] = useState<any>();
  const projectObjId = location?.state;
  const loginInfo = JSON.parse(localStorage.getItem("employeeInfo") as string);

  useEffect(() => {
    axios({
      url: "http://localhost:3000/project/" + projectObjId,
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
  }, [projectObjId]);

  return <CreateProject individualProjectData={projectDetail} />;
};

export default EditProjectDetail;
