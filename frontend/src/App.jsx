import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Analytics from "./pages/Analytics.jsx";
import ApiDocumentation from "./pages/ApiDocumentation.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/search" element={<Search />} />
        <Route path="/docs" element={<ApiDocumentation />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
