
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const NavigationProtected = ({ children }) => {
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

  if (!token ) {
    return null; // ✅ Prevents unauthorized page rendering
  }

  return children;
};

NavigationProtected.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NavigationProtected;
