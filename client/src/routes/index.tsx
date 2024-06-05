import { Routes, Route, Navigate } from "react-router-dom";
import { useAppThemeContext } from "../shared/contexts";
import { Dashboard, NewMeeting, SignUp } from "../pages";
import { SignIn } from "../pages/login/Login";

export const AppRoutes = () => {
  const { toggleTheme } = useAppThemeContext();
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/new-meeting" element={<NewMeeting />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
