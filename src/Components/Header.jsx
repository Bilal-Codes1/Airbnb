import React from "react";
import { Link } from "react-router-dom";
import { useProvider } from "../Context/Context";
import Logo from "../../public/air-bnb.png";

const Header = () => {
  const { user } = useProvider();
  const displayInitial = user ? user.email.charAt(0).toUpperCase() : "";
  const displayEmail = user ? user.email.split("@")[0] : "";

  return (
    <header className=" stciky top-0 flex justify-between items-center z-50 py-3">
      <Link className="flex gap-2" to={"/Airbnb/"}>
        <img src={Logo} alt="" className="w-8 h-8 object-contain" />
        <span className="font-bold text-xl text-Primary">airbnb</span>
      </Link>
      <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
        <div>Anywhere</div>
        <div className="border-l border-gray-300"></div>
        <div>Any week</div>
        <button className="bg-primary text-Background bg-Primary p-1 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      <Link
        className="flex items-center gap-2 border border-[#e0e0e0] rounded-full py-2 px-4 "
        to={user !== null ? "/Airbnb/profile/" : "/Airbnb/login/"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <div className="bg-[#9e9e9e] text-[#fff] rounded-full overflow-hidden">
          {user ? (
            <div className="w-6 h-6 relative bg-Primary rounded-full flex justify-center items-center">
              <span className="text-Background text-lg">{displayInitial}</span>
            </div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 relative top-1"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <span className="capitalize">{displayEmail}</span>
      </Link>
    </header>
  );
};

export default Header;
