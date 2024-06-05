import React from "react";
import AccountNav from "./AccountNav";
import Header from "./Header";
import AddressLink from "./AddressLink";
import BookingDates from "./BookingDates";
import { useProvider } from "../Context/Context";
import { useParams } from "react-router-dom";
import PlaceImg from "./PlaceImg";

const BookedPlace = () => {
  const { booked } = useProvider();
  const { bookingId } = useParams();
  const booking = booked.find((booking) => booking.id === bookingId);

  // Add a condition to check if place exists
  if (!booking) {
    return <div>Loading...</div>;
  }
  const { title, address, total } = booking;

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[70%] h-full">
        <Header />
        <AccountNav />
        <div className="my-8">
          <h1 className="text-3xl">{title}</h1>
          <AddressLink className="my-2 block">{address}</AddressLink>
          <div className="bg-[#00000023] p-6 my-6 rounded-2xl flex items-center justify-between">
            <div>
              <h2 className="text-2xl mb-4">Your booking information:</h2>
              <BookingDates booking={booking} />
            </div>
            <div className="bg-primary p-6 text-white rounded-2xl">
              <div>Total price</div>
              <div className="text-3xl">${total}</div>
            </div>
          </div>
          <PlaceImg place={booking} />
        </div>
      </div>
    </div>
  );
};

export default BookedPlace;
