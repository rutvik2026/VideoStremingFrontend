import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const Protected = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      // Allow access to "/register" without authentication
      if (
        location.pathname !== "/register" &&
        location.pathname !== "/login" &&
        location.pathname !== "/video"
      ) {
        navigate("/", { replace: true });
      }
    }
  }, [navigate, token, location.pathname]); // ✅ Added `location.pathname` as a dependency

  if (
    !token &&
    location.pathname !== "/register" &&
    location.pathname !== "/home" &&
    location.pathname !== "/login"
  ) {
    return null; // ✅ Prevents unauthorized page rendering
  }

  return children;
};

Protected.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Protected;
