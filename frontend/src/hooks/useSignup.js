import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (name, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
      });

      // Simpan user ke local storage
      localStorage.setItem("user", JSON.stringify(response.data));

      // Perbarui konteks auth
      dispatch({ type: "LOGIN", payload: response.data });

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const errorMessage = err.response?.data?.message || "Registration failed";
      setError(errorMessage);
      throw new Error(errorMessage);  // Lempar error untuk ditangkap oleh komponen
    }
  };

  return { signup, isLoading, error };
};
