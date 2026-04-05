import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CoursePlayer from "./pages/CoursePlayer";
import Checkout from "./pages/Checkout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<StudentDashboard />} />
      <Route path="/learn/:courseId" element={<CoursePlayer />} />
      <Route path="/checkout/:courseId" element={<Checkout />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
    </Routes>
  );
}

