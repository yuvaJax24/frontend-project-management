/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const EmployeeUpload = () => {
  const loginInfo = JSON.parse(localStorage.getItem("employeeInfo") as string);
  const handleTemplateDownload = () => {
    axios({
      url: "http://localhost:3000/report/employee",
      method: "GET",
      headers: {
        Authorization: "Bearer " + loginInfo?.accessTokken, //the token is a variable which holds the token
      },
      responseType: "blob",
    })
      .then((res: any) => {
        const url = window.URL.createObjectURL(new Blob([res?.data]));
        const link: any = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Employee.xlsx");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const uploadFile = (event: any) => {
    const uploadedFile = event?.target?.files?.[0];
    const formData = new FormData();
    formData.append("file", uploadedFile);
    axios({
      url: "http://localhost:3000/report/employee-upload",
      method: "POST",
      headers: {
        Authorization: "Bearer " + loginInfo?.accessTokken, //the token is a variable which holds the token
      },
      data: formData,
    })
      .then((res: any) => {
        console.log("Employee Upload", res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      <button className="mr-2" onClick={handleTemplateDownload}>
        Download Template
      </button>
      <input
        type="file"
        name="file"
        placeholder="upload"
        onChange={(event) => uploadFile(event)}
      />
    </div>
  );
};

export default EmployeeUpload;
