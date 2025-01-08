import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Login from "../components/pages/login";
import Register from "../components/pages/register";
import Dashboard from "../components/pages/dashboard";
import Landing from "../components/pages/landing";
import Navbar from "../components/common/navbar/Navbar";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Loghistory from "../components/pages/loghistory/Loghistory";

const queryClient = new QueryClient();

const AppRoutes = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/loghistory" element={<Loghistory />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default AppRoutes;
