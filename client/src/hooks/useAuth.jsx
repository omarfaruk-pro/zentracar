import { useContext } from "react"
import { AuthContext } from "../context/auth/authContext"

export default function useAuth() {
    const auth = useContext(AuthContext);
  return auth;
}
