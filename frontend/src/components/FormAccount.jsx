import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Input from "../components/input";
import { useSignup } from "../hooks/useSignup";

export default function FormAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  // eslint-disable-next-line no-unused-vars
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(name, email, password);
      enqueueSnackbar("Register successful", {
        variant: "success",
        autoHideDuration: 500,
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      enqueueSnackbar(err.message || "Registration failed", {
        variant: "error",
        autoHideDuration: 3000,
      });
      console.error(err);
    }
  };

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
        />
        <label className="mb-2">Username</label>
        <Input
          className="w-full py-4 px-6"
          type="password"
          label="Username"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="mb-2">Phone Number</label>
        <Input
          className="w-full py-4 px-6"
          type="number"
          label="number"
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
