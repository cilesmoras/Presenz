import { useNavigate } from "react-router-dom";

export function authSession() {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (!auth) navigate("/");

  return auth;
}
