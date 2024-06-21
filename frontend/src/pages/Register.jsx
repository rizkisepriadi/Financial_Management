import Input from "../components/input";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Google from "../assets/Google.svg";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah halaman refresh saat submit
    const data = {
      name,
      email,
      password,
    };
    axios
      .post("http://localhost:5000/register", data)
      .then(() => {
        enqueueSnackbar("Register successful", {
          variant: "success",
          autoHideDuration: 500,
        });
        setTimeout(() => {
          navigate('/');
        }, 3000); // Tunggu hingga Snackbar menghilang sebelum mengarahkan pengguna
      })
      .catch((err) => {
        enqueueSnackbar(err.response?.data?.message || "Registration failed", {
          variant: "error",
          autoHideDuration: 3000,
        });
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col bg-base-100 justify-center items-center ">
      <h1 className="text-primary text-center font-[Poppins] text-4xl font-extrabold mb-12 mt-[80px]">
        FINEbank.IO
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
        <label>Name</label>
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email Address</label>
        <Input
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <Input
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-neutral text-sm ">
          By continuing, you agree to our{" "}
          <span className="text-primary">terms of service</span>
        </p>{" "}
        <input type="submit" className="btn btn-primary text-white" />
      </form>
      <span className="text-neutral my-3">or sign in with</span>
      <button className="flex bg-[#E4E7EB] py-2 px-[65px] gap-3 mb-4">
        <img src={Google} alt="Google" />
        <p>Continue with Google</p>
      </button>
      <div>
        <p className="text-neutral text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-primary">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
