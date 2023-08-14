import { useSelector } from "react-redux";
import { RootState } from "../services/store";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const ProtectedRoute = ({ children }) => {

  const location = useLocation();

  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage("fadeOut");
  }, [location, displayLocation]);
  const isAuth = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();

  if (!isAuth) {
    setTimeout(() => navigate('/login'), 0);
  } else {
    if (location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/") {
      setTimeout(() => navigate('/home'), 0);
    }
  }

  return children;
};