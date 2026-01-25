import React, { useContext , useState, useEffect, useRef} from "react";
import { NavLink, Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { UserRound } from "lucide-react";

function App() {
  const { user, login, logout, loadingAuth} = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [showDialog, setShowDialog] = useState(false);
  const dialogRef = useRef(null);

  // ✅ Handle Login
  const handleLogin = (loggedInUser, token) => {
    login(loggedInUser, token);
    if (loggedInUser.role === "client") navigate("/client-dashboard");
    else if (loggedInUser.role === "freelancer") navigate("/freelancer-dashboard");
  };

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    logout();
    navigate("/login");
  };

   useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setShowDialog(false);
      }
    };
    if (showDialog) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showDialog]);

  if (loadingAuth) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;
  }

  if (!user && (location.pathname === "/login" || location.pathname === "/register")) {
    return <Outlet context={{ onLogin: handleLogin }} />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 32px",
    backgroundColor: "#fff",
    borderBottom: "1px solid #eee",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  };

  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "#007bff" : "#333",
    fontWeight: isActive ? "bold" : "500",
    borderBottom: isActive ? "2px solid #007bff" : "none",
    paddingBottom: "3px",
  });

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      <nav style={navStyle}>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <div style={{ fontWeight: "bold", fontSize: "18px" }}>Freelance Job Finder</div>
          <NavLink to={user?.role === "client" ? "/client-dashboard" : "/freelancer-dashboard"}
          style={linkStyle}>Jobs</NavLink>
          {user?.role === "client" && (
            <NavLink to="/create-job" style={linkStyle}>Post Job</NavLink>
          )}
          {user?.role === "client" && (
            <NavLink to="/client" style={linkStyle}>My Applications</NavLink>
          )}
          {user?.role==="freelancer" && (
          <NavLink to="/my-applications" style={linkStyle}>My Applications</NavLink>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", position: "relative" }}>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent closing instantly
              setShowDialog((prev) => !prev);
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px",
              borderRadius: "50%",
              transition: "0.2s",
            }}
            title="Profile"
          >
            <UserRound size={24} color="#333" />
          </button>

          {/* 🔽 Dropdown Dialog */}
          {showDialog && (
            <div
              ref={dialogRef}
              style={{
                position: "absolute",
                top: "40px",
                right: "0",
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                padding: "16px",
                minWidth: "200px",
                zIndex: 100,
              }}
            >
              <p style={{ margin: "0 0 8px 0", fontWeight: "bold", color: "#333" }}>
                {user?.name || "User"}
              </p>
              <p style={{ margin: "0 0 12px 0", color: "#666", fontSize: "14px" }}>
                Role: {user?.role === "client" ? "Client" : "Freelancer"}
              </p>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "8px 14px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </div>
          )}
          </div>
      </nav>

      <div style={{ marginTop: "30px", padding: "20px" }}>
        <Outlet context={{ user, onLogin: handleLogin }} />
      </div>
    </div>
  );
}

export default App;
