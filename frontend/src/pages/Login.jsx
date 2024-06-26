import Input from "../components/input";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Checkbox from "../components/checkbox";
import Google from "../assets/Google.svg";
import { useLogin } from "../hooks/useLogin";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const { login, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      
    } catch (err) {
      enqueueSnackbar(err.message || "Registration failed", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <div className="flex flex-col bg-base-100 justify-center items-center ">
      <h1 className="text-primary text-center font-[Poppins] text-4xl font-extrabold mb-12 mt-[80px]">
        FINEbank.IO
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label>Email Address</label>
        <Input
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <Input
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Checkbox />
        <input
          type="submit"
          value="Login"
          disabled={isLoading}
          className="btn btn-primary text-white"
        />
      </form>
      <span className="text-neutral my-6">or sign in with</span>
      <button className="flex bg-[#E4E7EB] py-3 px-[65px] gap-3 mb-4">
        <img src={Google} alt="Google" />
        <p>Continue with Google</p>
      </button>
      <a className="text-primary font-bold text-md" href="/register">
        Create an account
      </a>
    </div>
  );
}
