import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import EmployeeDetails from "../pages/employee";
import CreateEmployee from "../pages/employee/create";
import EditEmployeeDetail from "../pages/employee/edit";
import EmployeeUpload from "../pages/employee/upload";
import ProjectDetails from "../pages/project";
import CreateProject from "../pages/project/create";
import EditProjectDetail from "../pages/project/edit";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/employee" element={<EmployeeDetails />} />
      <Route path="/employee/create" element={<CreateEmployee />} />
      <Route path="/employee/edit" element={<EditEmployeeDetail />} />
      <Route path="/employee/create/upload" element={<EmployeeUpload />} />
      <Route path="/project" element={<ProjectDetails />} />
      <Route path="/project/create" element={<CreateProject />} />
      <Route path="/project/edit" element={<EditProjectDetail />} />
    </Routes>
  );
};

export default MainRouter;
