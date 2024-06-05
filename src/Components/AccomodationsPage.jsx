import React from "react";
import Header from "./Header";
import AccountNav from "./AccountNav";
import { Link } from "react-router-dom";
import { useProvider } from "../Context/Context";

const AccomodationsPage = () => {
  const { places } = useProvider();

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[70%] h-full">
        <Header />
        <AccountNav color="#FF6B6B" />
        <div className=" flex justify-center mt-2">
          <Link to={"/Airbnb/accomodations/new"} className="mb-6">
            <button className="bg-Primary mt-4 w-52 rounded-full h-10 text-lg text-Background font-normal flex items-center justify-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Add new Place</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccomodationsPage;
