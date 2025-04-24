import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/DashBoard";
import Report from "./components/Report";
import TipsPage from "./pages/TipsPage";
import MapView from "./components/MapView";
import ReportPage from "./pages/ReportPage";
import MapPage from "./pages/MapPage";
import "./App.css";
import TipsAndChallengesPage from "./pages/TipsAndChallengesPage";
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/report" element={<Report />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/map" element={<MapView />} />
      <Route path="/report" element={<ReportPage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/TipsPage" element={<TipsPage />} />
      <Route path="/eco-tips" element={<TipsAndChallengesPage />} />

      
    </Routes>
    
  </Router>
);

export default App;
// e.g. in App.jsx
