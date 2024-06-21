import { AuthContext } from "../src/context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if(!context) {
    throw Error('UseAuthContext must be used inside AuthContextProfider')
  }
  return context
}