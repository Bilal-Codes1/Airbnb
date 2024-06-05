import React, { useState } from "react";
import Header from "./Header";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Config/Firebase.config";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useProvider } from "../Context/Context";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const {
    signUp,
    checkEmail,
    checkPassword,
    emailValidation,
    passwordValidation,
  } = useProvider();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (email.length === 0 || password.length === 0) {
      toast.error("Please enter details");
      return;
    } else if (!emailValidation || !passwordValidation) {
      toast.error("Invalid details");
      return;
    } else if (password.length < 8 && password.length !== 0) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }
    try {
      // Sign in user with email and password
      await signUp(email, password);
      setEmail("");
      setPassword("");
      setInterval(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      // Error handling already handled in AuthContext
    }
  };

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[70%] h-full">
        <Header />
        <form
          className={`w-full h-full flex justify-center items-center flex-col gap-4`}
        >
          <h1 className="text-4xl mb-1">Signup</h1>
          <input
            type="text"
            className={`bg-Background w-[50%] px-6 py-2 rounded-2xl outline-none border ${
              email !== "" && !emailValidation
                ? "border-[#ff0000]"
                : "border-[#9e9e9e]"
            }`}
            placeholder="your@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              checkEmail(e.target.value);
            }}
          />
          <div
            className={`flex bg-Background w-[50%] rounded-2xl outline-none border border-[#9e9e9e] items-center justify-between px-6 ${
              password !== "" && !passwordValidation
                ? "border-[#ff0000]"
                : "border-[#9e9e9e]"
            }`}
          >
            <input
              type={showPass ? "text" : "password"}
              className="bg-Background w-[100%] py-2 rounded-2xl outline-none"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                checkPassword(e.target.value);
              }}
              required
            />
            <div onClick={() => setShowPass(!showPass)}>
              {showPass ? (
                <FaEyeSlash className="text-xl text-[#454545]" />
              ) : (
                <FaEye className="text-xl text-[#454545]" />
              )}
            </div>
          </div>
          <button
            className="bg-Primary w-[50%] px-6 py-2 rounded-2xl outline-none text-Background mt-1"
            onClick={handleSignUp}
          >
            Signup
          </button>
          <div className="text-center py-2 text-[#616161]">
            Already a member?{" "}
            <Link className="underline text-[#000]" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
};

export default RegisterPage;
