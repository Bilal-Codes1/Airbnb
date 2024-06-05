import React from "react";
import Header from "./Header";
import AccountNav from "./AccountNav";
import { useProvider } from "../Context/Context";
import { Link } from "react-router-dom";
import BookingDates from "./BookingDates";

const BookedPlaces = () => {
  const { booked } = useProvider();
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[70%] h-full">
        <Header />
        <AccountNav />
        <div className="mt-4">
          {booked?.length > 0 &&
            booked.map((booking, idx) => (
              <Link
                to={`/Airbnb/bookings/${booking.id}/`}
                key={idx}
                className="flex gap-4 bg-[#00000023] rounded-2xl overflow-hidden mb-2"
              >
                <div className="w-48">
                  <img src={booking.photos[0].url} className="object-cover" />
                </div>
                <div className="py-3 pr-3 grow">
                  <h2 className="text-xl">{booking.title}</h2>
                  <div className="text-xl">
                    <BookingDates
                      booking={booking}
                      className="mb-2 mt-4 text-gray-500"
                    />
                    <div className="flex gap-1 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                        />
                      </svg>
                      <span className="text-xl">
                        Total price: ${booking.total}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BookedPlaces;
