import React, { useState } from "react";

const CheckInOut = ({
  inTime,
  setInTime,
  outTime,
  setOutTime,
  guests,
  setGuests,
  price,
  setPrice,
}) => {
  const handleOutChange = (event) => {
    setOutTime(event.target.value);
    const newValue = Math.min(parseInt(event.target.value), 24);
    setOutTime(newValue);
  };
  const handleInChange = (event) => {
    setInTime(event.target.value);
    const newValue = Math.min(parseInt(event.target.value), 24);
    setInTime(newValue);
  };
  return (
    <div className="mt-4 flex flex-col">
      <span className="text-[#000] text-2xl font-medium text-left">
        Check in&out times
      </span>
      <span className="text-[#555]">
        add check in and out times, remember to have some time for cleaning the
        rooms between guests
      </span>
      <div className="flex gap-1 w-full mt-2">
        <div className="flex flex-col w-[25%]">
          <label htmlFor="in" className="font-medium">
            Check in time
          </label>
          <input
            type="number"
            placeholder="Check In"
            value={inTime}
            onChange={handleInChange}
            max="24"
            name="in"
            className="py-2 px-4 w-full bg-[#00000000] border border-[#9e9e9e] rounded-xl outline-none mt-1"
          />
        </div>
        <div className="flex flex-col w-[25%]">
          <label htmlFor="out" className="font-medium">
            Check out time
          </label>
          <input
            type="number"
            placeholder="Check Out"
            value={outTime}
            onChange={handleOutChange}
            max="24"
            name="out"
            className="py-2 px-4 w-full bg-[#00000000] border border-[#9e9e9e] rounded-xl outline-none mt-1"
          />
        </div>
        <div className="flex flex-col w-[25%]">
          <label htmlFor="no" className="font-medium">
            Max no. of guests
          </label>
          <input
            type="number"
            placeholder="No. of guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            name="no"
            className="py-2 px-4 w-full bg-[#00000000] border border-[#9e9e9e] rounded-xl outline-none mt-1"
          />
        </div>
        <div className="flex flex-col w-[25%] ">
          <label htmlFor="price" className="font-medium">
            Price per night
          </label>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            name="price"
            className="py-2 px-4 w-full bg-[#00000000] border border-[#9e9e9e] rounded-xl outline-none mt-1"
          />
        </div>
      </div>
    </div>
  );
};

export default CheckInOut;
