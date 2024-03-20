import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import EmployeeDetails from "../pages/employee";
import CreateEmployee from "../pages/employee/create";
import EditEmployeeDetail from "../pages/employee/edit";
import EmployeeUpload from "../pages/employee/upload";
import ProjectDetails from "../pages/project";
import CreateProject from "../pages/project/create";
import EditProjectDetail from "../pages/project/edit";
import IndividualEmployee from "../pages/employee/individual";
import IndividualProject from "../pages/project/individual";
import Chat from "../pages/chat";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/employee" element={<EmployeeDetails />} />
      <Route path="/employee/:id" element={<IndividualEmployee />} />
      <Route path="/employee/create" element={<CreateEmployee />} />
      <Route path="/employee/edit" element={<EditEmployeeDetail />} />
      <Route path="/employee/create/upload" element={<EmployeeUpload />} />
      <Route path="/project" element={<ProjectDetails />} />
      <Route path="/project/:id" element={<IndividualProject />} />
      <Route path="/project/create" element={<CreateProject />} />
      <Route path="/project/edit" element={<EditProjectDetail />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default MainRouter;
