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
      if (location.pathname !== "/register") {
        navigate("/login", { replace: true });
      }
    }
  }, [navigate, token, location.pathname]); // ✅ Added `location.pathname` as a dependency

  if (!token && location.pathname !== "/register") {
    return null; // ✅ Prevents unauthorized page rendering
  }

  return children;
};

Protected.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Protected;
