/* eslint-disable no-unused-vars */
import { useSnackbar } from "notistack";
import Input from "../components/input";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function FormAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [number, setNumber] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [isUser, setisUser] = useState({});
  const { user } = useAuthContext();
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
          setName(response.data.name);
          setEmail(response.data.email);
          setUsername(response.data.username);
          setNumber(response.data.telp);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || !user.token) {
      enqueueSnackbar("User not authenticated", { variant: "error" });
      return;
    }
    const data = {
      name: name,
      email: email,
      username: username,
      telp: number,
    };

    axios.put(`http://localhost:5000/user/${isUser._id}/formaccount`, data, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(() => {
        enqueueSnackbar("Profile updated", { variant: "success" });
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar("Failed to update profile", { variant: "error" });
    })
    }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[540px]">
        <label className="mb-2">Name</label>
        <Input
          className="w-full py-4 px-6"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="mb-2">Email Address</label>
        <Input
          className="w-full py-4 px-6"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          readOnly
        />
        <label className="mb-2">Username</label>
        <Input
          className="w-full py-4 px-6"
          type="username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="mb-2">Phone Number</label>
        <Input
          className="w-full py-4 px-6"
          type="number"
          label="Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <input
          type="submit"
          disabled={isLoading}
          className="btn btn-primary w-[192px] text-white"
          value="Update Profile"
        />
      </form>
    </div>
  );
}
