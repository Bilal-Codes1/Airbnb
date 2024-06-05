import React, { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { useProvider } from "../Context/Context";
import { useNavigate } from "react-router-dom";

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { bookPlace } = useProvider();
  const navigate = useNavigate();
  const handleBook = async (e) => {
    e.preventDefault();
    try {
      await bookPlace(
        place.title,
        place.address,
        numberOfNights,
        checkIn,
        checkOut,
        numberOfNights * place.price,
        place.photos
      ).then(() => {
        navigate("/");
      });
    } catch (err) {
      console.log(err);
    }
  };
  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  return (
    <form action="">
      <div className="bg-[white] shadow p-4 rounded-2xl">
        <div className="text-2xl text-center">
          Price: ${place.price} / per night
        </div>
        <div className="border rounded-2xl mt-4">
          <div className="flex">
            <div className="py-3 px-4">
              <label>Check in:</label>
              <input
                type="date"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
                className="bg-Background outline-none"
              />
            </div>
            <div className="py-3 px-4 border-l">
              <label>Check out:</label>
              <input
                type="date"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
                className="bg-Background outline-none"
              />
            </div>
          </div>
          <div className="py-3 px-4 border-t">
            <label>Number of guests:</label>
            <input
              type="number"
              value={numberOfGuests}
              onChange={(ev) => setNumberOfGuests(ev.target.value)}
              className="bg-Background outline-none border border-[#9e9e9e] w-full py-2 rounded-xl px-6"
            />
          </div>
          {numberOfNights > 0 && (
            <div className="py-3 px-4 border-t">
              <label>Your full name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-Background outline-none border border-[#9e9e9e] py-1 ml-2 mb-2 rounded-xl pl-3"
              />
              <label>Phone number:</label>
              <input
                type="number"
                className="bg-Background outline-none border border-[#9e9e9e] py-1 ml-2 mb-2 rounded-xl pl-2"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          )}
        </div>
        <button
          className="bg-Primary mt-4 w-full py-2 rounded-full text-Background"
          onClick={handleBook}
        >
          Book this place
          {numberOfNights > 0 && <span> ${numberOfNights * place.price}</span>}
        </button>
      </div>
    </form>
  );
};

export default BookingWidget;
