import React from "react";
import AccountNav from "./AccountNav";
import Header from "./Header";
import { useProvider } from "../Context/Context";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, logout, name } = useProvider();
  const displayEmail = user ? user.email.split("@")[0] : "";
  const navigate = useNavigate();
  const handleLogout = () => {
    logout().then(() => {
      setInterval(() => {
        navigate("/");
      }, 1000);
    });
  };

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[70%] h-full">
        <Header />
        <AccountNav color="#FF6B6B" />
        <div className="text-center mt-8 text-xl capitalize">
          Logged in as {displayEmail} <br />
          <button
            className="bg-Primary mt-4 w-96 rounded-full h-10 text-lg text-Background font-semibold"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
