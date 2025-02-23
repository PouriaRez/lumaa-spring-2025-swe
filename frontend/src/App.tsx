import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAuthenticated(localStorage.getItem("token") !== null);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div>Loading...</div>;

  return authenticated ? <>{element}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
      </Routes>
    </Router>
  );
}

export default App;
