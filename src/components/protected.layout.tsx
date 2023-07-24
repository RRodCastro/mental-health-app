import { useSelector } from "react-redux";
import { RootState } from "../services/store";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {

  const isAuth = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();

  if (!isAuth) {
    setTimeout( () => navigate('/login'), 0);
  }

  return children;
};