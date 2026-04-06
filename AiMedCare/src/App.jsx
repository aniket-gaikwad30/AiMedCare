import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes.jsx";
import ChatbotPage from "./pages/ChatbotPage.jsx";
import Login from "./login/login.jsx";
import Dashboard from "./pages/dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ReportScreen from "./pages/ReportScreen.jsx";
import AssessmentScreen from "./pages/AssessmentScreen.jsx";
import StarRating from "./pages/StarRating.jsx";
import DietScreen from "./pages/DietScreen.jsx";
import ReminderScreen from "./pages/ReminderScreen.jsx";
import RiskScreen from "./pages/RiskScreen.jsx";

export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/startrating" element={<StarRating />} />
          <Route path="/dietscreen" element={<DietScreen />} />
          <Route path="/riskscreen" element={<RiskScreen />} />
          <Route path="/reminderscreen" element={<ReminderScreen />} />
          <Route path="/assesment" element={<AssessmentScreen />} />
          <Route path="/assessment" element={<AssessmentScreen />} />
          <Route
            path="/chatbot"
            element={
              <ProtectedRoute>
                <ChatbotPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <ReportScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App
