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

      const userData = response.data;

      // Simpan user ke local storage
      localStorage.setItem("user", JSON.stringify(userData));

      // Perbarui konteks auth
      dispatch({ type: "LOGIN", payload: userData });

      setIsLoading(false);
      return userData;
    } catch (err) {
      setIsLoading(false);
      const errorMessage = err.response?.data?.message || "Registration failed";
      setError(errorMessage);
      throw new Error(errorMessage); // Lempar kesalahan untuk ditangkap oleh komponen pemanggil
    }
  };

  return { signup, isLoading, error };
};
