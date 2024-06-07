import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, NewMeeting, SignUp } from "../pages";
import { SignIn } from "../pages/login/Login";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/new-meeting" element={<NewMeeting />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
