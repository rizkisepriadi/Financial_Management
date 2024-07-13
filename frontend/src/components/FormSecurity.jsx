/* eslint-disable no-unused-vars */
import { useSnackbar } from "notistack";
import Input from "../components/input";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function FormSecurity() {
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();
  const [isUser, setisUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      const decoded = jwtDecode(user.token);
      axios
        .get(`http://localhost:5000/user/${decoded._id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          setisUser(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  const handleSubmit = (e) => {
    if (!user || !user.token) {
      enqueueSnackbar("User not authenticated", { variant: "error" });
      return;
    }
    const data = {
      id: isUser._id,
      oldPassword: password,
      newPassword: newPassword,
      retypePassword: retypePassword,
    };

    axios
      .put(`http://localhost:5000/user/${isUser._id}/formsecurity`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        enqueueSnackbar("Profile updated", { variant: "success" });
      })
      .catch((error) => {
        console.error("Error response:", error.response);
        enqueueSnackbar(
          error.response?.data?.message || "Failed to update profile",
          {
            variant: "error",
          }
        );
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[540px]">
        <label className="mb-2">Old Password</label>
        <Input
          className="w-full py-4 px-6"
          type="password"
          label="Old Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="mb-2">New Password</label>
        <Input
          className="w-full py-4 px-6"
          type="password"
          label="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <label className="mb-2">Retype Password</label>
        <Input
          className="w-full py-4 px-6"
          type="password"
          label="Retype Password"
          value={retypePassword}
          onChange={(e) => setRetypePassword(e.target.value)}
        />
        <input
          type="submit"
          disabled={isLoading}
          className="btn btn-primary w-[192px] text-white"
          value="Update Password"
        />
      </form>
    </div>
  );
}
